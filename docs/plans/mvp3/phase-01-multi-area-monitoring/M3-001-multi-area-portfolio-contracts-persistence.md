---
id: M3-001
title: Multi-Area Portfolio Contracts And Persistence
kind: leaf
runnable: true
status: completed
phase: phase-01-multi-area-monitoring
track: mvp3
module: monitoring-platform
depends_on:
  - M2-004
  - M2-008
unlocks:
  - M3-002
  - M3-004
owned_paths:
  - supabase/
affected_paths:
  - supabase/
  - packages/contracts/
  - packages/authz/
read_first:
  - CLAUDE.md
  - docs/plans/mvp3/phase-01-multi-area-monitoring/M3-001-multi-area-portfolio-contracts-persistence.md
  - docs/domains/auth-and-plans.md
  - docs/domains/reporting-alerts.md
minimal_context:
  - docs/domains/auth-and-plans.md
  - docs/contracts/member-api.md
  - docs/decisions/ADR-004-plan-entitlements.md
plugin_marketplaces_needed:
  - wshobson/agents
fixed_transversal_plugins:
  - claude-mem
required_plugins:
  - backend-development
  - comprehensive-review
optional_plugins:
  - database-design
  - backend-api-security
  - security-scanning
install_plugins:
  - backend-development
  - comprehensive-review
  - database-design
  - backend-api-security
remove_plugins_after:
  - comprehensive-review
  - database-design
  - backend-api-security
keep_plugins_persistent: []
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
  - supabase-rls-patterns
install_skills: []
remove_skills_after: []
keep_skills_persistent:
  - supabase-rls-patterns
consult_claude_mem: false
prefer_rtk_for_validation: true
execution_mode: manual
entry_prompt: develop #M3-001
stop_conditions:
  - grouped monitoring portfolios are stable in contracts and persistence
  - later Pro workspace and dashboard plans can consume the same model
  - no export or forecasting behavior is embedded here
handoff_updates:
  - docs/state/current.md
  - docs/plans/mvp3/phase-01-multi-area-monitoring/M3-001-multi-area-portfolio-contracts-persistence.md
---

## Objective
- Define how Pro accounts store and organize multiple watch areas before building the monitoring workspace.

## Scope
- multi-area portfolio contracts
- persistence model
- entitlement-aware monitoring scope

## Out Of Scope
- workspace UI
- executive dashboards
- export flows

## Risks Or Impacts
- If the higher-tier monitoring model is unstable here, the rest of Pro will split around different assumptions.
- This plan touches protected backend and contract areas, so review is mandatory.

## Definition Of Done
- Multi-area monitoring portfolios exist in contracts and persistence.
- The model is reusable by dashboards and exports.
- Pro workspace UI can build without redefining monitoring scope.

## Stop Conditions
- Stop once the portfolio model is stable and reviewed.
- Do not continue into workspace UI or analytics rendering.

## Expected Validations
- `./scripts/validate-plan.sh docs/plans/mvp3/phase-01-multi-area-monitoring/M3-001-multi-area-portfolio-contracts-persistence.md`
- `./scripts/validate-resource-inventory.sh docs/plans/mvp3/phase-01-multi-area-monitoring/M3-001-multi-area-portfolio-contracts-persistence.md`
- `./scripts/plan-context.sh M3-001`
- `pnpm --filter @querencia/contracts test`

## Handoff Updates
- Mark `M3-001` completed in this file.
- Update `docs/state/current.md` so `M3-002` and `M3-004` can become ready when their other dependencies are met.
