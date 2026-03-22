# Plans Index

## Execution Model
- Only plans with `kind: leaf` and `runnable: true` are execution targets.
- Phase and track docs are coordination-only. They explain sequencing and dependencies but must never be executed directly.

## Layout
- `P-000-runtime-foundation.md` — completed runtime baseline
- `execution-roadmap.md` — active operator guide for the strategy-reset build order
- `mvp1/` through `mvp4/` — legacy backlog sets kept for reference after the product-model reset
- `archive/` — retired coarse plans kept for reference

## Active Milestones
- `R1` — strategy reset and contract rewrite
- `R2` — public regional awareness layer
- `R3` — avian operational pilot
- `R4` — validation, alerts, and reconciliation
- `R5` — operational expansion

## Legacy Note
- Historical `M1` through `M4` files describe the superseded consumer-plan and public-hex product model.
- Do not use those milestone files as the active source of truth for new work.

## Useful Commands
- `./scripts/list-runnable-plans.sh --ready`
- `./scripts/list-runnable-plans.sh --all`
- `./scripts/plan-context.sh M1-001`
- `./scripts/plan-context.sh M3-004`
- `./scripts/validate-plan.sh docs/plans/mvp1/phase-01-shared-base/M1-001-shared-domain-vocabulary.md`
- `./scripts/validate-plan.sh docs/plans/mvp4/phase-02-trend-intelligence/M4-005-bilingual-pro-trend-territorial-analytics.md`
- `./scripts/validate-resource-inventory.sh docs/plans/mvp1/phase-01-shared-base/M1-001-shared-domain-vocabulary.md`
