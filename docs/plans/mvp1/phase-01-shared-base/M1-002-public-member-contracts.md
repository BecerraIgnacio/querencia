---
id: M1-002
title: Public, Member, And Localized Content Contracts
kind: leaf
runnable: true
status: blocked
phase: phase-01-shared-base
track: mvp1
module: shared-base
depends_on:
  - M1-001
unlocks:
  - M1-004
  - M1-006
  - M1-007
  - M1-010
owned_paths:
  - packages/contracts/
affected_paths:
  - packages/contracts/
  - docs/contracts/
read_first:
  - CLAUDE.md
  - docs/plans/mvp1/phase-01-shared-base/M1-002-public-member-contracts.md
  - docs/contracts/public-api.md
  - docs/contracts/member-api.md
minimal_context:
  - docs/contracts/public-api.md
  - docs/contracts/member-api.md
  - docs/contracts/privacy-aggregation.md
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
entry_prompt: develop #M1-002
stop_conditions:
  - public, member, and localized content contract shapes exist in packages/contracts
  - privacy, locale, and entitlement semantics are encoded consistently
  - downstream plans can consume contracts without redefining wire shapes
handoff_updates:
  - docs/state/current.md
  - docs/plans/mvp1/phase-01-shared-base/M1-002-public-member-contracts.md
---

## Objective
- Define the public read, member write, and localized content contracts that web, pipeline, and auth work will share.

## Scope
- public animal, disease, map, KPI, and disease-detail contract shapes
- member profile, report, watch-area, alert, and entitlement-facing contract shapes
- locale primitives, localized disease content, and preferred-locale semantics in shared contracts
- privacy and plan-gating semantics in shared contracts

## Out Of Scope
- concrete endpoint implementation
- Supabase policies
- UI rendering

## Risks Or Impacts
- Contract mistakes here will block almost every downstream plan.
- Mixing public and member semantics weakens privacy and entitlement boundaries.

## Definition Of Done
- `packages/contracts` contains stable public, member, and localized content contract definitions.
- Contract names align with `M1-001` vocabulary and product docs.
- Downstream web, pipeline, and auth plans can use a shared interface layer.

## Stop Conditions
- Stop once the public/member interface layer is stable and reviewed.
- Do not continue into service implementation, persistence, or UI behavior.

## Expected Validations
- `./scripts/validate-plan.sh docs/plans/mvp1/phase-01-shared-base/M1-002-public-member-contracts.md`
- `./scripts/validate-resource-inventory.sh docs/plans/mvp1/phase-01-shared-base/M1-002-public-member-contracts.md`
- `./scripts/plan-context.sh M1-002`
- `pnpm --filter @querencia/contracts test`

## Handoff Updates
- Mark `M1-002` completed in this file.
- Update `docs/state/current.md` so dependent plans can move from blocked to ready.
