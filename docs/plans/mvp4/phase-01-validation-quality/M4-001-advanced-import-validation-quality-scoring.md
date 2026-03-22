---
id: M4-001
title: Advanced Import Validation And Quality Scoring
kind: leaf
runnable: true
status: blocked
phase: phase-01-validation-quality
track: mvp4
module: services/pipeline
depends_on:
  - M3-006
  - M2-003
unlocks:
  - M4-002
  - M4-003
owned_paths:
  - services/pipeline/src/querencia_pipeline/modules/validation/
affected_paths:
  - services/pipeline/src/querencia_pipeline/modules/validation/
  - services/pipeline/src/querencia_pipeline/modules/normalization/
  - services/pipeline/tests/
read_first:
  - CLAUDE.md
  - services/pipeline/CLAUDE.md
  - docs/plans/mvp4/phase-01-validation-quality/M4-001-advanced-import-validation-quality-scoring.md
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
  - data-validation-suite
optional_plugins:
  - security-scanning
install_plugins:
  - data-validation-suite
  - security-scanning
remove_plugins_after:
  - data-validation-suite
  - security-scanning
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
entry_prompt: develop #M4-001
stop_conditions:
  - stronger validation rules and quality scores are stable
  - later reconciliation and trend plans can trust the scored outputs
  - the work stops short of building full forecast models
handoff_updates:
  - docs/state/current.md
  - docs/plans/mvp4/phase-01-validation-quality/M4-001-advanced-import-validation-quality-scoring.md
---

## Objective
- Add deeper validation and quality scoring beyond the earlier pipeline baseline.

## Scope
- advanced import validation
- data-quality scoring
- stable outputs for later reconciliation and trend work

## Out Of Scope
- anomaly review UI
- forecasting
- Pro dashboard rendering

## Risks Or Impacts
- If quality scoring is inconsistent, every later M4 plan will inherit noisy inputs.
- If validation logic is mixed with forecasting, this phase will become unbounded.

## Definition Of Done
- Advanced validation rules and quality scoring are stable and testable.
- Reconciliation and trend plans can trust the scored outputs.
- The plan stays within validation and quality boundaries.

## Stop Conditions
- Stop once validation and quality scoring are stable.
- Do not continue into reconciliation UI or forecasting.

## Expected Validations
- `./scripts/validate-plan.sh docs/plans/mvp4/phase-01-validation-quality/M4-001-advanced-import-validation-quality-scoring.md`
- `./scripts/validate-resource-inventory.sh docs/plans/mvp4/phase-01-validation-quality/M4-001-advanced-import-validation-quality-scoring.md`
- `./scripts/plan-context.sh M4-001`
- `pytest services/pipeline/tests`

## Handoff Updates
- Mark `M4-001` completed in this file.
- Update `docs/state/current.md` so `M4-002` and `M4-003` can become ready when their other dependencies are met.
