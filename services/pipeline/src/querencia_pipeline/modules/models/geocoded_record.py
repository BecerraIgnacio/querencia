"""Geocoded record model — after coordinates are resolved."""

from pydantic import BaseModel, Field
from datetime import date, datetime

from .taxonomy import AnimalType, ReportSource


class GeocodedRecord(BaseModel):
    source_id: str
    source: ReportSource
    ingested_at: datetime
    disease_key: str
    animal_type: AnimalType
    reported_date: date
    lat: float
    lng: float
    geocoder_used: str = "unknown"
