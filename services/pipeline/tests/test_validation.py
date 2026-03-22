"""Tests for stage_validator."""

from datetime import datetime, date

from querencia_pipeline.modules.validation.stage_validator import (
    validate_raw_record,
    validate_normalized_record,
)
from querencia_pipeline.modules.models.raw_record import RawRecord
from querencia_pipeline.modules.models.normalized_record import NormalizedRecord
from querencia_pipeline.modules.models.taxonomy import AnimalType, ReportSource


def _make_raw(**kwargs) -> RawRecord:
    defaults = dict(
        source_id="test:1",
        source=ReportSource.PUBLIC_DATASET,
        ingested_at=datetime.utcnow(),
        raw_disease_name="fmd",
        raw_species="cattle",
        raw_date="2024-01-01",
    )
    defaults.update(kwargs)
    return RawRecord(**defaults)


def _make_normalized(**kwargs) -> NormalizedRecord:
    defaults = dict(
        source_id="test:1",
        source=ReportSource.PUBLIC_DATASET,
        ingested_at=datetime.utcnow(),
        disease_key="fmd",
        animal_type=AnimalType.BOVINE,
        reported_date=date(2024, 1, 1),
    )
    defaults.update(kwargs)
    return NormalizedRecord(**defaults)


class TestValidateRawRecord:
    def test_valid_record_passes(self):
        result = validate_raw_record(_make_raw())
        assert result.valid is True
        assert result.errors == []

    def test_missing_source_id_fails(self):
        result = validate_raw_record(_make_raw(source_id=""))
        assert result.valid is False
        assert any("source_id" in e for e in result.errors)

    def test_out_of_range_lat_fails(self):
        result = validate_raw_record(_make_raw(raw_lat=200.0))
        assert result.valid is False

    def test_missing_disease_name_is_warning(self):
        result = validate_raw_record(_make_raw(raw_disease_name=None))
        assert result.valid is True
        assert any("raw_disease_name" in w for w in result.warnings)


class TestValidateNormalizedRecord:
    def test_valid_record_passes(self):
        result = validate_normalized_record(_make_normalized())
        assert result.valid is True

    def test_empty_disease_key_fails(self):
        result = validate_normalized_record(_make_normalized(disease_key=""))
        assert result.valid is False
