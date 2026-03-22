"""Geocoding stage: normalized records -> geocoded records."""

from ..models.normalized_record import NormalizedRecord
from ..models.geocoded_record import GeocodedRecord
from .geocoder_interface import GeocoderInterface
from .mock_geocoder import MockGeocoder


def geocode_records(
    records: list[NormalizedRecord],
    geocoder: GeocoderInterface | None = None,
) -> list[GeocodedRecord]:
    """Geocode a batch of normalized records using the provided geocoder."""
    if geocoder is None:
        geocoder = MockGeocoder()

    results: list[GeocodedRecord] = []
    for record in records:
        geocoded = geocoder.geocode(record)
        if geocoded is not None:
            results.append(geocoded)
    return results
