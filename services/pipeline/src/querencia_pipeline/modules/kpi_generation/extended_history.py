"""Extended history: generate KPIs across multiple time buckets for Plus dashboards."""

from ..models.aggregated_cell import AggregatedCell
from ..models.kpi_snapshot import KpiSnapshot
from ..models.taxonomy import TimeBucket
from .generate import generate_kpis


# Plus plan gets week+month+quarter; Pro gets all 5
PLUS_BUCKETS = [TimeBucket.WEEK, TimeBucket.MONTH, TimeBucket.QUARTER]
PRO_BUCKETS = [
    TimeBucket.DAY,
    TimeBucket.WEEK,
    TimeBucket.MONTH,
    TimeBucket.QUARTER,
    TimeBucket.YEAR,
]


def generate_extended_kpis(
    cells: list[AggregatedCell],
    previous_cells: list[AggregatedCell] | None = None,
    buckets: list[TimeBucket] | None = None,
) -> dict[TimeBucket, list[KpiSnapshot]]:
    """
    Generate KPI snapshots for multiple time buckets.

    Returns a dict keyed by TimeBucket so dashboards can pick the granularity
    they need.
    """
    if buckets is None:
        buckets = PLUS_BUCKETS

    result: dict[TimeBucket, list[KpiSnapshot]] = {}
    for bucket in buckets:
        bucket_cells = [c for c in cells if c.time_bucket == bucket]
        prev_bucket_cells = (
            [c for c in previous_cells if c.time_bucket == bucket]
            if previous_cells
            else None
        )
        result[bucket] = generate_kpis(bucket_cells, prev_bucket_cells)

    return result
