"""Public dataset ingestion entry point."""

import csv
import json
from datetime import datetime
from typing import Any, Iterator

from ..models.raw_record import RawRecord
from ..models.taxonomy import ReportSource
from .source_registry import get_source


def ingest_csv(source_id: str, rows: list[dict[str, str]]) -> list[RawRecord]:
    """Ingest rows from a CSV source into RawRecords."""
    config = get_source(source_id)
    records: list[RawRecord] = []

    for i, row in enumerate(rows):
        record = RawRecord(
            source_id=f"{source_id}:{i}",
            source=ReportSource.PUBLIC_DATASET,
            ingested_at=datetime.utcnow(),
            raw_disease_name=row.get("disease") or row.get("enfermedad"),
            raw_species=row.get("species") or row.get("especie"),
            raw_date=row.get("date") or row.get("fecha"),
            raw_location=row.get("location") or row.get("ubicacion"),
            raw_lat=_parse_float(row.get("lat")),
            raw_lng=_parse_float(row.get("lng") or row.get("lon")),
            raw_payload=row,
        )
        records.append(record)

    return records


def ingest_json(source_id: str, items: list[dict[str, Any]]) -> list[RawRecord]:
    """Ingest items from a JSON source into RawRecords."""
    records: list[RawRecord] = []

    for i, item in enumerate(items):
        record = RawRecord(
            source_id=f"{source_id}:{i}",
            source=ReportSource.PUBLIC_DATASET,
            ingested_at=datetime.utcnow(),
            raw_disease_name=item.get("disease"),
            raw_species=item.get("species"),
            raw_date=str(item.get("date", "")),
            raw_location=item.get("location"),
            raw_lat=item.get("lat"),
            raw_lng=item.get("lng") or item.get("lon"),
            raw_payload=item,
        )
        records.append(record)

    return records


def _parse_float(value: str | None) -> float | None:
    if value is None:
        return None
    try:
        return float(value)
    except (ValueError, TypeError):
        return None
