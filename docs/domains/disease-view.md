# Disease View

## Required Elements
- region-level activity view
- time filter or timeline
- public KPIs
- disease information panel
- operational dashboard surfaces when authorized

## Disease Information Fields
- name
- summary
- affected species
- transmission method
- contagiousness level
- severity level
- symptoms
- production impact
- notes
- source references

## Boundary
- The disease view consumes aggregated data and content contracts. It must not fetch exact farm coordinates for public rendering.
- Disease content is locale-aware. Stable disease IDs are shared across languages.
- Public disease views show region-level activity only.
- Operational disease views may include review and alerting context, but remain region-level in v1.
