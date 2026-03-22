---
id: M2-008
title: Plus Dashboards And Trend Views
kind: leaf
runnable: true
status: complete
phase: phase-03-plus-dashboards
track: mvp2
module: apps/web
depends_on:
  - M2-004
  - M2-007
  - M1-010
unlocks:
  - M3-001
  - M3-006
owned_paths:
  - apps/web/src/modules/dashboards/
affected_paths:
  - apps/web/app/
  - apps/web/src/modules/dashboards/
  - apps/web/src/modules/account-plan/
read_first:
  - CLAUDE.md
  - apps/web/CLAUDE.md
  - docs/plans/mvp2/phase-03-plus-dashboards/M2-008-plus-dashboards-trend-views.md
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
  - performance-testing-review
install_plugins:
  - business-analytics
  - frontend-mobile-development
  - performance-testing-review
remove_plugins_after:
  - business-analytics
  - frontend-mobile-development
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
entry_prompt: develop #M2-008
stop_conditions:
  - Plus dashboards exist in English and Spanish
  - expanded history and trend views render from shared outputs
  - the UI stops before Pro-only multi-area or export features
handoff_updates:
  - docs/state/current.md
  - docs/plans/mvp2/phase-03-plus-dashboards/M2-008-plus-dashboards-trend-views.md
---

## Objective
- Build the first paid dashboard experience for Plus members.

## Scope
- bilingual Plus dashboard UI
- trend views and expanded history
- entitlement-aware dashboard gating

## Out Of Scope
- Pro multi-area analytics
- export workflows
- advanced forecasting

## Risks Or Impacts
- If Plus dashboards absorb Pro concerns, later milestones will have to split them apart.
- If entitlement and watch-area boundaries are bypassed, account logic will drift.

## Definition Of Done
- Plus dashboards and trend views exist in English and Spanish.
- They consume shared trend-series outputs and watch-area boundaries.
- Pro-specific features remain out of scope.

## Stop Conditions
- Stop once the Plus dashboard experience is stable.
- Do not continue into Pro analytics or exports.

## Expected Validations
- `./scripts/validate-plan.sh docs/plans/mvp2/phase-03-plus-dashboards/M2-008-plus-dashboards-trend-views.md`
- `./scripts/validate-resource-inventory.sh docs/plans/mvp2/phase-03-plus-dashboards/M2-008-plus-dashboards-trend-views.md`
- `./scripts/plan-context.sh M2-008`
- `pnpm --filter @querencia/web test`

## Handoff Updates
- Mark `M2-008` completed in this file.
- Update `docs/state/current.md` so M3 leaf readiness can advance.
