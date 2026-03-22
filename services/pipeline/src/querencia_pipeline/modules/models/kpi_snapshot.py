"""KPI snapshot model."""

from pydantic import BaseModel
from datetime import date

from .taxonomy import AnimalType, TimeBucket


class KpiSnapshot(BaseModel):
    disease_key: str
    animal_type: AnimalType
    time_bucket: TimeBucket
    bucket_start: date
    bucket_end: date
    total_cases: int
    affected_hex_count: int
    peak_intensity: float
    trend_direction: str  # "up" | "down" | "stable"
