"""Single point in a time-series trend."""

from pydantic import BaseModel
from datetime import date

from .taxonomy import AnimalType, TimeBucket


class TrendPoint(BaseModel):
    """One data point in a disease trend series."""

    disease_key: str
    animal_type: AnimalType
    time_bucket: TimeBucket
    bucket_start: date
    bucket_end: date
    total_cases: int
    affected_hex_count: int
    peak_intensity: float
