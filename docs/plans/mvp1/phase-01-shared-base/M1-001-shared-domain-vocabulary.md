---
id: M1-001
title: Shared Domain Vocabulary And Locale Primitives
kind: leaf
runnable: true
status: ready
phase: phase-01-shared-base
track: mvp1
module: shared-base
depends_on:
  - P-000
unlocks:
  - M1-002
  - M1-003
  - M1-005
  - M1-009
owned_paths:
  - packages/core-domain/
affected_paths:
  - packages/core-domain/
read_first:
  - CLAUDE.md
  - docs/plans/mvp1/phase-01-shared-base/M1-001-shared-domain-vocabulary.md
  - docs/overview/architecture.md
  - docs/contracts/privacy-aggregation.md
minimal_context:
  - docs/overview/architecture.md
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
entry_prompt: develop #M1-001
stop_conditions:
  - core domain entities, plan names, and locale primitives exist in packages/core-domain
  - naming matches the product vocabulary used by later plans
  - no API wire contracts are introduced outside shared domain semantics
handoff_updates:
  - docs/state/current.md
  - docs/plans/mvp1/phase-01-shared-base/M1-001-shared-domain-vocabulary.md
---

## Objective
- Define the stable business vocabulary, entitlement names, and locale primitives that the rest of MVP1 will reuse without renegotiating names or meanings.

## Scope
- core domain entities
- shared naming conventions for surveillance, aggregation, reports, alerts, plans, locales, and watch areas
- invariants that belong in the shared base rather than inside one module

## Out Of Scope
- public/member API wire shapes
- Supabase schema
- UI flows

## Risks Or Impacts
- If names drift here, every downstream plan will create translation churn.
- If privacy, locale, or entitlement semantics are omitted here, later contracts will encode the wrong assumptions.

## Definition Of Done
- `packages/core-domain` contains the stable domain vocabulary, `Free`/`Plus`/`Pro` naming, and locale primitives.
- The chosen names align with product docs and later plan expectations.
- Downstream plans can reference this vocabulary without redefining entities.

## Stop Conditions
- Stop once shared domain semantics are stable and reviewed.
- Do not continue into public/member contract design inside this plan.

## Expected Validations
- `./scripts/validate-plan.sh docs/plans/mvp1/phase-01-shared-base/M1-001-shared-domain-vocabulary.md`
- `./scripts/validate-resource-inventory.sh docs/plans/mvp1/phase-01-shared-base/M1-001-shared-domain-vocabulary.md`
- `./scripts/plan-context.sh M1-001`
- `pnpm --filter @querencia/core-domain test`

## Handoff Updates
- Mark `M1-001` completed in this file.
- Update `docs/state/current.md` so `M1-002`, `M1-003`, `M1-005`, and `M1-009` can become ready.
