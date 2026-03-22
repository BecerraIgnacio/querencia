"""Prioritization logic for Pro analytics."""

from collections import defaultdict

from ..models.aggregated_cell import AggregatedCell
from ..models.executive_metric import DiseaseRanking, CriticalZone
from ..models.taxonomy import AnimalType


def compute_disease_rankings(
    cells: list[AggregatedCell],
    previous_cells: list[AggregatedCell] | None = None,
    top_n: int = 5,
) -> dict[AnimalType, list[DiseaseRanking]]:
    """
    Rank diseases by composite severity score per animal type.

    Only non-suppressed cells are used.

    Score = 0.4 * normalized_cases + 0.3 * normalized_hex + 0.3 * abs(velocity)
    Velocity = (current - previous) / previous if previous > 0, else 0.
    """
    # Group non-suppressed cells by (animal_type, disease_key)
    GroupKey = tuple[AnimalType, str]
    groups: dict[GroupKey, list[AggregatedCell]] = defaultdict(list)
    for cell in cells:
        if not cell.suppressed:
            groups[(cell.animal_type, cell.disease_key)].append(cell)

    if not groups:
        return {}

    # Build previous totals by (animal_type, disease_key)
    prev_totals: dict[GroupKey, int] = {}
    if previous_cells:
        prev_groups: dict[GroupKey, list[AggregatedCell]] = defaultdict(list)
        for cell in previous_cells:
            if not cell.suppressed:
                prev_groups[(cell.animal_type, cell.disease_key)].append(cell)
        for key, pcells in prev_groups.items():
            prev_totals[key] = sum(c.case_count for c in pcells)

    # Compute raw values per group
    raw: dict[GroupKey, tuple[int, int, float]] = {}  # (cases, hex_count, velocity)
    for key, group_cells in groups.items():
        total_cases = sum(c.case_count for c in group_cells)
        hex_count = len(set(c.hex_id for c in group_cells))
        prev = prev_totals.get(key)
        if prev is not None and prev > 0:
            velocity = (total_cases - prev) / prev
        else:
            velocity = 0.0
        raw[key] = (total_cases, hex_count, velocity)

    # Normalize per animal type
    animal_groups: dict[AnimalType, list[GroupKey]] = defaultdict(list)
    for key in raw:
        animal_groups[key[0]].append(key)

    result: dict[AnimalType, list[DiseaseRanking]] = {}

    for animal_type, keys in animal_groups.items():
        max_cases = max(raw[k][0] for k in keys)
        max_hex = max(raw[k][1] for k in keys)
        max_vel = max(abs(raw[k][2]) for k in keys)

        scored: list[tuple[GroupKey, float, int, int, float]] = []
        for key in keys:
            cases, hex_count, velocity = raw[key]
            norm_cases = cases / max_cases if max_cases > 0 else 0.0
            norm_hex = hex_count / max_hex if max_hex > 0 else 0.0
            norm_vel = abs(velocity) / max_vel if max_vel > 0 else 0.0
            score = 0.4 * norm_cases + 0.3 * norm_hex + 0.3 * norm_vel
            score = min(score, 1.0)
            scored.append((key, score, cases, hex_count, velocity))

        # Sort by score descending
        scored.sort(key=lambda x: x[1], reverse=True)

        rankings: list[DiseaseRanking] = []
        for rank_idx, (key, score, cases, hex_count, velocity) in enumerate(
            scored[:top_n], start=1
        ):
            rankings.append(
                DiseaseRanking(
                    disease_key=key[1],
                    animal_type=animal_type,
                    rank=rank_idx,
                    total_cases=cases,
                    affected_hex_count=hex_count,
                    velocity=round(velocity, 4),
                    severity_score=round(score, 4),
                )
            )

        result[animal_type] = rankings

    return result


def compute_critical_zones(
    cells: list[AggregatedCell],
    top_n: int = 10,
    hotspot_threshold: float = 0.7,
) -> list[CriticalZone]:
    """
    Identify highest-intensity hex cells. Non-suppressed only.
    Mark as hotspot if intensity >= threshold.
    Rank by intensity descending, then case_count descending.
    """
    eligible = [c for c in cells if not c.suppressed]

    # Sort by intensity desc, then case_count desc
    eligible.sort(key=lambda c: (c.intensity, c.case_count), reverse=True)

    zones: list[CriticalZone] = []
    for rank_idx, cell in enumerate(eligible[:top_n], start=1):
        zones.append(
            CriticalZone(
                hex_id=cell.hex_id,
                disease_key=cell.disease_key,
                animal_type=cell.animal_type,
                case_count=cell.case_count,
                intensity=cell.intensity,
                is_hotspot=cell.intensity >= hotspot_threshold,
                rank=rank_idx,
            )
        )

    return zones
