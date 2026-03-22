"""Tests for collaborative user report ingestion."""

import uuid

from querencia_pipeline.modules.report_ingestion.ingest_reports import (
    ingest_user_reports,
)
from querencia_pipeline.modules.models.taxonomy import ReportSource


def _make_report(**overrides) -> dict:
    defaults = {
        "id": str(uuid.uuid4()),
        "user_id": str(uuid.uuid4()),
        "disease_id": "fmd",
        "animal_type": "bovine",
        "source": "user_report",
        "visibility": "collaborative",
        "status": "accepted",
        "reported_at": "2024-06-15T10:00:00Z",
        "notes": "Observed symptoms in herd",
        "notes_locale": "en",
        "hex_cell_id": None,
        "territory_id": None,
        "created_at": "2024-06-15T10:00:00Z",
        "updated_at": "2024-06-15T10:00:00Z",
    }
    defaults.update(overrides)
    return defaults


def test_ingest_accepted_collaborative_report():
    reports = [_make_report(visibility="collaborative", status="accepted")]
    records = ingest_user_reports(reports)
    assert len(records) == 1


def test_ingest_accepted_public_report():
    reports = [_make_report(visibility="public", status="accepted")]
    records = ingest_user_reports(reports)
    assert len(records) == 1


def test_skip_private_report():
    reports = [_make_report(visibility="private", status="accepted")]
    records = ingest_user_reports(reports)
    assert len(records) == 0


def test_skip_pending_report():
    reports = [_make_report(status="pending_review")]
    records = ingest_user_reports(reports)
    assert len(records) == 0


def test_skip_rejected_report():
    reports = [_make_report(status="rejected")]
    records = ingest_user_reports(reports)
    assert len(records) == 0


def test_report_source_is_user_report():
    reports = [_make_report()]
    records = ingest_user_reports(reports)
    assert records[0].source == ReportSource.USER_REPORT


def test_report_source_id_format():
    report_id = str(uuid.uuid4())
    reports = [_make_report(id=report_id)]
    records = ingest_user_reports(reports)
    assert records[0].source_id == f"report:{report_id}"
