# Public API Contract

## Primary Public Endpoints
- list animal types
- list diseases by animal
- get disease detail
- get aggregated regional activity by animal, disease, and time range
- get public KPIs

## Contract Rules
- Public endpoints accept a locale signal for English or Spanish responses.
- Public responses must not contain exact private coordinates, producer identity, or free-text address fields.
- Disease lists are filtered by linked animal type.
- Stable IDs are shared across locales; localized slugs are not the primary contract key.
- Region intensity depends on selected time range.
- Public activity responses include administrative regions, not hex cells.
- Public KPIs expose source-labeled aggregates, not raw report streams.
