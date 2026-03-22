---
id: M3-002
title: Bilingual Multi-Area Monitoring Workspace UI
kind: leaf
runnable: true
status: completed
phase: phase-01-multi-area-monitoring
track: mvp3
module: apps/web
depends_on:
  - M3-001
unlocks: []
owned_paths:
  - apps/web/src/modules/dashboards/
affected_paths:
  - apps/web/app/
  - apps/web/src/modules/dashboards/
  - apps/web/src/modules/account-plan/
read_first:
  - CLAUDE.md
  - apps/web/CLAUDE.md
  - docs/plans/mvp3/phase-01-multi-area-monitoring/M3-002-bilingual-multi-area-workspace-ui.md
  - docs/domains/dashboards.md
minimal_context:
  - docs/domains/dashboards.md
  - docs/contracts/member-api.md
  - docs/domains/auth-and-plans.md
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
optional_skills:
  - dashboard-entitlements
install_skills:
  - dashboard-entitlements
remove_skills_after: []
keep_skills_persistent:
  - dashboard-entitlements
consult_claude_mem: false
prefer_rtk_for_validation: true
execution_mode: manual
entry_prompt: develop #M3-002
stop_conditions:
  - the multi-area workspace exists in English and Spanish
  - workspace navigation is stable for later Pro analytics
  - export and forecasting behavior remain out of scope
handoff_updates:
  - docs/state/current.md
  - docs/plans/mvp3/phase-01-multi-area-monitoring/M3-002-bilingual-multi-area-workspace-ui.md
---

## Objective
- Build the Pro monitoring workspace for accounts that manage multiple areas.

## Scope
- bilingual workspace UI
- cross-area navigation
- integration with the stored multi-area portfolio model

## Out Of Scope
- executive metric logic
- exports
- trend forecasting

## Risks Or Impacts
- If the workspace hardcodes analytics assumptions, later Pro dashboard work will need to unwind it.
- Language parity is required because this is a top-level Pro surface.

## Definition Of Done
- The multi-area workspace is stable in English and Spanish.
- It consumes the shared portfolio model.
- Analytics and export work can attach without redesigning navigation.

## Stop Conditions
- Stop once the workspace UI is stable.
- Do not continue into executive dashboards or exports.

## Expected Validations
- `./scripts/validate-plan.sh docs/plans/mvp3/phase-01-multi-area-monitoring/M3-002-bilingual-multi-area-workspace-ui.md`
- `./scripts/validate-resource-inventory.sh docs/plans/mvp3/phase-01-multi-area-monitoring/M3-002-bilingual-multi-area-workspace-ui.md`
- `./scripts/plan-context.sh M3-002`
- `pnpm --filter @querencia/web test`

## Handoff Updates
- Mark `M3-002` completed in this file.
- Update `docs/state/current.md` to reflect workspace UI progress.
