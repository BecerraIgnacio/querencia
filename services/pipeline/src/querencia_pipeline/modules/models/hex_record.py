"""Hex-assigned record model — after H3 cell assignment."""

from pydantic import BaseModel
from datetime import date, datetime

from .taxonomy import AnimalType, ReportSource


class HexRecord(BaseModel):
    source_id: str
    source: ReportSource
    ingested_at: datetime
    disease_key: str
    animal_type: AnimalType
    reported_date: date
    hex_id: str
    hex_resolution: int = 7
