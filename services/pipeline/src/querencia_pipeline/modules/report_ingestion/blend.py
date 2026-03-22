"""Blend public and collaborative report hex records for aggregation."""

from ..models.hex_record import HexRecord


def blend_sources(
    public_records: list[HexRecord],
    report_records: list[HexRecord],
) -> list[HexRecord]:
    """Concatenate public-dataset and user-report hex records.

    The downstream aggregation groups by (hex_id, disease_key, animal_type,
    bucket_start), so records from both sources merge naturally into the same
    aggregated cells. No explicit deduplication is needed here.
    """
    return public_records + report_records
