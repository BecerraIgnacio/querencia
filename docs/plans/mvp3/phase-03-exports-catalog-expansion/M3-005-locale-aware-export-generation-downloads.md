---
id: M3-005
title: Locale-Aware Export Generation And Download Flows
kind: leaf
runnable: true
status: completed
phase: phase-03-exports-catalog-expansion
track: mvp3
module: apps/web
depends_on:
  - M3-003
  - M3-004
unlocks: []
owned_paths:
  - apps/web/src/modules/dashboards/
affected_paths:
  - apps/web/src/modules/dashboards/
  - supabase/
  - packages/contracts/
read_first:
  - CLAUDE.md
  - apps/web/CLAUDE.md
  - docs/plans/mvp3/phase-03-exports-catalog-expansion/M3-005-locale-aware-export-generation-downloads.md
  - docs/domains/dashboards.md
minimal_context:
  - docs/domains/dashboards.md
  - docs/contracts/analytics-contracts.md
  - docs/contracts/member-api.md
plugin_marketplaces_needed:
  - wshobson/agents
  - anthropics/skills
fixed_transversal_plugins:
  - claude-mem
required_plugins:
  - javascript-typescript
  - backend-development
optional_plugins:
  - business-analytics
  - document-skills
install_plugins:
  - backend-development
  - business-analytics
  - document-skills
remove_plugins_after:
  - backend-development
  - business-analytics
  - document-skills
keep_plugins_persistent:
  - javascript-typescript
external_tools_required:
  - rtk
fixed_transversal_agents:
  - transversal-reviewer
  - transversal-contract-guardian
required_agents: []
optional_agents:
  - module-supabase-auth
install_agents: []
remove_agents_after: []
keep_agents_persistent:
  - module-supabase-auth
fixed_transversal_skills:
  - repo-routing
required_skills:
  - plan-execution
  - validation-checklist
optional_skills:
  - dashboard-entitlements
install_skills: []
remove_skills_after: []
keep_skills_persistent:
  - dashboard-entitlements
consult_claude_mem: false
prefer_rtk_for_validation: true
execution_mode: manual
entry_prompt: develop #M3-005
stop_conditions:
  - CSV or basic export flows exist for Pro analytics
  - export labels and download UX are available in English and Spanish
  - this plan stops short of advanced document automation
handoff_updates:
  - docs/state/current.md
  - docs/plans/mvp3/phase-03-exports-catalog-expansion/M3-005-locale-aware-export-generation-downloads.md
---

## Objective
- Add practical export generation and download flows for Pro analytics.

## Scope
- CSV or basic export generation
- locale-aware labels and download flows
- contract alignment between dashboards and export endpoints

## Out Of Scope
- billing
- advanced document suites
- forecasting

## Risks Or Impacts
- Exports can easily sprawl into a separate document platform if not bounded.
- If export labels are hardcoded in one language, the Pro experience breaks parity.

## Definition Of Done
- Pro exports can be generated and downloaded in a practical hackathon-safe form.
- Labels and download UX are available in English and Spanish.
- Export logic stays bounded and does not become a document platform.

## Stop Conditions
- Stop once basic export flows are stable.
- Do not continue into advanced templates or offline report systems.

## Expected Validations
- `./scripts/validate-plan.sh docs/plans/mvp3/phase-03-exports-catalog-expansion/M3-005-locale-aware-export-generation-downloads.md`
- `./scripts/validate-resource-inventory.sh docs/plans/mvp3/phase-03-exports-catalog-expansion/M3-005-locale-aware-export-generation-downloads.md`
- `./scripts/plan-context.sh M3-005`
- `pnpm --filter @querencia/web test`

## Handoff Updates
- Mark `M3-005` completed in this file.
- Update `docs/state/current.md` to reflect export readiness.
