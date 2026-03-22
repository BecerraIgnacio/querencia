"""Tests for report record validation."""

from datetime import datetime

from querencia_pipeline.modules.validation.stage_validator import (
    validate_report_record,
)
from querencia_pipeline.modules.models.raw_record import RawRecord
from querencia_pipeline.modules.models.taxonomy import ReportSource


def _make_report_raw(**kwargs) -> RawRecord:
    defaults = dict(
        source_id="report:abc-123",
        source=ReportSource.USER_REPORT,
        ingested_at=datetime.utcnow(),
        raw_disease_name="fmd",
        raw_species="bovine",
        raw_date="2024-06-15T10:00:00Z",
    )
    defaults.update(kwargs)
    return RawRecord(**defaults)


def test_validate_report_record_valid():
    result = validate_report_record(_make_report_raw())
    assert result.valid is True
    assert result.errors == []


def test_validate_report_record_missing_source_id():
    result = validate_report_record(_make_report_raw(source_id=""))
    assert result.valid is False
    assert any("source_id" in e for e in result.errors)


def test_validate_report_record_wrong_source():
    result = validate_report_record(
        _make_report_raw(source=ReportSource.PUBLIC_DATASET)
    )
    assert result.valid is False
    assert any("USER_REPORT" in e for e in result.errors)
