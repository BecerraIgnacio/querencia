"""Tests for extended history KPI generation."""

from datetime import date

from querencia_pipeline.modules.models.aggregated_cell import AggregatedCell
from querencia_pipeline.modules.models.taxonomy import AnimalType, TimeBucket
from querencia_pipeline.modules.kpi_generation.extended_history import (
    PLUS_BUCKETS,
    generate_extended_kpis,
)


def _cell(
    hex_id: str = "872830828ffffff",
    disease_key: str = "fmd",
    animal_type: AnimalType = AnimalType.BOVINE,
    time_bucket: TimeBucket = TimeBucket.MONTH,
    bucket_start: date = date(2024, 1, 1),
    bucket_end: date = date(2024, 1, 31),
    case_count: int = 10,
    intensity: float = 0.5,
    suppressed: bool = False,
) -> AggregatedCell:
    return AggregatedCell(
        hex_id=hex_id,
        disease_key=disease_key,
        animal_type=animal_type,
        time_bucket=time_bucket,
        bucket_start=bucket_start,
        bucket_end=bucket_end,
        case_count=case_count,
        intensity=intensity,
        suppressed=suppressed,
    )


def test_extended_kpis_default_buckets():
    """Default bucket list should be PLUS_BUCKETS (week, month, quarter)."""
    cells = [
        _cell(time_bucket=TimeBucket.WEEK, bucket_start=date(2024, 1, 1), bucket_end=date(2024, 1, 7)),
        _cell(time_bucket=TimeBucket.MONTH),
        _cell(time_bucket=TimeBucket.QUARTER, bucket_start=date(2024, 1, 1), bucket_end=date(2024, 3, 31)),
    ]
    result = generate_extended_kpis(cells)
    assert set(result.keys()) == set(PLUS_BUCKETS)
    assert len(result[TimeBucket.WEEK]) == 1
    assert len(result[TimeBucket.MONTH]) == 1
    assert len(result[TimeBucket.QUARTER]) == 1


def test_extended_kpis_custom_buckets():
    """Custom bucket list should be respected."""
    cells = [
        _cell(time_bucket=TimeBucket.DAY, bucket_start=date(2024, 1, 1), bucket_end=date(2024, 1, 1)),
        _cell(time_bucket=TimeBucket.YEAR, bucket_start=date(2024, 1, 1), bucket_end=date(2024, 12, 31)),
    ]
    result = generate_extended_kpis(cells, buckets=[TimeBucket.DAY, TimeBucket.YEAR])
    assert set(result.keys()) == {TimeBucket.DAY, TimeBucket.YEAR}
    assert len(result[TimeBucket.DAY]) == 1
    assert len(result[TimeBucket.YEAR]) == 1


def test_extended_kpis_filters_by_bucket():
    """Each bucket key should only contain cells matching that bucket."""
    cells = [
        _cell(time_bucket=TimeBucket.WEEK, bucket_start=date(2024, 1, 1), bucket_end=date(2024, 1, 7), case_count=5),
        _cell(time_bucket=TimeBucket.MONTH, case_count=20),
        _cell(time_bucket=TimeBucket.DAY, bucket_start=date(2024, 1, 1), bucket_end=date(2024, 1, 1), case_count=1),
    ]
    result = generate_extended_kpis(cells)
    # DAY cells should not appear since PLUS_BUCKETS does not include DAY
    assert TimeBucket.DAY not in result
    # WEEK should have the week cell
    assert len(result[TimeBucket.WEEK]) == 1
    assert result[TimeBucket.WEEK][0].total_cases == 5
    # MONTH should have the month cell
    assert len(result[TimeBucket.MONTH]) == 1
    assert result[TimeBucket.MONTH][0].total_cases == 20
    # QUARTER has no matching cells so empty
    assert result[TimeBucket.QUARTER] == []


def test_extended_kpis_with_previous_period():
    """Trend calculation should work across extended history with previous cells."""
    current = [
        _cell(time_bucket=TimeBucket.MONTH, case_count=100),
    ]
    previous = [
        _cell(time_bucket=TimeBucket.MONTH, case_count=50),
    ]
    result = generate_extended_kpis(current, previous_cells=previous)
    month_kpis = result[TimeBucket.MONTH]
    assert len(month_kpis) == 1
    # 100 vs 50 => 100% increase => "up"
    assert month_kpis[0].trend_direction == "up"
