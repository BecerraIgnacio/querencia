"""Tests for blending public and collaborative hex records."""

from datetime import date, datetime

from querencia_pipeline.modules.report_ingestion.blend import blend_sources
from querencia_pipeline.modules.aggregation.aggregate import aggregate
from querencia_pipeline.modules.models.hex_record import HexRecord
from querencia_pipeline.modules.models.taxonomy import (
    AnimalType,
    ReportSource,
    TimeBucket,
)


def _make_hex_record(
    source: ReportSource = ReportSource.PUBLIC_DATASET,
    hex_id: str = "872830828ffffff",
    disease_key: str = "fmd",
    animal_type: AnimalType = AnimalType.BOVINE,
    reported_date: date = date(2024, 6, 15),
    **kwargs,
) -> HexRecord:
    defaults = dict(
        source_id=f"{source.value}:1",
        source=source,
        ingested_at=datetime.utcnow(),
        disease_key=disease_key,
        animal_type=animal_type,
        reported_date=reported_date,
        hex_id=hex_id,
        hex_resolution=7,
    )
    defaults.update(kwargs)
    return HexRecord(**defaults)


def test_blend_empty_sources():
    result = blend_sources([], [])
    assert result == []


def test_blend_public_only():
    public = [_make_hex_record(source=ReportSource.PUBLIC_DATASET)]
    result = blend_sources(public, [])
    assert len(result) == 1
    assert result[0].source == ReportSource.PUBLIC_DATASET


def test_blend_reports_only():
    reports = [_make_hex_record(source=ReportSource.USER_REPORT)]
    result = blend_sources([], reports)
    assert len(result) == 1
    assert result[0].source == ReportSource.USER_REPORT


def test_blend_mixed():
    public = [_make_hex_record(source=ReportSource.PUBLIC_DATASET, source_id="pub:1")]
    reports = [_make_hex_record(source=ReportSource.USER_REPORT, source_id="rep:1")]
    result = blend_sources(public, reports)
    assert len(result) == 2


def test_blended_aggregation_preserves_privacy():
    """Feed blended records through aggregate() and verify suppression.

    Two records (one public, one user report) in the same hex+disease+animal+month
    should produce a single aggregated cell with case_count=2, which is below the
    MIN_ANONYMITY_THRESHOLD of 3 and therefore suppressed.
    """
    same_date = date(2024, 6, 10)
    same_hex = "872830828ffffff"

    public = [
        _make_hex_record(
            source=ReportSource.PUBLIC_DATASET,
            source_id="pub:1",
            hex_id=same_hex,
            reported_date=same_date,
        ),
    ]
    reports = [
        _make_hex_record(
            source=ReportSource.USER_REPORT,
            source_id="rep:1",
            hex_id=same_hex,
            reported_date=same_date,
        ),
    ]

    blended = blend_sources(public, reports)
    cells = aggregate(blended, TimeBucket.MONTH)

    assert len(cells) == 1
    cell = cells[0]
    assert cell.case_count == 2
    assert cell.suppressed is True  # below anonymity threshold of 3
