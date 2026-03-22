"""Generate trend series from multiple periods of aggregated cells."""

from collections import defaultdict
from datetime import date

from ..models.aggregated_cell import AggregatedCell
from ..models.trend_point import TrendPoint
from ..models.trend_series import TrendSeries
from ..models.taxonomy import AnimalType, TimeBucket


def _compute_overall_trend(points: list[TrendPoint], threshold: float = 0.05) -> str:
    """Compare first-half total to second-half total."""
    if len(points) < 2:
        return "stable"
    mid = len(points) // 2
    first_half = sum(p.total_cases for p in points[:mid])
    second_half = sum(p.total_cases for p in points[mid:])
    if first_half == 0:
        return "up" if second_half > 0 else "stable"
    change = (second_half - first_half) / first_half
    if change > threshold:
        return "up"
    if change < -threshold:
        return "down"
    return "stable"


def generate_trend_series(
    cells: list[AggregatedCell],
    bucket: TimeBucket = TimeBucket.MONTH,
) -> list[TrendSeries]:
    """
    Build trend series from aggregated cells.

    Groups by (disease_key, animal_type) then orders by bucket_start.
    Each group produces one TrendSeries with ordered TrendPoints.
    """
    # Group cells by (disease_key, animal_type, bucket_start)
    PointKey = tuple[str, AnimalType, date]
    SeriesKey = tuple[str, AnimalType]

    point_groups: dict[PointKey, list[AggregatedCell]] = defaultdict(list)
    for cell in cells:
        if cell.suppressed:
            continue
        if cell.time_bucket != bucket:
            continue
        key: PointKey = (cell.disease_key, cell.animal_type, cell.bucket_start)
        point_groups[key].append(cell)

    # Build trend points grouped by series
    series_points: dict[SeriesKey, list[TrendPoint]] = defaultdict(list)

    for (disease_key, animal_type, bucket_start), group_cells in point_groups.items():
        total = sum(c.case_count for c in group_cells)
        affected = len(set(c.hex_id for c in group_cells))
        peak = max((c.intensity for c in group_cells), default=0.0)
        bucket_end = max(c.bucket_end for c in group_cells)

        point = TrendPoint(
            disease_key=disease_key,
            animal_type=animal_type,
            time_bucket=bucket,
            bucket_start=bucket_start,
            bucket_end=bucket_end,
            total_cases=total,
            affected_hex_count=affected,
            peak_intensity=round(peak, 4),
        )

        series_points[(disease_key, animal_type)].append(point)

    # Build TrendSeries
    results: list[TrendSeries] = []
    for (disease_key, animal_type), points in series_points.items():
        sorted_points = sorted(points, key=lambda p: p.bucket_start)
        overall = _compute_overall_trend(sorted_points)
        total_sum = sum(p.total_cases for p in sorted_points)
        peak_max = max((p.peak_intensity for p in sorted_points), default=0.0)

        results.append(
            TrendSeries(
                disease_key=disease_key,
                animal_type=animal_type,
                time_bucket=bucket,
                points=sorted_points,
                period_count=len(sorted_points),
                overall_trend=overall,
                total_cases_sum=total_sum,
                peak_intensity_max=round(peak_max, 4),
            )
        )

    return results
