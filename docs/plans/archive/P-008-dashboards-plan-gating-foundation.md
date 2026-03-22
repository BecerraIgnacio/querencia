---
id: P-008
title: Dashboards And Plan-Gating Foundation
status: proposed
module: dashboards
dependencies:
  - P-004
  - P-005
  - P-006
affected_paths:
  - apps/web/src/modules/dashboards/
  - packages/authz/
  - docs/domains/dashboards.md
minimal_context:
  - CLAUDE.md
  - apps/web/CLAUDE.md
  - docs/domains/dashboards.md
  - docs/contracts/analytics-contracts.md
  - docs/decisions/ADR-004-plan-entitlements.md
plugin_marketplaces_needed:
  - wshobson/agents
fixed_transversal_plugins:
  - claude-mem
required_plugins:
  - javascript-typescript
optional_plugins:
  - business-analytics
  - performance-testing-review
install_plugins:
  - business-analytics
remove_plugins_after:
  - business-analytics
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
install_skills:
  - dashboard-entitlements
remove_skills_after: []
keep_skills_persistent:
  - dashboard-entitlements
consult_claude_mem: false
prefer_rtk_for_validation: true
execution_mode: manual
---

## Objective
- Establish the plan-gated dashboard foundation for Herd Plus and Sanitary Network.

## Scope
- dashboard module split
- plan-aware surface gating
- aggregated KPI and trend contracts for premium views
- separation between public disease view and premium analytics

## Out Of Scope
- billing
- SEO/growth surfaces
- document export workflows

## Risks Or Impacts
- If premium and public surfaces are entangled, later entitlement and UX work becomes expensive.
- Dashboard assumptions that bypass aggregated contracts will violate product policy.

## Definition Of Done
- Dashboard modules are bounded and plan-aware.
- Herd Plus and Sanitary Network surfaces can evolve independently without changing public disease pages.
- Entitlement logic is explicit and aligned with shared contracts.

## Expected Validations
- `./scripts/validate-plan.sh docs/plans/P-008-dashboards-plan-gating-foundation.md`
- `./scripts/validate-resource-inventory.sh docs/plans/P-008-dashboards-plan-gating-foundation.md`

