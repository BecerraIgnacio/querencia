---
id: M4-004
title: Territorial Analytics And Hotspot Evolution Metrics
kind: leaf
runnable: true
status: blocked
phase: phase-02-trend-intelligence
track: mvp4
module: services/pipeline
depends_on:
  - M3-003
  - M4-002
unlocks:
  - M4-005
owned_paths:
  - services/pipeline/src/querencia_pipeline/modules/aggregation/
affected_paths:
  - services/pipeline/src/querencia_pipeline/modules/aggregation/
  - services/pipeline/src/querencia_pipeline/modules/kpi_generation/
  - services/pipeline/tests/
read_first:
  - CLAUDE.md
  - services/pipeline/CLAUDE.md
  - docs/plans/mvp4/phase-02-trend-intelligence/M4-004-territorial-analytics-hotspot-evolution.md
  - docs/contracts/analytics-contracts.md
minimal_context:
  - docs/contracts/analytics-contracts.md
  - docs/domains/data-pipeline.md
  - docs/domains/dashboards.md
plugin_marketplaces_needed:
  - wshobson/agents
fixed_transversal_plugins:
  - claude-mem
required_plugins:
  - python-development
  - data-engineering
  - business-analytics
optional_plugins:
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
entry_prompt: develop #M4-004
stop_conditions:
  - territorial evolution and hotspot metrics are stable
  - outputs remain compatible with the shared Pro analytics vocabulary
  - the work stops before frontend composition
handoff_updates:
  - docs/state/current.md
  - docs/plans/mvp4/phase-02-trend-intelligence/M4-004-territorial-analytics-hotspot-evolution.md
---

## Objective
- Expand territorial analytics with hotspot-evolution signals built on reconciled data.

## Scope
- territorial evolution metrics
- hotspot-evolution outputs
- stable analytics inputs for the final Pro UI plan

## Out Of Scope
- frontend rendering
- forecasting
- export work

## Risks Or Impacts
- If territorial metrics bypass reconciliation outputs, the final Pro UI will tell the wrong story.
- If this plan drifts into rendering, it stops being a bounded analytics leaf.

## Definition Of Done
- Territorial and hotspot-evolution metrics are stable.
- They align with the shared Pro analytics vocabulary.
- Final Pro UI can consume them without redefining the analytics layer.

## Stop Conditions
- Stop once territorial analytics outputs are stable.
- Do not continue into UI composition.

## Expected Validations
- `./scripts/validate-plan.sh docs/plans/mvp4/phase-02-trend-intelligence/M4-004-territorial-analytics-hotspot-evolution.md`
- `./scripts/validate-resource-inventory.sh docs/plans/mvp4/phase-02-trend-intelligence/M4-004-territorial-analytics-hotspot-evolution.md`
- `./scripts/plan-context.sh M4-004`
- `pytest services/pipeline/tests`

## Handoff Updates
- Mark `M4-004` completed in this file.
- Update `docs/state/current.md` so `M4-005` can become ready when heuristic trend outputs are also complete.
