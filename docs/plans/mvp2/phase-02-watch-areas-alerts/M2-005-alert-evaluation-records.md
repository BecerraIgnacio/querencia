---
id: M2-005
title: Alert Evaluation And Alert Records
kind: leaf
runnable: true
status: complete
phase: phase-02-watch-areas-alerts
track: mvp2
module: auth-platform
depends_on:
  - M2-003
  - M2-004
unlocks:
  - M2-006
owned_paths:
  - supabase/
affected_paths:
  - supabase/
  - packages/contracts/
read_first:
  - CLAUDE.md
  - docs/plans/mvp2/phase-02-watch-areas-alerts/M2-005-alert-evaluation-records.md
  - docs/domains/reporting-alerts.md
  - docs/domains/dashboards.md
minimal_context:
  - docs/domains/reporting-alerts.md
  - docs/contracts/member-api.md
  - docs/contracts/analytics-contracts.md
plugin_marketplaces_needed:
  - wshobson/agents
fixed_transversal_plugins:
  - claude-mem
required_plugins:
  - backend-development
  - comprehensive-review
optional_plugins:
  - backend-api-security
  - security-scanning
install_plugins:
  - backend-development
  - comprehensive-review
  - backend-api-security
remove_plugins_after:
  - comprehensive-review
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
entry_prompt: develop #M2-005
stop_conditions:
  - alert rules evaluate against integrated aggregated outputs
  - alert records are stable and locale-ready
  - later alert-center UI can render from stored alert records without redefining semantics
handoff_updates:
  - docs/state/current.md
  - docs/plans/mvp2/phase-02-watch-areas-alerts/M2-005-alert-evaluation-records.md
---

## Objective
- Define how alerts are evaluated and stored before building the alert UX.

## Scope
- alert evaluation logic
- alert record boundary
- locale-ready alert message structures

## Out Of Scope
- alert center UI
- Plus dashboard rendering
- Pro multi-area analytics

## Risks Or Impacts
- If alert rules read unstable or non-approved data views, privacy and entitlement boundaries will drift.
- Hardcoded copy here would make later bilingual alert UX brittle.

## Definition Of Done
- Alert evaluation is tied to integrated aggregated outputs.
- Alert records are reusable and locale-ready.
- Alert UI can build on stable stored semantics.

## Stop Conditions
- Stop once alert evaluation and stored alert boundaries are reviewed.
- Do not continue into alert-center UI or trend dashboards.

## Expected Validations
- `./scripts/validate-plan.sh docs/plans/mvp2/phase-02-watch-areas-alerts/M2-005-alert-evaluation-records.md`
- `./scripts/validate-resource-inventory.sh docs/plans/mvp2/phase-02-watch-areas-alerts/M2-005-alert-evaluation-records.md`
- `./scripts/plan-context.sh M2-005`
- `pnpm --filter @querencia/contracts test`

## Handoff Updates
- Mark `M2-005` completed in this file.
- Update `docs/state/current.md` so `M2-006` can become ready.
