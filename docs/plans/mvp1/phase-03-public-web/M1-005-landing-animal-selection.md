---
id: M1-005
title: Locale Routing, Landing, And Animal Selection
kind: leaf
runnable: true
status: blocked
phase: phase-03-public-web
track: mvp1
module: apps/web
depends_on:
  - M1-001
unlocks:
  - M1-006
owned_paths:
  - apps/web/src/modules/animal-selection/
affected_paths:
  - apps/web/app/
  - apps/web/src/modules/animal-selection/
read_first:
  - CLAUDE.md
  - apps/web/CLAUDE.md
  - docs/plans/mvp1/phase-03-public-web/M1-005-landing-animal-selection.md
  - docs/domains/public-exploration.md
minimal_context:
  - docs/domains/public-exploration.md
  - docs/contracts/public-api.md
  - docs/overview/architecture.md
  - docs/decisions/ADR-001-monorepo-and-boundaries.md
plugin_marketplaces_needed:
  - wshobson/agents
fixed_transversal_plugins:
  - claude-mem
required_plugins:
  - javascript-typescript
optional_plugins:
  - frontend-mobile-development
  - ui-design
install_plugins:
  - frontend-mobile-development
  - ui-design
remove_plugins_after:
  - frontend-mobile-development
  - ui-design
keep_plugins_persistent:
  - javascript-typescript
external_tools_required:
  - rtk
fixed_transversal_agents:
  - transversal-reviewer
  - transversal-contract-guardian
required_agents: []
optional_agents: []
install_agents: []
remove_agents_after: []
keep_agents_persistent: []
fixed_transversal_skills:
  - repo-routing
required_skills:
  - plan-execution
  - validation-checklist
optional_skills: []
install_skills: []
remove_skills_after: []
keep_skills_persistent: []
consult_claude_mem: false
prefer_rtk_for_validation: true
execution_mode: manual
entry_prompt: develop #M1-005
stop_conditions:
  - locale-prefixed public entry routes exist from landing to animal selection
  - animal-selection is modularized without disease-catalog behavior embedded inside it
  - route structure, locale detection, and language switching are stable enough for disease catalog work to attach cleanly
handoff_updates:
  - docs/state/current.md
  - docs/plans/mvp1/phase-03-public-web/M1-005-landing-animal-selection.md
---

## Objective
- Build the bilingual public entry shell that gets users from locale-aware landing routes into animal-type selection.

## Scope
- landing shell
- `/en` and `/es` route structure
- browser or geo locale detection with Spanish fallback
- language switcher boundary
- animal selection UI and route boundary
- transition from public entry to disease catalog

## Out Of Scope
- disease catalog contents
- disease detail page
- auth and account work

## Risks Or Impacts
- If the entry shell mixes later catalog logic into one module, public web phases will tangle quickly.
- If routing is unstable, later plans will spend time moving files instead of building features.

## Definition Of Done
- Landing and animal-selection flow exists behind a stable locale-aware module boundary.
- Disease catalog work has a clear place to attach next.
- `Free`, `Plus`, and `Pro` logic is not embedded in the public entry shell.

## Stop Conditions
- Stop once routing and module boundaries are stable for the next leaf plan.
- Do not continue into disease listing or disease-detail composition.

## Expected Validations
- `./scripts/validate-plan.sh docs/plans/mvp1/phase-03-public-web/M1-005-landing-animal-selection.md`
- `./scripts/validate-resource-inventory.sh docs/plans/mvp1/phase-03-public-web/M1-005-landing-animal-selection.md`
- `./scripts/plan-context.sh M1-005`
- `pnpm --filter @querencia/web test`

## Handoff Updates
- Mark `M1-005` completed in this file.
- Update `docs/state/current.md` so `M1-006` can become ready once contract dependencies are also complete.
