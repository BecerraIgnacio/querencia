---
id: M3-006
title: Disease Catalog Expansion And Refresh Jobs
kind: leaf
runnable: true
status: completed
phase: phase-03-exports-catalog-expansion
track: mvp3
module: services/pipeline
depends_on:
  - M2-008
  - M1-003
  - M1-004
unlocks:
  - M4-001
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
  - docs/plans/mvp3/phase-03-exports-catalog-expansion/M3-006-disease-catalog-expansion-refresh-jobs.md
  - docs/domains/data-pipeline.md
minimal_context:
  - docs/domains/data-pipeline.md
  - docs/domains/disease-view.md
  - docs/contracts/public-api.md
plugin_marketplaces_needed:
  - wshobson/agents
  - anthropics/skills
fixed_transversal_plugins:
  - claude-mem
required_plugins:
  - python-development
  - data-engineering
optional_plugins:
  - data-validation-suite
  - document-skills
install_plugins:
  - data-validation-suite
  - document-skills
remove_plugins_after:
  - data-validation-suite
  - document-skills
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
entry_prompt: develop #M3-006
stop_conditions:
  - the disease catalog can expand without breaking existing taxonomy
  - refresh jobs are stable
  - every newly added disease is planned with English and Spanish content fields
handoff_updates:
  - docs/state/current.md
  - docs/plans/mvp3/phase-03-exports-catalog-expansion/M3-006-disease-catalog-expansion-refresh-jobs.md
---

## Objective
- Expand disease coverage and make catalog refreshes repeatable.

## Scope
- disease-catalog expansion
- refresh jobs
- bilingual content requirements for newly added diseases

## Out Of Scope
- dashboard rendering
- exports
- forecasting

## Risks Or Impacts
- If new diseases are added without bilingual content requirements, the native-language promise breaks.
- If refresh jobs are unstable, later validation and trend plans will be working on moving inputs.

## Definition Of Done
- Disease coverage can expand without breaking existing normalization and aggregation rules.
- Refresh jobs are stable and testable.
- Every new disease is planned with English and Spanish content fields.

## Stop Conditions
- Stop once catalog expansion and refresh jobs are stable.
- Do not continue into anomaly scoring or forecasting.

## Expected Validations
- `./scripts/validate-plan.sh docs/plans/mvp3/phase-03-exports-catalog-expansion/M3-006-disease-catalog-expansion-refresh-jobs.md`
- `./scripts/validate-resource-inventory.sh docs/plans/mvp3/phase-03-exports-catalog-expansion/M3-006-disease-catalog-expansion-refresh-jobs.md`
- `./scripts/plan-context.sh M3-006`
- `pytest services/pipeline/tests`

## Handoff Updates
- Mark `M3-006` completed in this file.
- Update `docs/state/current.md` so `M4-001` can become ready when report-integration dependencies are also met.
