---
id: M4-003
title: Heuristic Trend Scoring And Forecasting
kind: leaf
runnable: true
status: blocked
phase: phase-02-trend-intelligence
track: mvp4
module: services/pipeline
depends_on:
  - M3-003
  - M4-001
unlocks:
  - M4-005
owned_paths:
  - services/pipeline/src/querencia_pipeline/modules/kpi_generation/
affected_paths:
  - services/pipeline/src/querencia_pipeline/modules/kpi_generation/
  - services/pipeline/src/querencia_pipeline/modules/validation/
  - services/pipeline/tests/
read_first:
  - CLAUDE.md
  - services/pipeline/CLAUDE.md
  - docs/plans/mvp4/phase-02-trend-intelligence/M4-003-heuristic-trend-scoring-forecasting.md
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
entry_prompt: develop #M4-003
stop_conditions:
  - heuristic trend scores are stable and interpretable
  - forecasting remains practical and bounded
  - later Pro UI work can consume the outputs without redefining the score model
handoff_updates:
  - docs/state/current.md
  - docs/plans/mvp4/phase-02-trend-intelligence/M4-003-heuristic-trend-scoring-forecasting.md
---

## Objective
- Add practical heuristic trend scoring and forecasting on top of the validated analytics base.

## Scope
- heuristic trend scores
- bounded forecasting outputs
- stable contract-aligned scoring semantics

## Out Of Scope
- ML platforms
- export workflows
- frontend visualization

## Risks Or Impacts
- Forecasting can quickly sprawl into an unbounded research project if not constrained.
- If score semantics are unstable, Pro UI will bake in the wrong interpretation.

## Definition Of Done
- Heuristic scores and forecasting outputs are stable and interpretable.
- The work stays practical and bounded.
- Pro UI can render the outputs without redefining them.

## Stop Conditions
- Stop once score outputs are stable and reviewed.
- Do not continue into territorial analytics UI or model-serving infrastructure.

## Expected Validations
- `./scripts/validate-plan.sh docs/plans/mvp4/phase-02-trend-intelligence/M4-003-heuristic-trend-scoring-forecasting.md`
- `./scripts/validate-resource-inventory.sh docs/plans/mvp4/phase-02-trend-intelligence/M4-003-heuristic-trend-scoring-forecasting.md`
- `./scripts/plan-context.sh M4-003`
- `pytest services/pipeline/tests`

## Handoff Updates
- Mark `M4-003` completed in this file.
- Update `docs/state/current.md` so `M4-005` can become ready when territorial analytics are also complete.
