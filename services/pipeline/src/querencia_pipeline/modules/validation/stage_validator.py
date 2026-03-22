"""Boundary validation between pipeline stages."""

from dataclasses import dataclass, field
from typing import Any

from ..models.raw_record import RawRecord
from ..models.normalized_record import NormalizedRecord
from ..models.taxonomy import ReportSource


@dataclass
class ValidationResult:
    valid: bool
    errors: list[str] = field(default_factory=list)
    warnings: list[str] = field(default_factory=list)


def validate_raw_record(record: RawRecord) -> ValidationResult:
    errors: list[str] = []
    warnings: list[str] = []

    if not record.source_id:
        errors.append("source_id is required.")
    if record.raw_disease_name is None:
        warnings.append("raw_disease_name is missing.")
    if record.raw_species is None:
        warnings.append("raw_species is missing.")
    if record.raw_date is None:
        warnings.append("raw_date is missing.")
    if record.raw_lat is not None and not (-90 <= record.raw_lat <= 90):
        errors.append(f"raw_lat out of range: {record.raw_lat}")
    if record.raw_lng is not None and not (-180 <= record.raw_lng <= 180):
        errors.append(f"raw_lng out of range: {record.raw_lng}")

    return ValidationResult(valid=len(errors) == 0, errors=errors, warnings=warnings)


def validate_report_record(record: RawRecord) -> ValidationResult:
    """Validate a RawRecord originating from a user report."""
    errors: list[str] = []
    warnings: list[str] = []

    if not record.source_id:
        errors.append("source_id is required.")
    if record.source != ReportSource.USER_REPORT:
        errors.append(
            f"Expected source USER_REPORT, got {record.source.value}."
        )
    if record.raw_disease_name is None:
        warnings.append("raw_disease_name is missing.")
    if record.raw_species is None:
        warnings.append("raw_species is missing.")

    return ValidationResult(valid=len(errors) == 0, errors=errors, warnings=warnings)


def validate_normalized_record(record: NormalizedRecord) -> ValidationResult:
    errors: list[str] = []
    warnings: list[str] = []

    if not record.disease_key:
        errors.append("disease_key is required.")
    if not record.animal_type:
        errors.append("animal_type is required.")
    if record.reported_date is None:
        errors.append("reported_date is required.")

    return ValidationResult(valid=len(errors) == 0, errors=errors, warnings=warnings)
