"""Alert evaluation: match aggregated cells against watch areas."""

from dataclasses import dataclass
from datetime import datetime, timezone

from ..models.aggregated_cell import AggregatedCell


@dataclass
class WatchAreaSpec:
    """Minimal watch-area shape for evaluation (from DB row)."""

    id: str
    user_id: str
    label: str
    animal_types: list[str]
    hex_cell_ids: list[str]
    is_active: bool


@dataclass
class AlertCandidate:
    """An alert ready to be persisted."""

    user_id: str
    watch_area_id: str
    disease_id: str
    animal_type: str
    severity: str  # "low"|"medium"|"high"|"critical"
    title_en: str
    title_es: str
    message_en: str
    message_es: str
    hex_cell_id: str | None
    triggered_at: str


# Default intensity thresholds — must match packages/contracts AlertThresholds
LOW_THRESHOLD = 0.1
MEDIUM_THRESHOLD = 0.3
HIGH_THRESHOLD = 0.6
CRITICAL_THRESHOLD = 0.85


def classify_severity(intensity: float) -> str:
    """Map an intensity value (0.0–1.0) to an alert severity level."""
    if intensity >= CRITICAL_THRESHOLD:
        return "critical"
    if intensity >= HIGH_THRESHOLD:
        return "high"
    if intensity >= MEDIUM_THRESHOLD:
        return "medium"
    return "low"


def _build_title(disease_key: str, severity: str) -> tuple[str, str]:
    """Build bilingual alert titles."""
    sev_en = {"low": "Low", "medium": "Medium", "high": "High", "critical": "Critical"}
    sev_es = {"low": "Baja", "medium": "Media", "high": "Alta", "critical": "Critica"}
    return (
        f"{sev_en[severity]} alert: {disease_key}",
        f"Alerta {sev_es[severity]}: {disease_key}",
    )


def _build_message(
    disease_key: str,
    animal_type: str,
    hex_id: str,
    case_count: int,
    intensity: float,
) -> tuple[str, str]:
    """Build bilingual alert messages."""
    msg_en = (
        f"{case_count} cases of {disease_key} in {animal_type} "
        f"detected in zone {hex_id} (intensity {intensity:.0%})."
    )
    msg_es = (
        f"{case_count} casos de {disease_key} en {animal_type} "
        f"detectados en zona {hex_id} (intensidad {intensity:.0%})."
    )
    return msg_en, msg_es


def evaluate_alerts(
    cells: list[AggregatedCell],
    watch_areas: list[WatchAreaSpec],
) -> list[AlertCandidate]:
    """
    Match non-suppressed aggregated cells against active watch areas.

    Produces one AlertCandidate for each (watch-area, hex, disease) match
    where the cell is not suppressed and the animal type overlaps.
    """
    now = datetime.now(timezone.utc).isoformat()
    candidates: list[AlertCandidate] = []

    # Index cells by hex_id for fast lookup
    cell_by_hex: dict[str, list[AggregatedCell]] = {}
    for cell in cells:
        if cell.suppressed:
            continue
        cell_by_hex.setdefault(cell.hex_id, []).append(cell)

    for wa in watch_areas:
        if not wa.is_active:
            continue

        for hex_id in wa.hex_cell_ids:
            matching_cells = cell_by_hex.get(hex_id, [])
            for cell in matching_cells:
                # Check animal type overlap
                if cell.animal_type.value not in wa.animal_types:
                    continue

                severity = classify_severity(cell.intensity)
                title_en, title_es = _build_title(cell.disease_key, severity)
                msg_en, msg_es = _build_message(
                    cell.disease_key,
                    cell.animal_type.value,
                    hex_id,
                    cell.case_count,
                    cell.intensity,
                )

                candidates.append(
                    AlertCandidate(
                        user_id=wa.user_id,
                        watch_area_id=wa.id,
                        disease_id=cell.disease_key,
                        animal_type=cell.animal_type.value,
                        severity=severity,
                        title_en=title_en,
                        title_es=title_es,
                        message_en=msg_en,
                        message_es=msg_es,
                        hex_cell_id=hex_id,
                        triggered_at=now,
                    )
                )

    return candidates
