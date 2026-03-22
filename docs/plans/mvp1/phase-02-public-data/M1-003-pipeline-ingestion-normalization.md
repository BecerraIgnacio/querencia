---
id: M1-003
title: Pipeline Ingestion, Normalization, And Language-Neutral Taxonomy
kind: leaf
runnable: true
status: blocked
phase: phase-02-public-data
track: mvp1
module: services/pipeline
depends_on:
  - M1-001
unlocks:
  - M1-004
owned_paths:
  - services/pipeline/src/querencia_pipeline/modules/public_ingestion/
  - services/pipeline/src/querencia_pipeline/modules/normalization/
affected_paths:
  - services/pipeline/src/querencia_pipeline/modules/public_ingestion/
  - services/pipeline/src/querencia_pipeline/modules/normalization/
  - services/pipeline/tests/
read_first:
  - CLAUDE.md
  - services/pipeline/CLAUDE.md
  - docs/plans/mvp1/phase-02-public-data/M1-003-pipeline-ingestion-normalization.md
  - docs/domains/data-pipeline.md
minimal_context:
  - docs/domains/data-pipeline.md
  - docs/contracts/analytics-contracts.md
  - docs/ecosystem/external-stack.md
plugin_marketplaces_needed:
  - wshobson/agents
fixed_transversal_plugins:
  - claude-mem
required_plugins:
  - python-development
  - data-engineering
optional_plugins:
  - data-validation-suite
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
install_agents:
  - module-data-pipeline
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
install_skills:
  - dataset-normalization
remove_skills_after: []
keep_skills_persistent:
  - dataset-normalization
consult_claude_mem: false
prefer_rtk_for_validation: true
execution_mode: manual
entry_prompt: develop #M1-003
stop_conditions:
  - raw import and normalized output stages are separated
  - source provenance is retained through normalization
  - downstream aggregation work can consume normalized outputs without re-cleaning raw inputs
handoff_updates:
  - docs/state/current.md
  - docs/plans/mvp1/phase-02-public-data/M1-003-pipeline-ingestion-normalization.md
---

## Objective
- Build the pipeline stages that ingest source data and normalize it into a stable internal shape with language-neutral taxonomy keys.

## Scope
- raw public dataset intake
- normalization of disease, species, dates, and territories
- language-neutral normalization keys for downstream English and Spanish rendering
- validation at stage boundaries
- provenance retention for imported records

## Out Of Scope
- geocoding
- hex assignment
- final aggregations
- KPI derivation

## Risks Or Impacts
- Weak normalization will force cleanup logic into every downstream stage.
- Losing provenance early will make auditability and report blending harder.

## Definition Of Done
- Ingestion and normalization are separate modules with clear inputs and outputs.
- Validation exists where raw data becomes normalized data.
- The next pipeline plan can consume normalized outputs directly without duplicating records per language.

## Stop Conditions
- Stop once normalized outputs are stable and independently testable.
- Do not continue into geocoding or aggregation logic.

## Expected Validations
- `./scripts/validate-plan.sh docs/plans/mvp1/phase-02-public-data/M1-003-pipeline-ingestion-normalization.md`
- `./scripts/validate-resource-inventory.sh docs/plans/mvp1/phase-02-public-data/M1-003-pipeline-ingestion-normalization.md`
- `./scripts/plan-context.sh M1-003`
- `pytest services/pipeline/tests`

## Handoff Updates
- Mark `M1-003` completed in this file.
- Update `docs/state/current.md` so `M1-004` can become ready once contract dependencies are also complete.
