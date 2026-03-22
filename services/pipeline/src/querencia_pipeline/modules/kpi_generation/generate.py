"""KPI generation stage: aggregated cells -> KPI snapshots."""

from collections import defaultdict
from datetime import date

from ..models.aggregated_cell import AggregatedCell
from ..models.kpi_snapshot import KpiSnapshot
from ..models.taxonomy import AnimalType, TimeBucket


def _trend_direction(
    current_count: int,
    previous_count: int | None,
    threshold: float = 0.05,
) -> str:
    if previous_count is None or previous_count == 0:
        return "stable"
    change = (current_count - previous_count) / previous_count
    if change > threshold:
        return "up"
    if change < -threshold:
        return "down"
    return "stable"


def generate_kpis(
    cells: list[AggregatedCell],
    previous_cells: list[AggregatedCell] | None = None,
) -> list[KpiSnapshot]:
    """
    Generate KPI snapshots from a set of aggregated cells.

    Args:
        cells: Current period aggregated cells (suppressed cells excluded).
        previous_cells: Prior period cells for trend calculation.
    """
    # Group by (disease_key, animal_type, time_bucket, bucket_start)
    GroupKey = tuple[str, AnimalType, TimeBucket, date]
    groups: dict[GroupKey, list[AggregatedCell]] = defaultdict(list)
    for cell in cells:
        if not cell.suppressed:
            key: GroupKey = (
                cell.disease_key,
                cell.animal_type,
                cell.time_bucket,
                cell.bucket_start,
            )
            groups[key].append(cell)

    # Build previous totals for trend
    prev_totals: dict[tuple[str, AnimalType], int] = {}
    if previous_cells:
        prev_groups: dict[tuple[str, AnimalType], list[AggregatedCell]] = defaultdict(list)
        for cell in previous_cells:
            if not cell.suppressed:
                prev_groups[(cell.disease_key, cell.animal_type)].append(cell)
        for (dk, at), pcells in prev_groups.items():
            prev_totals[(dk, at)] = sum(c.case_count for c in pcells)

    snapshots: list[KpiSnapshot] = []
    for (disease_key, animal_type, time_bucket, bucket_start), group_cells in groups.items():
        total = sum(c.case_count for c in group_cells)
        affected_hex = len(set(c.hex_id for c in group_cells))
        peak = max((c.intensity for c in group_cells), default=0.0)
        prev_total = prev_totals.get((disease_key, animal_type))
        trend = _trend_direction(total, prev_total)

        bucket_end = max(c.bucket_end for c in group_cells)

        snapshots.append(
            KpiSnapshot(
                disease_key=disease_key,
                animal_type=animal_type,
                time_bucket=time_bucket,
                bucket_start=bucket_start,
                bucket_end=bucket_end,
                total_cases=total,
                affected_hex_count=affected_hex,
                peak_intensity=round(peak, 4),
                trend_direction=trend,
            )
        )

    return snapshots
