"""Tests for trend-series generation from aggregated cells."""

from datetime import date

from querencia_pipeline.modules.models.aggregated_cell import AggregatedCell
from querencia_pipeline.modules.models.taxonomy import AnimalType, TimeBucket
from querencia_pipeline.modules.kpi_generation.trend_series_generator import (
    generate_trend_series,
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
    **kwargs,
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
        **kwargs,
    )


def test_empty_cells_produce_empty_series():
    result = generate_trend_series([], TimeBucket.MONTH)
    assert result == []


def test_single_period_produces_stable_trend():
    cells = [_cell(bucket_start=date(2024, 1, 1), bucket_end=date(2024, 1, 31))]
    series = generate_trend_series(cells, TimeBucket.MONTH)
    assert len(series) == 1
    assert series[0].overall_trend == "stable"
    assert series[0].period_count == 1
    assert len(series[0].points) == 1


def test_multiple_periods_ascending():
    cells = [
        _cell(bucket_start=date(2024, 1, 1), bucket_end=date(2024, 1, 31), case_count=5),
        _cell(bucket_start=date(2024, 2, 1), bucket_end=date(2024, 2, 29), case_count=10),
        _cell(bucket_start=date(2024, 3, 1), bucket_end=date(2024, 3, 31), case_count=20),
        _cell(bucket_start=date(2024, 4, 1), bucket_end=date(2024, 4, 30), case_count=40),
    ]
    series = generate_trend_series(cells, TimeBucket.MONTH)
    assert len(series) == 1
    assert series[0].overall_trend == "up"


def test_multiple_periods_descending():
    cells = [
        _cell(bucket_start=date(2024, 1, 1), bucket_end=date(2024, 1, 31), case_count=40),
        _cell(bucket_start=date(2024, 2, 1), bucket_end=date(2024, 2, 29), case_count=20),
        _cell(bucket_start=date(2024, 3, 1), bucket_end=date(2024, 3, 31), case_count=10),
        _cell(bucket_start=date(2024, 4, 1), bucket_end=date(2024, 4, 30), case_count=5),
    ]
    series = generate_trend_series(cells, TimeBucket.MONTH)
    assert len(series) == 1
    assert series[0].overall_trend == "down"


def test_suppressed_cells_excluded():
    cells = [
        _cell(bucket_start=date(2024, 1, 1), bucket_end=date(2024, 1, 31), suppressed=True),
        _cell(bucket_start=date(2024, 2, 1), bucket_end=date(2024, 2, 29), suppressed=False),
    ]
    series = generate_trend_series(cells, TimeBucket.MONTH)
    assert len(series) == 1
    assert series[0].period_count == 1
    # Only the non-suppressed point should appear
    assert series[0].points[0].bucket_start == date(2024, 2, 1)


def test_series_grouped_by_disease_and_animal():
    cells = [
        _cell(disease_key="fmd", animal_type=AnimalType.BOVINE),
        _cell(disease_key="asf", animal_type=AnimalType.PORCINE),
    ]
    series = generate_trend_series(cells, TimeBucket.MONTH)
    assert len(series) == 2
    keys = {(s.disease_key, s.animal_type) for s in series}
    assert ("fmd", AnimalType.BOVINE) in keys
    assert ("asf", AnimalType.PORCINE) in keys


def test_points_sorted_by_bucket_start():
    cells = [
        _cell(bucket_start=date(2024, 3, 1), bucket_end=date(2024, 3, 31)),
        _cell(bucket_start=date(2024, 1, 1), bucket_end=date(2024, 1, 31)),
        _cell(bucket_start=date(2024, 2, 1), bucket_end=date(2024, 2, 29)),
    ]
    series = generate_trend_series(cells, TimeBucket.MONTH)
    assert len(series) == 1
    dates = [p.bucket_start for p in series[0].points]
    assert dates == sorted(dates)


def test_total_cases_sum_correct():
    cells = [
        _cell(bucket_start=date(2024, 1, 1), bucket_end=date(2024, 1, 31), case_count=10),
        _cell(bucket_start=date(2024, 2, 1), bucket_end=date(2024, 2, 29), case_count=20),
        _cell(bucket_start=date(2024, 3, 1), bucket_end=date(2024, 3, 31), case_count=30),
    ]
    series = generate_trend_series(cells, TimeBucket.MONTH)
    assert series[0].total_cases_sum == 60


def test_peak_intensity_max_correct():
    cells = [
        _cell(
            bucket_start=date(2024, 1, 1),
            bucket_end=date(2024, 1, 31),
            intensity=0.3,
        ),
        _cell(
            bucket_start=date(2024, 2, 1),
            bucket_end=date(2024, 2, 29),
            intensity=0.9,
        ),
        _cell(
            bucket_start=date(2024, 3, 1),
            bucket_end=date(2024, 3, 31),
            intensity=0.5,
        ),
    ]
    series = generate_trend_series(cells, TimeBucket.MONTH)
    assert series[0].peak_intensity_max == 0.9
