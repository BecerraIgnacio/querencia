---
id: M4-002
title: Public-Vs-Collaborative Reconciliation And Anomaly Review
kind: leaf
runnable: true
status: blocked
phase: phase-01-validation-quality
track: mvp4
module: services/pipeline
depends_on:
  - M4-001
  - M2-003
unlocks:
  - M4-004
owned_paths:
  - services/pipeline/src/querencia_pipeline/modules/validation/
affected_paths:
  - services/pipeline/src/querencia_pipeline/modules/validation/
  - services/pipeline/src/querencia_pipeline/modules/aggregation/
  - services/pipeline/tests/
read_first:
  - CLAUDE.md
  - services/pipeline/CLAUDE.md
  - docs/plans/mvp4/phase-01-validation-quality/M4-002-public-collaborative-reconciliation-anomaly-review.md
  - docs/domains/data-pipeline.md
minimal_context:
  - docs/domains/data-pipeline.md
  - docs/contracts/privacy-aggregation.md
  - docs/contracts/analytics-contracts.md
plugin_marketplaces_needed:
  - wshobson/agents
fixed_transversal_plugins:
  - claude-mem
required_plugins:
  - python-development
  - data-engineering
optional_plugins:
  - business-analytics
  - data-validation-suite
install_plugins:
  - business-analytics
remove_plugins_after:
  - business-analytics
keep_plugins_persistent:
  - python-development
  - data-engineering
external_tools_required:
  - rtk
fixed_transversal_agents:
  - transversal-reviewer
  - transversal-contract-guardian
required_agents: []
optional_agents:
  - module-data-pipeline
install_agents: []
remove_agents_after: []
keep_agents_persistent:
  - module-data-pipeline
fixed_transversal_skills:
  - repo-routing
required_skills:
  - plan-execution
  - validation-checklist
optional_skills:
  - dataset-normalization
install_skills: []
remove_skills_after: []
keep_skills_persistent:
  - dataset-normalization
consult_claude_mem: false
prefer_rtk_for_validation: true
execution_mode: manual
entry_prompt: develop #M4-002
stop_conditions:
  - reconciliation between public and collaborative signals is stable
  - anomaly review outputs are clear enough for territorial analytics
  - the plan stops before forecast generation or Pro UI work
handoff_updates:
  - docs/state/current.md
  - docs/plans/mvp4/phase-01-validation-quality/M4-002-public-collaborative-reconciliation-anomaly-review.md
---

## Objective
- Reconcile public and collaborative signals and expose anomaly-review outputs.

## Scope
- public-vs-collaborative reconciliation
- anomaly review outputs
- stable data for territorial analytics

## Out Of Scope
- forecast scoring
- Pro UI
- export work

## Risks Or Impacts
- If reconciliation is weak, later territorial and trend outputs will be misleading.
- If anomaly work expands into UI or workflow tooling, this leaf will lose focus.

## Definition Of Done
- Reconciliation and anomaly-review outputs are stable.
- Territorial analytics can consume them without redefining the logic.
- The plan stays pipeline-focused.

## Stop Conditions
- Stop once reconciliation outputs are stable.
- Do not continue into trend scoring or frontend surfaces.

## Expected Validations
- `./scripts/validate-plan.sh docs/plans/mvp4/phase-01-validation-quality/M4-002-public-collaborative-reconciliation-anomaly-review.md`
- `./scripts/validate-resource-inventory.sh docs/plans/mvp4/phase-01-validation-quality/M4-002-public-collaborative-reconciliation-anomaly-review.md`
- `./scripts/plan-context.sh M4-002`
- `pytest services/pipeline/tests`

## Handoff Updates
- Mark `M4-002` completed in this file.
- Update `docs/state/current.md` so `M4-004` can become ready when Pro analytics are also complete.
