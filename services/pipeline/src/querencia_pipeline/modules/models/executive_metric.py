"""Pro-level executive metric models."""

from pydantic import BaseModel, Field
from datetime import date

from .taxonomy import AnimalType, TimeBucket


class DiseaseRanking(BaseModel):
    """Ranked disease by severity/priority within an animal type."""

    disease_key: str
    animal_type: AnimalType
    rank: int
    total_cases: int
    affected_hex_count: int
    velocity: float  # rate of change over recent periods
    severity_score: float = Field(ge=0.0, le=1.0)  # composite score


class CriticalZone(BaseModel):
    """A hex cell flagged as high-priority."""

    hex_id: str
    disease_key: str
    animal_type: AnimalType
    case_count: int
    intensity: float
    is_hotspot: bool  # intensity above hotspot threshold
    rank: int


class ExecutiveSnapshot(BaseModel):
    """Top-level executive summary for a time period."""

    animal_type: AnimalType
    time_bucket: TimeBucket
    bucket_start: date
    bucket_end: date
    total_diseases_active: int
    total_cases: int
    total_affected_hex: int
    top_diseases: list[DiseaseRanking]
    critical_zones: list[CriticalZone]
    overall_trend: str  # "up" | "down" | "stable"
