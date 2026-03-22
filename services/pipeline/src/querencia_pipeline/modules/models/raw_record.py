"""Raw ingestion record model."""

from pydantic import BaseModel, Field
from datetime import datetime
from typing import Any

from .taxonomy import ReportSource


class RawRecord(BaseModel):
    """A record exactly as received from a source, before normalization."""

    source_id: str = Field(description="Unique ID from the originating source.")
    source: ReportSource
    ingested_at: datetime = Field(default_factory=datetime.utcnow)

    # Raw fields — may be messy, in any language, or missing
    raw_disease_name: str | None = None
    raw_species: str | None = None
    raw_date: str | None = None
    raw_location: str | None = None
    raw_lat: float | None = None
    raw_lng: float | None = None

    # Full raw payload preserved for audit
    raw_payload: dict[str, Any] = Field(default_factory=dict)
