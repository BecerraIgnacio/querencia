"""Tests for the public ingestion module."""

import pytest
from querencia_pipeline.modules.public_ingestion.ingest import ingest_csv, ingest_json
from querencia_pipeline.modules.models.taxonomy import ReportSource
from tests.fixtures.sample_csv_rows import VALID_CSV_ROWS, INVALID_CSV_ROWS


def test_ingest_csv_produces_raw_records():
    records = ingest_csv("senasa_ar", VALID_CSV_ROWS)
    assert len(records) == len(VALID_CSV_ROWS)


def test_ingest_csv_sets_source():
    records = ingest_csv("senasa_ar", VALID_CSV_ROWS)
    for r in records:
        assert r.source == ReportSource.PUBLIC_DATASET


def test_ingest_csv_captures_disease_name():
    records = ingest_csv("senasa_ar", VALID_CSV_ROWS)
    assert records[0].raw_disease_name == "Foot and Mouth Disease"


def test_ingest_csv_captures_coordinates():
    records = ingest_csv("senasa_ar", VALID_CSV_ROWS)
    assert records[0].raw_lat == pytest.approx(-34.6037)
    assert records[0].raw_lng == pytest.approx(-58.3816)


def test_ingest_csv_handles_missing_lat():
    records = ingest_csv("senasa_ar", INVALID_CSV_ROWS)
    assert records[0].raw_lat is None


def test_ingest_json_produces_raw_records():
    items = [
        {"disease": "avian influenza", "species": "chicken", "date": "2024-03-01",
         "lat": -34.6, "lng": -58.4},
    ]
    records = ingest_json("oie_wahis", items)
    assert len(records) == 1
    assert records[0].raw_disease_name == "avian influenza"


def test_ingest_json_preserves_raw_payload():
    items = [{"disease": "fmd", "species": "cattle", "date": "2024-01-01", "extra": "data"}]
    records = ingest_json("test_source", items)
    assert records[0].raw_payload["extra"] == "data"
