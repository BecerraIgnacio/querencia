"""Tests for disease resolver, species mapper, date parser, and normalize."""

import pytest
from datetime import date

from querencia_pipeline.modules.normalization.disease_resolver import resolve_disease_key
from querencia_pipeline.modules.normalization.species_mapper import resolve_animal_type
from querencia_pipeline.modules.normalization.date_parser import parse_date
from querencia_pipeline.modules.normalization.normalize import normalize_record, normalize_records
from querencia_pipeline.modules.models.taxonomy import AnimalType, ReportSource
from querencia_pipeline.modules.public_ingestion.ingest import ingest_csv
from tests.fixtures.sample_csv_rows import VALID_CSV_ROWS


class TestDiseaseResolver:
    def test_resolves_english_name(self):
        assert resolve_disease_key("Foot and Mouth Disease") == "fmd"

    def test_resolves_spanish_name(self):
        assert resolve_disease_key("Fiebre Aftosa") == "fmd"

    def test_resolves_abbreviation(self):
        assert resolve_disease_key("ASF") == "african_swine_fever"

    def test_returns_none_for_unknown(self):
        assert resolve_disease_key("unknown disease xyz") is None

    def test_case_insensitive(self):
        assert resolve_disease_key("BRUCELLOSIS") == "brucellosis"


class TestSpeciesMapper:
    def test_maps_cattle_to_bovine(self):
        assert resolve_animal_type("cattle") == AnimalType.BOVINE

    def test_maps_cerdos_to_porcine(self):
        assert resolve_animal_type("cerdos") == AnimalType.PORCINE

    def test_maps_chicken_to_avian(self):
        assert resolve_animal_type("chicken") == AnimalType.AVIAN

    def test_returns_none_for_unknown(self):
        assert resolve_animal_type("dragon") is None


class TestDateParser:
    def test_parses_iso_format(self):
        assert parse_date("2024-03-15") == date(2024, 3, 15)

    def test_parses_slash_format_dmy(self):
        assert parse_date("15/03/2024") == date(2024, 3, 15)

    def test_parses_dot_format(self):
        assert parse_date("15.03.2024") == date(2024, 3, 15)

    def test_returns_none_for_invalid(self):
        assert parse_date("not-a-date") is None

    def test_returns_none_for_empty(self):
        assert parse_date("") is None


class TestNormalize:
    def test_normalizes_valid_record(self):
        raws = ingest_csv("test", VALID_CSV_ROWS[:1])
        result = normalize_record(raws[0])
        assert result is not None
        assert result.disease_key == "fmd"
        assert result.animal_type == AnimalType.BOVINE
        assert result.reported_date == date(2024, 3, 15)

    def test_drops_record_with_unresolvable_disease(self):
        from querencia_pipeline.modules.models.raw_record import RawRecord
        from datetime import datetime
        raw = RawRecord(
            source_id="test:1",
            source=ReportSource.PUBLIC_DATASET,
            ingested_at=datetime.utcnow(),
            raw_disease_name="xyz_unknown_disease",
            raw_species="cattle",
            raw_date="2024-01-01",
        )
        assert normalize_record(raw) is None

    def test_normalize_records_batch(self):
        raws = ingest_csv("test", VALID_CSV_ROWS)
        results = normalize_records(raws)
        assert len(results) == len(VALID_CSV_ROWS)
