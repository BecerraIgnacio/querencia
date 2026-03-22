"""Normalization pipeline stage: raw records -> normalized records."""

from ..models.raw_record import RawRecord
from ..models.normalized_record import NormalizedRecord
from .disease_resolver import resolve_disease_key
from .species_mapper import resolve_animal_type
from .date_parser import parse_date


def normalize_record(raw: RawRecord) -> NormalizedRecord | None:
    """
    Normalize a single raw record. Returns None if the record cannot be
    normalized (missing required fields after resolution).
    """
    notes: list[str] = []

    # Resolve disease key
    disease_key: str | None = None
    if raw.raw_disease_name:
        disease_key = resolve_disease_key(raw.raw_disease_name)
        if disease_key is None:
            notes.append(f"Unresolved disease name: '{raw.raw_disease_name}'")
    if disease_key is None:
        return None

    # Resolve animal type
    animal_type = None
    if raw.raw_species:
        animal_type = resolve_animal_type(raw.raw_species)
        if animal_type is None:
            notes.append(f"Unresolved species: '{raw.raw_species}'")
    if animal_type is None:
        return None

    # Parse date
    reported_date = None
    if raw.raw_date:
        reported_date = parse_date(raw.raw_date)
        if reported_date is None:
            notes.append(f"Unparseable date: '{raw.raw_date}'")
    if reported_date is None:
        return None

    return NormalizedRecord(
        source_id=raw.source_id,
        source=raw.source,
        ingested_at=raw.ingested_at,
        disease_key=disease_key,
        animal_type=animal_type,
        reported_date=reported_date,
        raw_location=raw.raw_location,
        raw_lat=raw.raw_lat,
        raw_lng=raw.raw_lng,
        normalization_notes=notes,
    )


def normalize_records(raws: list[RawRecord]) -> list[NormalizedRecord]:
    """Normalize a batch of raw records, dropping those that cannot be resolved."""
    results = []
    for raw in raws:
        normalized = normalize_record(raw)
        if normalized is not None:
            results.append(normalized)
    return results
