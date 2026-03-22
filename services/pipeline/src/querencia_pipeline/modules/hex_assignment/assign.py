"""Assign geocoded records to H3 hex cells at resolution 7."""

import h3

from ..models.geocoded_record import GeocodedRecord
from ..models.hex_record import HexRecord

HEX_RESOLUTION = 7


def assign_hex(record: GeocodedRecord) -> HexRecord:
    """Assign a single geocoded record to its H3 hex cell."""
    hex_id = h3.latlng_to_cell(record.lat, record.lng, HEX_RESOLUTION)

    return HexRecord(
        source_id=record.source_id,
        source=record.source,
        ingested_at=record.ingested_at,
        disease_key=record.disease_key,
        animal_type=record.animal_type,
        reported_date=record.reported_date,
        hex_id=hex_id,
        hex_resolution=HEX_RESOLUTION,
    )


def assign_hex_batch(records: list[GeocodedRecord]) -> list[HexRecord]:
    """Assign a batch of geocoded records to their H3 hex cells."""
    return [assign_hex(r) for r in records]
