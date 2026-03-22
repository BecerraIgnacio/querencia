# Current State

## Current Phase
- Strategy Reset — active product model changed after the legacy MVP roadmap

## Active Reset Goals
- Rewrite docs, ADRs, and shared contracts to the regional public-awareness model.
- Replace public hex activity with regional public intelligence.
- Replace consumer plan language with organization access tiers.
- Restrict operational signal reporting to verified veterinarians.
- Start the operational workflow with avian only.

## Legacy Product State
- Legacy MVP1 through MVP4 files remain on disk for reference only.
- The previous state claiming “MVP3 complete, ready for MVP4” is no longer the active product truth.
- Historical completion markers should be interpreted as legacy implementation history, not the current roadmap.

## Active Module-Persistent Plugins
- web: `javascript-typescript`
- pipeline: `python-development`, `data-engineering`

## Completed Baseline
- `P-000` — runtime scaffold completed
- archived `P-001` through `P-008` remain reference-only
- legacy `M1` through `M4` milestone sets remain reference-only after the strategy reset

## Temporary Plugins To Remove
- none

## Notes
- `claude-mem` and `rtk` are part of the fixed transversal runtime baseline.
- Only `kind: leaf` plans with `runnable: true` are valid execution targets.
- The product backlog assumes native English and Spanish support across all user-facing surfaces.
- Pipeline venv at `services/pipeline/.venv/` (not committed); run tests with `.venv/bin/pytest tests/ -v`.
- pnpm workspace: use `npx pnpm@10.6.2` until pnpm is installed globally.
