---
id: M2-004
title: Watch Area Persistence And Management
kind: leaf
runnable: true
status: complete
phase: phase-02-watch-areas-alerts
track: mvp2
module: auth-platform
depends_on:
  - M1-009
  - M1-010
unlocks:
  - M2-005
  - M2-008
owned_paths:
  - supabase/
affected_paths:
  - supabase/
  - apps/web/src/modules/account-plan/
read_first:
  - CLAUDE.md
  - apps/web/CLAUDE.md
  - docs/plans/mvp2/phase-02-watch-areas-alerts/M2-004-watch-area-persistence-management.md
  - docs/domains/reporting-alerts.md
minimal_context:
  - docs/domains/reporting-alerts.md
  - docs/domains/auth-and-plans.md
  - docs/contracts/member-api.md
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
  - backend-development
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
entry_prompt: develop #M2-004
stop_conditions:
  - watch areas can be stored and retrieved safely
  - account-linked watch-area management boundaries are stable
  - later alert and dashboard plans can reuse the same watch-area model
handoff_updates:
  - docs/state/current.md
  - docs/plans/mvp2/phase-02-watch-areas-alerts/M2-004-watch-area-persistence-management.md
---

## Objective
- Add the persistence model and management boundary for saved watch areas.

## Scope
- watch-area persistence
- account-linked management boundary
- contract-aligned settings surface for later alert and dashboard work

## Out Of Scope
- alert rule evaluation
- alert center UI
- paid dashboard rendering

## Risks Or Impacts
- If watch-area semantics drift here, alerts and dashboards will encode different monitoring models.
- This plan touches account and backend state, so boundary mistakes will cascade.

## Definition Of Done
- Watch areas are persistent and account-linked.
- The management boundary is reusable by alerts and dashboards.
- Locale-aware account surfaces can build on the same watch-area model.

## Stop Conditions
- Stop once watch-area persistence and management boundaries are stable.
- Do not continue into alert rules or dashboard composition.

## Expected Validations
- `./scripts/validate-plan.sh docs/plans/mvp2/phase-02-watch-areas-alerts/M2-004-watch-area-persistence-management.md`
- `./scripts/validate-resource-inventory.sh docs/plans/mvp2/phase-02-watch-areas-alerts/M2-004-watch-area-persistence-management.md`
- `./scripts/plan-context.sh M2-004`
- `pnpm --filter @querencia/web test`

## Handoff Updates
- Mark `M2-004` completed in this file.
- Update `docs/state/current.md` so `M2-005` and `M2-008` can become ready when their other dependencies are met.
