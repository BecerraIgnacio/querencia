---
id: M1-004
title: Pipeline Geocoding, Hex Aggregation, And Locale-Ready KPIs
kind: leaf
runnable: true
status: blocked
phase: phase-02-public-data
track: mvp1
module: services/pipeline
depends_on:
  - M1-002
  - M1-003
unlocks:
  - M1-008
owned_paths:
  - services/pipeline/src/querencia_pipeline/modules/geocoding/
  - services/pipeline/src/querencia_pipeline/modules/hex_assignment/
  - services/pipeline/src/querencia_pipeline/modules/aggregation/
  - services/pipeline/src/querencia_pipeline/modules/kpi_generation/
affected_paths:
  - services/pipeline/src/querencia_pipeline/modules/geocoding/
  - services/pipeline/src/querencia_pipeline/modules/hex_assignment/
  - services/pipeline/src/querencia_pipeline/modules/aggregation/
  - services/pipeline/src/querencia_pipeline/modules/kpi_generation/
  - services/pipeline/tests/
read_first:
  - CLAUDE.md
  - services/pipeline/CLAUDE.md
  - docs/plans/mvp1/phase-02-public-data/M1-004-pipeline-geocoding-hex-aggregation.md
  - docs/contracts/privacy-aggregation.md
minimal_context:
  - docs/domains/data-pipeline.md
  - docs/contracts/privacy-aggregation.md
  - docs/contracts/analytics-contracts.md
  - docs/decisions/ADR-003-hex-privacy-model.md
plugin_marketplaces_needed:
  - wshobson/agents
fixed_transversal_plugins:
  - claude-mem
required_plugins:
  - python-development
  - data-engineering
optional_plugins:
  - data-validation-suite
  - database-design
install_plugins:
  - data-validation-suite
remove_plugins_after:
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
entry_prompt: develop #M1-004
stop_conditions:
  - normalized records can be geocoded and assigned to hex cells
  - public outputs are aggregated by time and hex with privacy guarantees
  - KPI outputs are derived from aggregated data only and remain label-ready for English and Spanish surfaces
handoff_updates:
  - docs/state/current.md
  - docs/plans/mvp1/phase-02-public-data/M1-004-pipeline-geocoding-hex-aggregation.md
---

## Objective
- Transform normalized data into public-safe territorial intelligence outputs that later web plans can label in English and Spanish.

## Scope
- geocoding and territorial mapping
- hex assignment
- time-bucket and hex-bucket aggregation
- KPI derivation from aggregated data
- locale-ready labels and dimensions without duplicating the underlying metrics

## Out Of Scope
- disease page UI
- account logic
- alert delivery

## Risks Or Impacts
- Any privacy mistake here leaks directly into public surfaces.
- If output shapes drift from shared contracts, the web backlog will stall.

## Definition Of Done
- Aggregation outputs are privacy-safe and contract-aligned.
- Geocoding, hex assignment, aggregation, and KPI stages are isolated and testable.
- Public web plans can consume stable aggregated outputs and attach bilingual labels without reshaping the metrics.

## Stop Conditions
- Stop once aggregate outputs and KPI outputs are stable and reviewed.
- Do not start web rendering or dashboard composition in this plan.

## Expected Validations
- `./scripts/validate-plan.sh docs/plans/mvp1/phase-02-public-data/M1-004-pipeline-geocoding-hex-aggregation.md`
- `./scripts/validate-resource-inventory.sh docs/plans/mvp1/phase-02-public-data/M1-004-pipeline-geocoding-hex-aggregation.md`
- `./scripts/plan-context.sh M1-004`
- `pytest services/pipeline/tests`

## Handoff Updates
- Mark `M1-004` completed in this file.
- Update `docs/state/current.md` so `M1-008` can become ready once its UI dependency is also complete.
