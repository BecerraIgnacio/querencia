---
id: M1-010
title: Account And Free Gating In Both Languages
kind: leaf
runnable: true
status: complete
phase: phase-04-auth-free
track: mvp1
module: apps/web
depends_on:
  - M1-002
  - M1-009
unlocks:
  - M2-001
  - M2-004
owned_paths:
  - apps/web/src/modules/account-plan/
affected_paths:
  - apps/web/src/modules/account-plan/
  - packages/authz/
read_first:
  - CLAUDE.md
  - apps/web/CLAUDE.md
  - docs/plans/mvp1/phase-04-auth-free/M1-010-account-free-gating.md
  - docs/domains/auth-and-plans.md
minimal_context:
  - docs/domains/auth-and-plans.md
  - docs/contracts/member-api.md
  - docs/decisions/ADR-004-plan-entitlements.md
plugin_marketplaces_needed:
  - wshobson/agents
fixed_transversal_plugins:
  - claude-mem
required_plugins:
  - javascript-typescript
optional_plugins:
  - backend-development
install_plugins:
  - backend-development
remove_plugins_after:
  - backend-development
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
entry_prompt: develop #M1-010
stop_conditions:
  - account surfaces reflect the Free baseline and entitlement shell in English and Spanish
  - plan-aware gating exists without implementing paid-tier features
  - later MVP2 plans can extend account and entitlement flows without reworking auth foundations
handoff_updates:
  - docs/state/current.md
  - docs/plans/mvp1/phase-04-auth-free/M1-010-account-free-gating.md
---

## Objective
- Build the bilingual account-facing `Free` entitlement shell on top of the auth/profile foundation.

## Scope
- account and plan page shell
- Free baseline entitlement presentation in English and Spanish
- reusable entitlement logic in `packages/authz` for future paid tiers

## Out Of Scope
- Plus features
- Pro features
- billing and checkout

## Risks Or Impacts
- If account UI and entitlement logic are fused too tightly, later paid-tier work will duplicate or rewrite them.
- If this plan implements premium behavior early, MVP1 scope will drift.

## Definition Of Done
- Account and plan surfaces exist for the `Free` baseline.
- Entitlement logic is reusable and separated from later paid-tier features.
- MVP2 can extend member capabilities from this shell without redesigning the account area.

## Stop Conditions
- Stop once `Free` account and entitlement shell is complete.
- Do not add reporting, alerts, or dashboards in this plan.

## Expected Validations
- `./scripts/validate-plan.sh docs/plans/mvp1/phase-04-auth-free/M1-010-account-free-gating.md`
- `./scripts/validate-resource-inventory.sh docs/plans/mvp1/phase-04-auth-free/M1-010-account-free-gating.md`
- `./scripts/plan-context.sh M1-010`
- `pnpm --filter @querencia/web test`

## Handoff Updates
- Mark `M1-010` completed in this file.
- Update `docs/state/current.md` so later milestone plans can see auth and `Free` account scaffolding as complete.
