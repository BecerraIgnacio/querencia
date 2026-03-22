"""Registry of known public data sources."""

from dataclasses import dataclass


@dataclass
class SourceConfig:
    source_id: str
    label: str
    format: str  # "csv" | "json"
    url: str | None = None
    description: str = ""


KNOWN_SOURCES: dict[str, SourceConfig] = {
    "senasa_ar": SourceConfig(
        source_id="senasa_ar",
        label="SENASA Argentina",
        format="csv",
        description="Argentinian national animal health authority.",
    ),
    "oie_wahis": SourceConfig(
        source_id="oie_wahis",
        label="WOAH/OIE WAHIS",
        format="json",
        description="World Organisation for Animal Health surveillance database.",
    ),
    "ica_co": SourceConfig(
        source_id="ica_co",
        label="ICA Colombia",
        format="csv",
        description="Colombian agricultural and livestock authority.",
    ),
}


def get_source(source_id: str) -> SourceConfig | None:
    return KNOWN_SOURCES.get(source_id)
