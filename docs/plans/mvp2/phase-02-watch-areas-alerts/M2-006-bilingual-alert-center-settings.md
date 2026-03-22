---
id: M2-006
title: Bilingual Alert Center And Settings
kind: leaf
runnable: true
status: complete
phase: phase-02-watch-areas-alerts
track: mvp2
module: apps/web
depends_on:
  - M2-005
  - M1-010
unlocks: []
owned_paths:
  - apps/web/src/modules/alerts/
affected_paths:
  - apps/web/app/
  - apps/web/src/modules/alerts/
  - apps/web/src/modules/account-plan/
read_first:
  - CLAUDE.md
  - apps/web/CLAUDE.md
  - docs/plans/mvp2/phase-02-watch-areas-alerts/M2-006-bilingual-alert-center-settings.md
  - docs/domains/reporting-alerts.md
minimal_context:
  - docs/domains/reporting-alerts.md
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
  - unit-testing
install_plugins:
  - frontend-mobile-development
  - unit-testing
remove_plugins_after:
  - frontend-mobile-development
  - unit-testing
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
entry_prompt: develop #M2-006
stop_conditions:
  - alert center and settings exist in English and Spanish
  - alert settings reuse the stored alert and watch-area boundaries
  - the UI stops before trend dashboards or Pro analytics
handoff_updates:
  - docs/state/current.md
  - docs/plans/mvp2/phase-02-watch-areas-alerts/M2-006-bilingual-alert-center-settings.md
---

## Objective
- Build the bilingual alert center and user settings experience for Plus members.

## Scope
- bilingual alert center UI
- alert settings UI
- integration with stored alert and watch-area boundaries

## Out Of Scope
- Plus dashboards
- Pro analytics
- export flows

## Risks Or Impacts
- If alert settings bypass account or watch-area boundaries, later Pro monitoring work will duplicate logic.
- If alert copy is not authored in both languages, the paid UX becomes inconsistent.

## Definition Of Done
- Alert center and settings are complete in English and Spanish.
- UI consumes stored alert and watch-area boundaries.
- Later dashboard work can remain separate from alert UX.

## Stop Conditions
- Stop once the alert UX is stable and bilingual.
- Do not continue into dashboard composition.

## Expected Validations
- `./scripts/validate-plan.sh docs/plans/mvp2/phase-02-watch-areas-alerts/M2-006-bilingual-alert-center-settings.md`
- `./scripts/validate-resource-inventory.sh docs/plans/mvp2/phase-02-watch-areas-alerts/M2-006-bilingual-alert-center-settings.md`
- `./scripts/plan-context.sh M2-006`
- `pnpm --filter @querencia/web test`

## Handoff Updates
- Mark `M2-006` completed in this file.
- Update `docs/state/current.md` to reflect alert UX progress.
