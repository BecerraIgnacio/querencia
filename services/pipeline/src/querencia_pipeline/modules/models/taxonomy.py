"""Language-neutral taxonomy definitions."""

from enum import Enum


class AnimalType(str, Enum):
    BOVINE = "bovine"
    PORCINE = "porcine"
    AVIAN = "avian"


class ReportSource(str, Enum):
    PUBLIC_DATASET = "public_dataset"
    USER_REPORT = "user_report"


class TimeBucket(str, Enum):
    DAY = "day"
    WEEK = "week"
    MONTH = "month"
    QUARTER = "quarter"
    YEAR = "year"
