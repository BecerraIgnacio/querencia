---
id: P-005
title: Pipeline Geocoding, Hex, And Aggregation Foundation
status: proposed
module: services/pipeline
dependencies:
  - P-001
  - P-003
affected_paths:
  - services/pipeline/src/querencia_pipeline/modules/geocoding/
  - services/pipeline/src/querencia_pipeline/modules/hex_assignment/
  - services/pipeline/src/querencia_pipeline/modules/aggregation/
  - services/pipeline/src/querencia_pipeline/modules/kpi_generation/
minimal_context:
  - CLAUDE.md
  - services/pipeline/CLAUDE.md
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
---

## Objective
- Turn normalized records into privacy-safe territorial intelligence outputs.

## Scope
- geocoding and territorial mapping
- hex assignment
- time-bucket and hex-bucket aggregation
- KPI derivation from aggregated outputs

## Out Of Scope
- public web rendering
- member dashboards
- alert delivery

## Risks Or Impacts
- Privacy mistakes here will contaminate all public surfaces.
- Aggregation contract drift will block disease view and dashboards.

## Definition Of Done
- Geocoding, hex assignment, aggregation, and KPI stages are modularized.
- Public analytics outputs are expressed through aggregated contracts only.
- Later disease-view and dashboard plans can consume stable aggregated outputs.

## Expected Validations
- `./scripts/validate-plan.sh docs/plans/P-005-pipeline-geocoding-hex-aggregation-foundation.md`
- `./scripts/validate-resource-inventory.sh docs/plans/P-005-pipeline-geocoding-hex-aggregation-foundation.md`

