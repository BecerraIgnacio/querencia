---
id: P-004
title: Auth, Profile, And Plan Foundation
status: proposed
module: auth-platform
dependencies:
  - P-000
  - P-001
affected_paths:
  - supabase/
  - apps/web/src/modules/account-plan/
  - packages/authz/
minimal_context:
  - CLAUDE.md
  - apps/web/CLAUDE.md
  - docs/domains/auth-and-plans.md
  - docs/contracts/member-api.md
  - docs/decisions/ADR-004-plan-entitlements.md
plugin_marketplaces_needed:
  - wshobson/agents
fixed_transversal_plugins:
  - claude-mem
required_plugins:
  - backend-development
optional_plugins:
  - database-design
  - backend-api-security
install_plugins:
  - database-design
  - backend-api-security
remove_plugins_after:
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
install_agents:
  - module-supabase-auth
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
install_skills:
  - supabase-rls-patterns
remove_skills_after: []
keep_skills_persistent:
  - supabase-rls-patterns
consult_claude_mem: false
prefer_rtk_for_validation: true
execution_mode: manual
---

## Objective
- Establish Google auth, profile state, and plan entitlement foundations for member-only capabilities.

## Scope
- auth shell
- profile retrieval and update contract
- plan state and entitlement vocabulary
- account/plan module boundaries

## Out Of Scope
- alerts logic
- dashboard metric implementation
- report ingestion analytics

## Risks Or Impacts
- Entitlement mistakes will leak into dashboards and alerts.
- Auth and RLS drift will create later security rework.

## Definition Of Done
- Auth/profile boundaries are clear in `supabase/`, `packages/authz`, and `account-plan`.
- Shared entitlement semantics align with ADRs and contracts.
- Downstream member features can rely on a stable member foundation.

## Expected Validations
- `./scripts/validate-plan.sh docs/plans/P-004-auth-profile-plan-foundation.md`
- `./scripts/validate-resource-inventory.sh docs/plans/P-004-auth-profile-plan-foundation.md`

