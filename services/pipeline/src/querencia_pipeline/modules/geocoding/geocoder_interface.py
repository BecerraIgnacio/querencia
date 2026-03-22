"""Protocol for geocoders."""

from typing import Protocol

from ..models.normalized_record import NormalizedRecord
from ..models.geocoded_record import GeocodedRecord


class GeocoderInterface(Protocol):
    def geocode(self, record: NormalizedRecord) -> GeocodedRecord | None:
        """Return a geocoded record or None if location cannot be resolved."""
        ...
