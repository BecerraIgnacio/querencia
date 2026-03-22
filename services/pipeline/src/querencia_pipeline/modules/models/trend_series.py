"""Trend series: ordered sequence of trend points for a disease+animal combination."""

from pydantic import BaseModel

from .taxonomy import AnimalType, TimeBucket
from .trend_point import TrendPoint


class TrendSeries(BaseModel):
    """Complete trend series for dashboard consumption."""

    disease_key: str
    animal_type: AnimalType
    time_bucket: TimeBucket
    points: list[TrendPoint]
    period_count: int  # number of buckets in the series
    overall_trend: str  # "up" | "down" | "stable"
    total_cases_sum: int  # sum across all points
    peak_intensity_max: float  # max intensity across all points
