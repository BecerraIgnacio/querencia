# Privacy Aggregation Contract

## Non-Negotiable Rules
- Never expose exact farm coordinates publicly.
- Never expose producer identity publicly.
- Never expose address text publicly.
- Use administrative regions for public display.
- Enforce minimum anonymity thresholds for low-volume regions.
- Delay or suppress sensitive public activity when regions are too sparse.

## Implementation Implication
- Any public map, KPI, trend, or dashboard must read from aggregated regional outputs, not raw records.
- Internal v1 operations remain region-level as well.
