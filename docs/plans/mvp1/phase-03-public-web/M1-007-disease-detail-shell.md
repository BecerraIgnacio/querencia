---
id: M1-007
title: Bilingual Disease Detail Shell
kind: leaf
runnable: true
status: blocked
phase: phase-03-public-web
track: mvp1
module: apps/web
depends_on:
  - M1-002
  - M1-006
unlocks:
  - M1-008
owned_paths:
  - apps/web/src/modules/disease-view/
affected_paths:
  - apps/web/app/
  - apps/web/src/modules/disease-view/
read_first:
  - CLAUDE.md
  - apps/web/CLAUDE.md
  - docs/plans/mvp1/phase-03-public-web/M1-007-disease-detail-shell.md
  - docs/domains/disease-view.md
minimal_context:
  - docs/domains/disease-view.md
  - docs/contracts/public-api.md
  - docs/contracts/privacy-aggregation.md
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
optional_agents:
  - module-map-hex-specialist
install_agents:
  - module-map-hex-specialist
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
install_skills:
  - map-hex-contracts
remove_skills_after: []
keep_skills_persistent:
  - map-hex-contracts
consult_claude_mem: false
prefer_rtk_for_validation: true
execution_mode: manual
entry_prompt: develop #M1-007
stop_conditions:
  - the disease detail shell exists with clear sections for localized info, map/timeline, and KPIs
  - public disease information is separated from paid analytics surfaces
  - the next plan can add map, timeline, and KPI behavior without route restructuring
handoff_updates:
  - docs/state/current.md
  - docs/plans/mvp1/phase-03-public-web/M1-007-disease-detail-shell.md
---

## Objective
- Build the bilingual disease page structure before adding the public intelligence widgets.

## Scope
- disease page shell
- disease information panel structure for English and Spanish content fields
- composition boundaries for map, timeline, and KPI surfaces

## Out Of Scope
- aggregated map behavior
- timeline data rendering
- KPI computation
- premium dashboards

## Risks Or Impacts
- If premium and public surfaces are not separated here, later dashboard work will bleed into public flows.
- If the disease page shell is weak, the map and KPI plan will have to restructure routes and layout.

## Definition Of Done
- The disease detail module exists with clear public surface boundaries.
- Disease information is composable in both supported languages without embedding data-heavy rendering logic.
- `M1-008` can focus on intelligence widgets instead of route/layout surgery.

## Stop Conditions
- Stop once disease-page composition is stable and the public shell is ready for map/timeline/KPI behavior.
- Do not implement aggregated data rendering inside this plan.

## Expected Validations
- `./scripts/validate-plan.sh docs/plans/mvp1/phase-03-public-web/M1-007-disease-detail-shell.md`
- `./scripts/validate-resource-inventory.sh docs/plans/mvp1/phase-03-public-web/M1-007-disease-detail-shell.md`
- `./scripts/plan-context.sh M1-007`
- `pnpm --filter @querencia/web test`

## Handoff Updates
- Mark `M1-007` completed in this file.
- Update `docs/state/current.md` so `M1-008` can become ready once aggregation outputs are complete.
