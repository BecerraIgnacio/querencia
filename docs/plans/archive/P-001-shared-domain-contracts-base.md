---
id: P-001
title: Shared Domain And Contracts Base
status: proposed
module: shared-base
dependencies:
  - P-000
affected_paths:
  - packages/contracts/
  - packages/core-domain/
  - docs/contracts/
minimal_context:
  - CLAUDE.md
  - docs/overview/architecture.md
  - docs/contracts/public-api.md
  - docs/contracts/member-api.md
  - docs/contracts/privacy-aggregation.md
  - docs/decisions/ADR-003-hex-privacy-model.md
  - docs/decisions/ADR-004-plan-entitlements.md
plugin_marketplaces_needed:
  - wshobson/agents
fixed_transversal_plugins:
  - claude-mem
required_plugins:
  - comprehensive-review
optional_plugins:
  - documentation-generation
install_plugins:
  - comprehensive-review
remove_plugins_after:
  - comprehensive-review
keep_plugins_persistent: []
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
---

## Objective
- Define the shared domain vocabulary and interface contracts that all Querencia modules consume.

## Scope
- `AnimalType`, `Disease`, `HexCell`, `UserReport`, `HexAggregation`, `SubscriptionPlan`, and related shared types
- public/member interface boundaries
- shared privacy and entitlement vocabulary alignment

## Out Of Scope
- UI implementation
- pipeline stage implementation
- Supabase schema and RLS details

## Risks Or Impacts
- Contract churn here blocks downstream module plans.
- Weak privacy or entitlement semantics will leak into every module.

## Definition Of Done
- Shared contract shapes and core vocabulary exist in `packages/contracts` and `packages/core-domain`.
- Docs and code-level contract naming are aligned.
- Downstream plans can depend on stable shared interfaces.

## Expected Validations
- `./scripts/validate-plan.sh docs/plans/P-001-shared-domain-contracts-base.md`
- `./scripts/validate-resource-inventory.sh docs/plans/P-001-shared-domain-contracts-base.md`

