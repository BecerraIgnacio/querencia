"""Map raw species strings to canonical AnimalType taxonomy keys."""

from ..models.taxonomy import AnimalType

SPECIES_ALIASES: dict[AnimalType, list[str]] = {
    AnimalType.BOVINE: [
        "bovine", "bovino", "bovinos", "cattle", "cow", "cows", "bull", "bulls",
        "beef", "dairy", "vacuno", "res", "vacas", "toro", "toros",
    ],
    AnimalType.PORCINE: [
        "porcine", "porcino", "porcinos", "pig", "pigs", "swine", "hog", "hogs",
        "cerdo", "cerdos", "chancho", "chanchos", "puerco",
    ],
    AnimalType.AVIAN: [
        "avian", "aviar", "aves", "bird", "birds", "poultry", "chicken", "chickens",
        "hen", "hens", "rooster", "duck", "ducks", "turkey", "turkeys",
        "gallina", "gallinas", "pato", "patos", "pavo", "pavos",
    ],
}

_ALIAS_TO_TYPE: dict[str, AnimalType] = {}
for animal_type, aliases in SPECIES_ALIASES.items():
    for alias in aliases:
        _ALIAS_TO_TYPE[alias.lower().strip()] = animal_type


def resolve_animal_type(raw_species: str) -> AnimalType | None:
    """Return the canonical AnimalType for a raw species string, or None."""
    return _ALIAS_TO_TYPE.get(raw_species.lower().strip())
