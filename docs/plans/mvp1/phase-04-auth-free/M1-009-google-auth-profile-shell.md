---
id: M1-009
title: Google Auth, Profile, And Preferred Locale Shell
kind: leaf
runnable: true
status: complete
phase: phase-04-auth-free
track: mvp1
module: auth-platform
depends_on:
  - M1-001
unlocks:
  - M1-010
owned_paths:
  - supabase/
affected_paths:
  - supabase/
  - apps/web/src/modules/account-plan/
read_first:
  - CLAUDE.md
  - apps/web/CLAUDE.md
  - docs/plans/mvp1/phase-04-auth-free/M1-009-google-auth-profile-shell.md
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
entry_prompt: develop #M1-009
stop_conditions:
  - Google login, profile shell, and preferred-locale persistence exist
  - member identity and profile state are separated from later paid-tier features
  - entitlement-aware account work can build on top without redesigning auth boundaries
handoff_updates:
  - docs/state/current.md
  - docs/plans/mvp1/phase-04-auth-free/M1-009-google-auth-profile-shell.md
---

## Objective
- Build the minimum auth, profile, and preferred-locale foundation for member-aware evolution of the product.

## Scope
- Google auth shell
- profile retrieval and update shell
- preferred locale persistence
- account-profile boundary between Supabase and web account surfaces

## Out Of Scope
- watch areas
- alerts
- paid dashboards
- billing

## Risks Or Impacts
- Weak auth boundaries will create later RLS and entitlement rework.
- If profile concerns are mixed with plan gating too early, account flows will become brittle.

## Definition Of Done
- Auth/profile foundations exist behind clear Supabase and account-module boundaries.
- Preferred locale can be stored for later bilingual account, alert, and dashboard work.
- Later entitlement and account work can reuse the profile shell without restructuring auth.
- The plan does not pull in paid feature logic.

## Stop Conditions
- Stop once auth and profile shell behavior is in place and reviewed.
- Do not continue into `Free` or paid-tier gating inside this plan.

## Expected Validations
- `./scripts/validate-plan.sh docs/plans/mvp1/phase-04-auth-free/M1-009-google-auth-profile-shell.md`
- `./scripts/validate-resource-inventory.sh docs/plans/mvp1/phase-04-auth-free/M1-009-google-auth-profile-shell.md`
- `./scripts/plan-context.sh M1-009`
- `pnpm --filter @querencia/web test`

## Handoff Updates
- Mark `M1-009` completed in this file.
- Update `docs/state/current.md` so `M1-010` can become ready once contract dependencies are complete.
