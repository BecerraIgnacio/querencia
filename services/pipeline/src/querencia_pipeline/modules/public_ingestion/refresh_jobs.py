"""Repeatable catalog refresh and ingestion jobs."""

from dataclasses import dataclass, field
from datetime import datetime

from .ingest import ingest_csv, ingest_json
from .source_registry import get_source
from ..normalization.normalize import normalize_records
from ..normalization.disease_resolver import resolve_disease_key


@dataclass
class RefreshResult:
    """Result of a single refresh job run."""

    source_id: str
    started_at: datetime
    completed_at: datetime | None = None
    records_ingested: int = 0
    records_normalized: int = 0
    records_failed: int = 0
    new_disease_keys_seen: list[str] = field(default_factory=list)
    errors: list[str] = field(default_factory=list)
    success: bool = False


def run_refresh(source_id: str, raw_data: list[dict]) -> RefreshResult:
    """Run a full ingestion+normalization cycle for a source."""
    result = RefreshResult(source_id=source_id, started_at=datetime.utcnow())

    config = get_source(source_id)
    if config is None:
        result.errors.append(f"Unknown source: {source_id}")
        result.completed_at = datetime.utcnow()
        return result

    try:
        if config.format == "csv":
            raw_records = ingest_csv(source_id, raw_data)
        else:
            raw_records = ingest_json(source_id, raw_data)
        result.records_ingested = len(raw_records)

        # Track new disease names
        for rec in raw_records:
            if rec.raw_disease_name and resolve_disease_key(rec.raw_disease_name) is None:
                if rec.raw_disease_name not in result.new_disease_keys_seen:
                    result.new_disease_keys_seen.append(rec.raw_disease_name)

        normalized = normalize_records(raw_records)
        result.records_normalized = len(normalized)
        result.records_failed = result.records_ingested - result.records_normalized
        result.success = True
    except Exception as e:
        result.errors.append(str(e))

    result.completed_at = datetime.utcnow()
    return result


def detect_new_diseases(raw_names: list[str]) -> list[str]:
    """Return raw disease names that don't resolve to any known key."""
    return [name for name in raw_names if resolve_disease_key(name) is None]


def catalog_coverage_report() -> dict:
    """Summary of catalog coverage."""
    from ..normalization.disease_catalog import DISEASE_CATALOG, validate_catalog_completeness

    by_animal: dict[str, int] = {}
    for entry in DISEASE_CATALOG.values():
        for at in entry.animal_types:
            by_animal[at] = by_animal.get(at, 0) + 1

    return {
        "total_diseases": len(DISEASE_CATALOG),
        "by_animal": by_animal,
        "missing_from_catalog": validate_catalog_completeness(),
        "oie_listed_count": sum(1 for e in DISEASE_CATALOG.values() if e.oie_listed),
    }
