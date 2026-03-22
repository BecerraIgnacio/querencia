---
id: M1-006
title: Bilingual Disease Catalog By Animal
kind: leaf
runnable: true
status: blocked
phase: phase-03-public-web
track: mvp1
module: apps/web
depends_on:
  - M1-002
  - M1-005
unlocks:
  - M1-007
owned_paths:
  - apps/web/src/modules/disease-catalog/
affected_paths:
  - apps/web/app/
  - apps/web/src/modules/disease-catalog/
read_first:
  - CLAUDE.md
  - apps/web/CLAUDE.md
  - docs/plans/mvp1/phase-03-public-web/M1-006-disease-catalog-by-animal.md
  - docs/domains/public-exploration.md
minimal_context:
  - docs/domains/public-exploration.md
  - docs/contracts/public-api.md
plugin_marketplaces_needed:
  - wshobson/agents
fixed_transversal_plugins:
  - claude-mem
required_plugins:
  - javascript-typescript
optional_plugins:
  - frontend-mobile-development
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
entry_prompt: develop #M1-006
stop_conditions:
  - disease lists are filtered by selected animal type
  - disease names and public labels resolve in English and Spanish from shared contracts
  - disease-catalog module is isolated from disease-detail rendering
  - routing into a disease-detail shell is stable
handoff_updates:
  - docs/state/current.md
  - docs/plans/mvp1/phase-03-public-web/M1-006-disease-catalog-by-animal.md
---

## Objective
- Build the bilingual public disease catalog flow for a selected animal type.

## Scope
- disease list retrieval and rendering by animal
- English and Spanish catalog labels from shared contracts
- route handoff from animal selection into disease detail
- module boundaries between catalog and detail

## Out Of Scope
- disease detail page content
- map, timeline, and KPI rendering
- member-only features

## Risks Or Impacts
- If catalog filters are not contract-driven, the shared API layer will be bypassed.
- If catalog and detail logic are mixed, later plans will rework the web tree.

## Definition Of Done
- Public disease catalog exists and is driven by animal selection.
- Public disease catalog parity exists in English and Spanish.
- Catalog and detail modules are clearly separated.
- The disease-detail shell can be implemented without restructuring the catalog.

## Stop Conditions
- Stop once the disease catalog flow is stable and hands off cleanly to disease detail.
- Do not continue into map, KPI, or disease info composition.

## Expected Validations
- `./scripts/validate-plan.sh docs/plans/mvp1/phase-03-public-web/M1-006-disease-catalog-by-animal.md`
- `./scripts/validate-resource-inventory.sh docs/plans/mvp1/phase-03-public-web/M1-006-disease-catalog-by-animal.md`
- `./scripts/plan-context.sh M1-006`
- `pnpm --filter @querencia/web test`

## Handoff Updates
- Mark `M1-006` completed in this file.
- Update `docs/state/current.md` so `M1-007` can become ready.
