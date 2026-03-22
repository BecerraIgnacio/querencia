"""Mock geocoder for development and testing."""

from ..models.normalized_record import NormalizedRecord
from ..models.geocoded_record import GeocodedRecord


class MockGeocoder:
    """
    Returns coordinates directly from the record if present,
    otherwise falls back to a fixed test centroid.
    """

    # Default centroid (Buenos Aires, Argentina)
    DEFAULT_LAT = -34.6037
    DEFAULT_LNG = -58.3816

    def geocode(self, record: NormalizedRecord) -> GeocodedRecord | None:
        lat = record.raw_lat if record.raw_lat is not None else self.DEFAULT_LAT
        lng = record.raw_lng if record.raw_lng is not None else self.DEFAULT_LNG

        return GeocodedRecord(
            source_id=record.source_id,
            source=record.source,
            ingested_at=record.ingested_at,
            disease_key=record.disease_key,
            animal_type=record.animal_type,
            reported_date=record.reported_date,
            lat=lat,
            lng=lng,
            geocoder_used="mock",
        )
