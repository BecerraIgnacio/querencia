---
id: M2-002
title: Bilingual Report Submission UI
kind: leaf
runnable: true
status: complete
phase: phase-01-reporting
track: mvp2
module: apps/web
depends_on:
  - M2-001
unlocks: []
owned_paths:
  - apps/web/src/modules/reporting/
affected_paths:
  - apps/web/app/
  - apps/web/src/modules/reporting/
read_first:
  - CLAUDE.md
  - apps/web/CLAUDE.md
  - docs/plans/mvp2/phase-01-reporting/M2-002-bilingual-report-submission-ui.md
  - docs/domains/reporting-alerts.md
minimal_context:
  - docs/domains/reporting-alerts.md
  - docs/contracts/member-api.md
  - docs/overview/architecture.md
plugin_marketplaces_needed:
  - wshobson/agents
fixed_transversal_plugins:
  - claude-mem
required_plugins:
  - javascript-typescript
optional_plugins:
  - frontend-mobile-development
  - ui-design
  - unit-testing
install_plugins:
  - frontend-mobile-development
  - ui-design
  - unit-testing
remove_plugins_after:
  - frontend-mobile-development
  - ui-design
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
entry_prompt: develop #M2-002
stop_conditions:
  - report submission flow exists in English and Spanish
  - source and visibility choices map to the shared report boundary
  - the UI stops before alert or dashboard behavior
handoff_updates:
  - docs/state/current.md
  - docs/plans/mvp2/phase-01-reporting/M2-002-bilingual-report-submission-ui.md
---

## Objective
- Build the member-facing report submission flow on top of the stable report boundary.

## Scope
- bilingual report form UX
- contract-driven source and visibility inputs
- modular reporting UI boundary

## Out Of Scope
- alert generation
- trend dashboards
- pipeline blending

## Risks Or Impacts
- If the form invents its own fields instead of using the shared boundary, later alert and analytics work will drift.
- If language parity is incomplete here, reporting becomes a one-language feature.

## Definition Of Done
- Report submission works in English and Spanish.
- Form fields align with the shared report boundary.
- Reporting UI is isolated from alerts and dashboards.

## Stop Conditions
- Stop once the bilingual report flow is stable and modular.
- Do not continue into alert preferences or analytics views.

## Expected Validations
- `./scripts/validate-plan.sh docs/plans/mvp2/phase-01-reporting/M2-002-bilingual-report-submission-ui.md`
- `./scripts/validate-resource-inventory.sh docs/plans/mvp2/phase-01-reporting/M2-002-bilingual-report-submission-ui.md`
- `./scripts/plan-context.sh M2-002`
- `pnpm --filter @querencia/web test`

## Handoff Updates
- Mark `M2-002` completed in this file.
- Update `docs/state/current.md` to reflect report-submission UI progress.
