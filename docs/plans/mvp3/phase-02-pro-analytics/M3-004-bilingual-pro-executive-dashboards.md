---
id: M3-004
title: Bilingual Pro Executive Dashboards
kind: leaf
runnable: true
status: completed
phase: phase-02-pro-analytics
track: mvp3
module: apps/web
depends_on:
  - M3-001
  - M3-003
unlocks:
  - M3-005
  - M4-005
owned_paths:
  - apps/web/src/modules/dashboards/
affected_paths:
  - apps/web/app/
  - apps/web/src/modules/dashboards/
read_first:
  - CLAUDE.md
  - apps/web/CLAUDE.md
  - docs/plans/mvp3/phase-02-pro-analytics/M3-004-bilingual-pro-executive-dashboards.md
  - docs/domains/dashboards.md
minimal_context:
  - docs/domains/dashboards.md
  - docs/contracts/analytics-contracts.md
  - docs/contracts/member-api.md
plugin_marketplaces_needed:
  - wshobson/agents
fixed_transversal_plugins:
  - claude-mem
required_plugins:
  - javascript-typescript
  - business-analytics
optional_plugins:
  - frontend-mobile-development
  - ui-design
  - performance-testing-review
install_plugins:
  - business-analytics
  - frontend-mobile-development
  - ui-design
  - performance-testing-review
remove_plugins_after:
  - business-analytics
  - frontend-mobile-development
  - ui-design
  - performance-testing-review
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
entry_prompt: develop #M3-004
stop_conditions:
  - Pro dashboards exist in English and Spanish
  - multi-area analytics render from shared executive metrics
  - exports and trend-forecast features remain separate
handoff_updates:
  - docs/state/current.md
  - docs/plans/mvp3/phase-02-pro-analytics/M3-004-bilingual-pro-executive-dashboards.md
---

## Objective
- Build the executive dashboard experience for Pro members.

## Scope
- bilingual Pro dashboard UI
- cross-area executive views
- contract-aligned prioritization and metric rendering

## Out Of Scope
- exports
- forecasting
- M4 anomaly tooling

## Risks Or Impacts
- If Pro dashboards mix in export or forecast logic, later milestones will sprawl.
- If they bypass the shared portfolio model, the workspace and dashboard layers will diverge.

## Definition Of Done
- Pro executive dashboards are stable in English and Spanish.
- They consume shared Pro metric outputs and monitoring scope.
- Export and M4 trend work can remain separate.

## Stop Conditions
- Stop once Pro dashboards are stable and entitlement-aware.
- Do not continue into exports or forecasting.

## Expected Validations
- `./scripts/validate-plan.sh docs/plans/mvp3/phase-02-pro-analytics/M3-004-bilingual-pro-executive-dashboards.md`
- `./scripts/validate-resource-inventory.sh docs/plans/mvp3/phase-02-pro-analytics/M3-004-bilingual-pro-executive-dashboards.md`
- `./scripts/plan-context.sh M3-004`
- `pnpm --filter @querencia/web test`

## Handoff Updates
- Mark `M3-004` completed in this file.
- Update `docs/state/current.md` so `M3-005` and `M4-005` can become ready when their other dependencies are met.
