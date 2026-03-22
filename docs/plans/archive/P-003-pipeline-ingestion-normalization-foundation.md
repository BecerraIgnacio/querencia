---
id: P-003
title: Pipeline Ingestion And Normalization Foundation
status: proposed
module: services/pipeline
dependencies:
  - P-000
  - P-001
affected_paths:
  - services/pipeline/src/querencia_pipeline/modules/public_ingestion/
  - services/pipeline/src/querencia_pipeline/modules/normalization/
  - services/pipeline/tests/
minimal_context:
  - CLAUDE.md
  - services/pipeline/CLAUDE.md
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
---

## Objective
- Create the ingestion and normalization foundation for public datasets and collaborative report inputs.

## Scope
- raw input acquisition boundaries
- normalized disease, species, date, and territory shapes
- stage separation between raw and normalized outputs
- validation points for import quality

## Out Of Scope
- geocoding
- hex assignment
- final public aggregations
- dashboard KPIs

## Risks Or Impacts
- Weak normalization will cascade into aggregation and dashboard rework.
- Mixing raw and normalized semantics early will make pipeline modules tightly coupled.

## Definition Of Done
- Ingestion and normalization stages are isolated and named consistently with docs.
- Validation checkpoints are defined at stage boundaries.
- Later geocoding and aggregation work can consume stable normalized outputs.

## Expected Validations
- `./scripts/validate-plan.sh docs/plans/P-003-pipeline-ingestion-normalization-foundation.md`
- `./scripts/validate-resource-inventory.sh docs/plans/P-003-pipeline-ingestion-normalization-foundation.md`

