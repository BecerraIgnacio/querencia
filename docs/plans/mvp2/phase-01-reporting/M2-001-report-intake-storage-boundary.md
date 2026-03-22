---
id: M2-001
title: Report Intake, Storage, And Visibility Boundary
kind: leaf
runnable: true
status: complete
phase: phase-01-reporting
track: mvp2
module: reporting-platform
depends_on:
  - M1-002
  - M1-009
  - M1-010
unlocks:
  - M2-002
  - M2-003
owned_paths:
  - supabase/
affected_paths:
  - supabase/
  - packages/contracts/
  - apps/web/src/modules/reporting/
read_first:
  - CLAUDE.md
  - apps/web/CLAUDE.md
  - docs/plans/mvp2/phase-01-reporting/M2-001-report-intake-storage-boundary.md
  - docs/domains/reporting-alerts.md
minimal_context:
  - docs/domains/reporting-alerts.md
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
entry_prompt: develop #M2-001
stop_conditions:
  - report submission storage boundaries are stable
  - report source and visibility semantics are explicit
  - later UI and pipeline plans can consume the same report boundary
handoff_updates:
  - docs/state/current.md
  - docs/plans/mvp2/phase-01-reporting/M2-001-report-intake-storage-boundary.md
---

## Objective
- Define how collaborative reports are accepted, stored, and classified before building the full report experience.

## Scope
- report intake boundary
- storage and visibility semantics
- contract alignment for later UI and pipeline use

## Out Of Scope
- full report submission UI
- alert generation
- dashboard rendering

## Risks Or Impacts
- If source or visibility semantics drift here, reporting, alerts, and analytics will fork later.
- This plan touches protected backend and contract areas, so review discipline matters.

## Definition Of Done
- Report intake and storage boundaries are explicit and reusable.
- Source, visibility, and original-language metadata are stable where needed.
- Later reporting plans can build without renegotiating persistence semantics.

## Stop Conditions
- Stop once the report boundary is stable and reviewed.
- Do not continue into form UX, alert rules, or pipeline blending.

## Expected Validations
- `./scripts/validate-plan.sh docs/plans/mvp2/phase-01-reporting/M2-001-report-intake-storage-boundary.md`
- `./scripts/validate-resource-inventory.sh docs/plans/mvp2/phase-01-reporting/M2-001-report-intake-storage-boundary.md`
- `./scripts/plan-context.sh M2-001`
- `pnpm --filter @querencia/contracts test`

## Handoff Updates
- Mark `M2-001` completed in this file.
- Update `docs/state/current.md` so `M2-002` and `M2-003` can become ready.
