"""Collaborative user report ingestion into the pipeline."""

from datetime import datetime, timezone
from typing import Any

from ..models.raw_record import RawRecord
from ..models.taxonomy import ReportSource

# Only these statuses and visibilities qualify for pipeline ingestion.
_ACCEPTED_STATUS = "accepted"
_ELIGIBLE_VISIBILITIES = frozenset({"collaborative", "public"})


def ingest_user_reports(reports: list[dict[str, Any]]) -> list[RawRecord]:
    """Convert qualifying user reports into RawRecords for the pipeline.

    Only reports with status 'accepted' and visibility 'collaborative' or
    'public' are processed. All others are silently skipped.

    User reports carry no coordinates by design (privacy-preserving). The
    disease_id and animal_type fields are already canonical keys from the
    submission form, so they are passed through as-is for normalization.
    """
    records: list[RawRecord] = []

    for report in reports:
        if report.get("status") != _ACCEPTED_STATUS:
            continue
        if report.get("visibility") not in _ELIGIBLE_VISIBILITIES:
            continue

        record = RawRecord(
            source_id=f"report:{report['id']}",
            source=ReportSource.USER_REPORT,
            ingested_at=datetime.now(timezone.utc),
            raw_disease_name=report.get("disease_id"),
            raw_species=report.get("animal_type"),
            raw_date=report.get("reported_at"),
            raw_location=None,
            raw_lat=None,
            raw_lng=None,
            raw_payload=report,
        )
        records.append(record)

    return records
