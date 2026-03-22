---
id: M2-007
title: Extended History And Trend-Series Outputs
kind: leaf
runnable: true
status: complete
phase: phase-03-plus-dashboards
track: mvp2
module: services/pipeline
depends_on:
  - M1-004
  - M2-003
unlocks:
  - M2-008
  - M3-003
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
  - docs/plans/mvp2/phase-03-plus-dashboards/M2-007-extended-history-trend-series.md
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
  - data-validation-suite
  - business-analytics
install_plugins:
  - data-validation-suite
  - business-analytics
remove_plugins_after:
  - data-validation-suite
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
entry_prompt: develop #M2-007
stop_conditions:
  - richer history windows and trend-series outputs are stable
  - the outputs stay language-neutral while remaining label-ready
  - Plus dashboard plans can consume them without redefining metric shapes
handoff_updates:
  - docs/state/current.md
  - docs/plans/mvp2/phase-03-plus-dashboards/M2-007-extended-history-trend-series.md
---

## Objective
- Produce the richer trend-series outputs that Plus dashboards need.

## Scope
- longer history windows
- trend-series outputs
- stable pipeline outputs for Plus dashboards

## Out Of Scope
- dashboard UI
- alert UX
- Pro analytics

## Risks Or Impacts
- If history windows or metric keys drift here, Plus and Pro dashboards will fork.
- If labels are baked into the pipeline instead of contracts, bilingual rendering will become brittle.

## Definition Of Done
- Trend-series outputs are stable and reusable.
- Metric keys stay language-neutral.
- Plus dashboard plans can focus on presentation instead of redefining analytics outputs.

## Stop Conditions
- Stop once richer history outputs are stable and tested.
- Do not continue into dashboard UI.

## Expected Validations
- `./scripts/validate-plan.sh docs/plans/mvp2/phase-03-plus-dashboards/M2-007-extended-history-trend-series.md`
- `./scripts/validate-resource-inventory.sh docs/plans/mvp2/phase-03-plus-dashboards/M2-007-extended-history-trend-series.md`
- `./scripts/plan-context.sh M2-007`
- `pytest services/pipeline/tests`

## Handoff Updates
- Mark `M2-007` completed in this file.
- Update `docs/state/current.md` so `M2-008` can become ready when watch-area dependencies are also complete.
