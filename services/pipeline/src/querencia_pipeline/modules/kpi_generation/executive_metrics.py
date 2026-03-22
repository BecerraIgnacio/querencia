"""Executive-level metric generation for Pro dashboards."""

from collections import defaultdict
from datetime import date

from ..models.aggregated_cell import AggregatedCell
from ..models.executive_metric import ExecutiveSnapshot
from ..models.taxonomy import AnimalType, TimeBucket
from ..aggregation.prioritize import compute_disease_rankings, compute_critical_zones


def _compute_overall_trend(
    cells: list[AggregatedCell],
    previous_cells: list[AggregatedCell] | None,
    threshold: float = 0.05,
) -> str:
    """Compare total current cases to total previous cases."""
    current_total = sum(c.case_count for c in cells if not c.suppressed)
    if previous_cells is None:
        return "stable"
    prev_total = sum(c.case_count for c in previous_cells if not c.suppressed)
    if prev_total == 0:
        return "up" if current_total > 0 else "stable"
    change = (current_total - prev_total) / prev_total
    if change > threshold:
        return "up"
    if change < -threshold:
        return "down"
    return "stable"


def generate_executive_snapshot(
    cells: list[AggregatedCell],
    previous_cells: list[AggregatedCell] | None = None,
    animal_type: AnimalType | None = None,
    bucket: TimeBucket = TimeBucket.MONTH,
    top_diseases: int = 5,
    top_zones: int = 10,
) -> list[ExecutiveSnapshot]:
    """
    Generate executive snapshots. If animal_type is None, one per animal type found.
    Filter cells by bucket and animal_type. Use compute_disease_rankings and
    compute_critical_zones.
    """
    # Filter by bucket
    bucket_cells = [c for c in cells if c.time_bucket == bucket]
    prev_bucket_cells = (
        [c for c in previous_cells if c.time_bucket == bucket]
        if previous_cells
        else None
    )

    # Determine animal types to process
    if animal_type is not None:
        animal_types = [animal_type]
    else:
        animal_types = sorted(
            set(c.animal_type for c in bucket_cells),
            key=lambda a: a.value,
        )

    snapshots: list[ExecutiveSnapshot] = []

    for at in animal_types:
        at_cells = [c for c in bucket_cells if c.animal_type == at]
        at_prev = (
            [c for c in prev_bucket_cells if c.animal_type == at]
            if prev_bucket_cells
            else None
        )

        # Non-suppressed cells for aggregation
        active_cells = [c for c in at_cells if not c.suppressed]

        if not active_cells:
            continue

        # Compute rankings and zones
        rankings = compute_disease_rankings(at_cells, at_prev, top_n=top_diseases)
        zones = compute_critical_zones(at_cells, top_n=top_zones)

        at_rankings = rankings.get(at, [])

        # Aggregate totals from non-suppressed cells
        total_cases = sum(c.case_count for c in active_cells)
        total_hex = len(set(c.hex_id for c in active_cells))
        total_diseases = len(set(c.disease_key for c in active_cells))

        # Time range
        bucket_start = min(c.bucket_start for c in active_cells)
        bucket_end = max(c.bucket_end for c in active_cells)

        overall = _compute_overall_trend(at_cells, at_prev)

        snapshots.append(
            ExecutiveSnapshot(
                animal_type=at,
                time_bucket=bucket,
                bucket_start=bucket_start,
                bucket_end=bucket_end,
                total_diseases_active=total_diseases,
                total_cases=total_cases,
                total_affected_hex=total_hex,
                top_diseases=at_rankings,
                critical_zones=zones,
                overall_trend=overall,
            )
        )

    return snapshots
