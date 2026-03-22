"""Disease, species, date, and location normalization."""

from .disease_catalog import (
    DiseaseCatalogEntry,
    DISEASE_CATALOG,
    get_catalog_entry,
    get_diseases_by_animal,
    validate_catalog_completeness,
)
