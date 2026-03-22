---
id: M1-008
title: Bilingual Public Map, Timeline, And KPI Surfaces
kind: leaf
runnable: true
status: complete
phase: phase-03-public-web
track: mvp1
module: apps/web
depends_on:
  - M1-004
  - M1-007
unlocks:
  - M2-003
  - M2-007
owned_paths:
  - apps/web/src/modules/disease-view/
affected_paths:
  - apps/web/src/modules/disease-view/
  - packages/map-hex/
read_first:
  - CLAUDE.md
  - apps/web/CLAUDE.md
  - docs/plans/mvp1/phase-03-public-web/M1-008-public-map-timeline-kpis.md
  - docs/contracts/privacy-aggregation.md
minimal_context:
  - docs/domains/disease-view.md
  - docs/contracts/public-api.md
  - docs/contracts/privacy-aggregation.md
  - docs/contracts/analytics-contracts.md
  - docs/decisions/ADR-003-hex-privacy-model.md
plugin_marketplaces_needed:
  - wshobson/agents
fixed_transversal_plugins:
  - claude-mem
required_plugins:
  - javascript-typescript
optional_plugins:
  - frontend-mobile-development
  - performance-testing-review
install_plugins:
  - frontend-mobile-development
remove_plugins_after:
  - frontend-mobile-development
keep_plugins_persistent:
  - javascript-typescript
external_tools_required:
  - rtk
fixed_transversal_agents:
  - transversal-reviewer
  - transversal-contract-guardian
required_agents: []
optional_agents:
  - module-map-hex-specialist
install_agents: []
remove_agents_after: []
keep_agents_persistent:
  - module-map-hex-specialist
fixed_transversal_skills:
  - repo-routing
required_skills:
  - plan-execution
  - validation-checklist
optional_skills:
  - map-hex-contracts
install_skills: []
remove_skills_after: []
keep_skills_persistent:
  - map-hex-contracts
consult_claude_mem: false
prefer_rtk_for_validation: true
execution_mode: manual
entry_prompt: develop #M1-008
stop_conditions:
  - the disease page renders aggregated map, timeline, and KPI surfaces using shared contracts
  - no exact private coordinates or identity data are exposed publicly
  - Free disease intelligence is usable in English and Spanish without paid analytics
handoff_updates:
  - docs/state/current.md
  - docs/plans/mvp1/phase-03-public-web/M1-008-public-map-timeline-kpis.md
---

## Objective
- Implement the bilingual public intelligence surfaces that make `Free` useful on the disease page.

## Scope
- public aggregated map rendering
- timeline rendering
- public KPI rendering
- contract wiring between disease-view and aggregation outputs

## Out Of Scope
- premium dashboards
- alerts
- watch areas

## Risks Or Impacts
- This plan is the public privacy boundary. Any raw-coordinate leakage breaks the product model.
- If map primitives drift from aggregation contracts, the data and web stacks will fork.

## Definition Of Done
- Public map, timeline, and KPI surfaces are rendered from aggregated contract outputs only.
- `Free` users can inspect disease activity in English and Spanish without paid features.
- The disease page remains separated from later paid-tier analytics.

## Stop Conditions
- Stop once the public intelligence surfaces are complete and privacy-safe.
- Do not add `Plus` or `Pro` dashboard behavior here.

## Expected Validations
- `./scripts/validate-plan.sh docs/plans/mvp1/phase-03-public-web/M1-008-public-map-timeline-kpis.md`
- `./scripts/validate-resource-inventory.sh docs/plans/mvp1/phase-03-public-web/M1-008-public-map-timeline-kpis.md`
- `./scripts/plan-context.sh M1-008`
- `pnpm --filter @querencia/web test`

## Handoff Updates
- Mark `M1-008` completed in this file.
- Update `docs/state/current.md` so later milestone plans can see `Free` disease intelligence as complete.
