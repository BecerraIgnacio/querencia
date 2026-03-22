---
id: M4-005
title: Bilingual Pro Trend And Territorial Analytics Surfaces
kind: leaf
runnable: true
status: blocked
phase: phase-02-trend-intelligence
track: mvp4
module: apps/web
depends_on:
  - M4-003
  - M4-004
  - M3-004
unlocks: []
owned_paths:
  - apps/web/src/modules/dashboards/
affected_paths:
  - apps/web/app/
  - apps/web/src/modules/dashboards/
read_first:
  - CLAUDE.md
  - apps/web/CLAUDE.md
  - docs/plans/mvp4/phase-02-trend-intelligence/M4-005-bilingual-pro-trend-territorial-analytics.md
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
entry_prompt: develop #M4-005
stop_conditions:
  - Pro trend and territorial analytics render in English and Spanish
  - the UI consumes shared heuristic and territorial outputs
  - the plan stops short of introducing new backend analytics logic
handoff_updates:
  - docs/state/current.md
  - docs/plans/mvp4/phase-02-trend-intelligence/M4-005-bilingual-pro-trend-territorial-analytics.md
---

## Objective
- Render the final Pro trend and territorial intelligence experience on top of the completed M4 analytics work.

## Scope
- bilingual Pro trend UI
- bilingual territorial analytics UI
- contract-aligned rendering of heuristic and territorial outputs

## Out Of Scope
- new backend scoring logic
- export rework
- ML platform work

## Risks Or Impacts
- If the UI invents its own interpretation of trend scores, the analytics layer will drift.
- If language parity is incomplete here, the final Pro experience will not be native in both languages.

## Definition Of Done
- Pro trend and territorial analytics surfaces exist in English and Spanish.
- They consume shared heuristic and territorial outputs without redefining them.
- Backend analytics logic remains outside this UI plan.

## Stop Conditions
- Stop once the final Pro analytics surfaces are stable.
- Do not continue into new backend logic or platform work.

## Expected Validations
- `./scripts/validate-plan.sh docs/plans/mvp4/phase-02-trend-intelligence/M4-005-bilingual-pro-trend-territorial-analytics.md`
- `./scripts/validate-resource-inventory.sh docs/plans/mvp4/phase-02-trend-intelligence/M4-005-bilingual-pro-trend-territorial-analytics.md`
- `./scripts/plan-context.sh M4-005`
- `pnpm --filter @querencia/web test`

## Handoff Updates
- Mark `M4-005` completed in this file.
- Update `docs/state/current.md` to reflect final roadmap progress.
