---
id: M3-003
title: Advanced Aggregation, Prioritization, And Executive Metrics
kind: leaf
runnable: true
status: completed
phase: phase-02-pro-analytics
track: mvp3
module: services/pipeline
depends_on:
  - M2-007
  - M1-004
unlocks:
  - M3-004
  - M3-005
  - M4-003
  - M4-004
owned_paths:
  - services/pipeline/src/querencia_pipeline/modules/aggregation/
  - services/pipeline/src/querencia_pipeline/modules/kpi_generation/
affected_paths:
  - services/pipeline/src/querencia_pipeline/modules/aggregation/
  - services/pipeline/src/querencia_pipeline/modules/kpi_generation/
  - services/pipeline/tests/
read_first:
  - CLAUDE.md
  - services/pipeline/CLAUDE.md
  - docs/plans/mvp3/phase-02-pro-analytics/M3-003-advanced-aggregation-prioritization-metrics.md
  - docs/domains/dashboards.md
minimal_context:
  - docs/domains/dashboards.md
  - docs/contracts/analytics-contracts.md
  - docs/domains/data-pipeline.md
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
  - data-validation-suite
remove_plugins_after:
  - business-analytics
  - data-validation-suite
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
entry_prompt: develop #M3-003
stop_conditions:
  - Pro-level prioritization and executive metrics are stable
  - outputs remain language-neutral and label-ready
  - later dashboards and trend work can consume the same metric vocabulary
handoff_updates:
  - docs/state/current.md
  - docs/plans/mvp3/phase-02-pro-analytics/M3-003-advanced-aggregation-prioritization-metrics.md
---

## Objective
- Produce the advanced metrics that distinguish Pro analytics from Plus trends.

## Scope
- advanced aggregation
- prioritization outputs
- executive metrics

## Out Of Scope
- dashboard rendering
- export download UX
- forecasting

## Risks Or Impacts
- Metric drift here would force later Pro dashboards, exports, and forecasting to disagree.
- If prioritization logic bypasses the shared privacy model, higher-tier analytics become unsafe.

## Definition Of Done
- Pro-level metrics and prioritization outputs are stable.
- Outputs stay language-neutral and contract-aligned.
- Later dashboard, export, and trend plans can consume the same metric vocabulary.

## Stop Conditions
- Stop once advanced outputs are stable and tested.
- Do not continue into dashboard rendering or forecasting surfaces.

## Expected Validations
- `./scripts/validate-plan.sh docs/plans/mvp3/phase-02-pro-analytics/M3-003-advanced-aggregation-prioritization-metrics.md`
- `./scripts/validate-resource-inventory.sh docs/plans/mvp3/phase-02-pro-analytics/M3-003-advanced-aggregation-prioritization-metrics.md`
- `./scripts/plan-context.sh M3-003`
- `pytest services/pipeline/tests`

## Handoff Updates
- Mark `M3-003` completed in this file.
- Update `docs/state/current.md` so downstream Pro analytics, export, and M4 trend plans can advance.
