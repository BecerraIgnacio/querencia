# Architecture Summary

## Stack
- Web app: Next.js + TypeScript in `apps/web`
- Data pipeline: Python in `services/pipeline`
- Auth and data platform: Supabase in `supabase`
- Shared contracts and primitives: `packages/*`

## Main Runtime Modules
- `apps/web/src/modules/animal-selection`
- `apps/web/src/modules/disease-catalog`
- `apps/web/src/modules/disease-view`
- `apps/web/src/modules/reporting`
- `apps/web/src/modules/alerts`
- `apps/web/src/modules/dashboards`
- `apps/web/src/modules/account-plan`
- `services/pipeline/src/querencia_pipeline/modules/*`

## Shared Base
- `packages/contracts`: cross-stack types and interface shapes
- `packages/core-domain`: stable business vocabulary and invariants
- `packages/authz`: organization access tiers and operational access policies
- `packages/map-hex`: legacy transitional utilities, no longer the public product model
- `packages/ui`: shared UI primitives
- `packages/config`: cross-project configuration
- `packages/testing`: shared test helpers

## Data Flow
1. Official records, verified veterinary reports, and public-source intelligence enter the system.
2. Pipeline normalizes diseases, species, dates, sources, and territories.
3. Records are georeferenced and mapped to administrative regions.
4. Aggregations are produced by region and time bucket.
5. Confidence, source mix, and anonymity policies are applied before public materialization.
6. Web APIs read region-level aggregates for public views and operational dashboards.

## Localization Model
- User-facing routes are locale-prefixed: `/en` and `/es`.
- Browser or geo detection selects the initial locale; if ambiguous, default to Spanish.
- Stable IDs, taxonomy keys, scientific identifiers, and aggregation keys stay language-neutral.
- `packages/contracts` carries locale primitives, localized disease content, localized alert/export labels, and `preferredLocale`.

## Folder Conventions
- `apps/`: runnable application surfaces
- `services/`: non-UI executable services
- `packages/`: reusable shared base
- `docs/`: the source of truth for product, architecture, plans, rules, and state
- `.claude/`: Claude Code agents, skills, inventories, templates, and agent memory

## Boundary Rules
- Cross-module imports are discouraged; modules depend on shared packages instead.
- Shared contracts, ADRs, runtime rules, and transversal Claude resources are protected.
- User-authored free text keeps its original language and is not auto-translated.
- Plans must declare exact write scope, required runtime resources, and validation commands.
- Public views never render exact premises, raw addresses, or precise point maps.
- Operational reporting is confidential by default and restricted to verified veterinarians.
