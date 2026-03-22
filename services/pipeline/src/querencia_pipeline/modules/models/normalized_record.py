"""Normalized pipeline record model."""

from pydantic import BaseModel, Field
from datetime import date, datetime

from .taxonomy import AnimalType, ReportSource


class NormalizedRecord(BaseModel):
    """A record after disease name, species, date, and location normalization."""

    source_id: str
    source: ReportSource
    ingested_at: datetime

    # Normalized fields — language-neutral taxonomy keys
    disease_key: str = Field(description="Language-neutral disease taxonomy key.")
    animal_type: AnimalType
    reported_date: date
    raw_location: str | None = None

    # Coordinates may still be raw — geocoding happens later
    raw_lat: float | None = None
    raw_lng: float | None = None

    normalization_notes: list[str] = Field(default_factory=list)
