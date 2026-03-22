"""Aggregated hex cell model — privacy-safe output."""

from pydantic import BaseModel, Field
from datetime import date

from .taxonomy import AnimalType, TimeBucket


class AggregatedCell(BaseModel):
    hex_id: str
    hex_resolution: int = 7
    disease_key: str
    animal_type: AnimalType
    time_bucket: TimeBucket
    bucket_start: date
    bucket_end: date
    case_count: int
    intensity: float = Field(ge=0.0, le=1.0)
    suppressed: bool = Field(
        default=False,
        description="True when case_count < MIN_ANONYMITY_THRESHOLD.",
    )
