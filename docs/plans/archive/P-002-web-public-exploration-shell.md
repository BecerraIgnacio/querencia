---
id: P-002
title: Web Public Exploration Shell
status: proposed
module: apps/web
dependencies:
  - P-000
  - P-001
affected_paths:
  - apps/web/app/
  - apps/web/src/modules/animal-selection/
  - apps/web/src/modules/disease-catalog/
minimal_context:
  - CLAUDE.md
  - apps/web/CLAUDE.md
  - docs/domains/public-exploration.md
  - docs/contracts/public-api.md
  - docs/decisions/ADR-001-monorepo-and-boundaries.md
plugin_marketplaces_needed:
  - wshobson/agents
fixed_transversal_plugins:
  - claude-mem
required_plugins:
  - javascript-typescript
optional_plugins:
  - frontend-mobile-development
  - ui-design
install_plugins:
  - frontend-mobile-development
  - ui-design
remove_plugins_after:
  - frontend-mobile-development
  - ui-design
keep_plugins_persistent:
  - javascript-typescript
external_tools_required:
  - rtk
fixed_transversal_agents:
  - transversal-reviewer
  - transversal-contract-guardian
required_agents: []
optional_agents: []
install_agents: []
remove_agents_after: []
keep_agents_persistent: []
fixed_transversal_skills:
  - repo-routing
required_skills:
  - plan-execution
  - validation-checklist
optional_skills: []
install_skills: []
remove_skills_after: []
keep_skills_persistent: []
consult_claude_mem: false
prefer_rtk_for_validation: true
execution_mode: manual
---

## Objective
- Build the public entry shell for landing, animal selection, and disease discovery without entering premium or member flows.

## Scope
- landing shell
- animal type selection
- disease list by animal
- routing into the disease-detail entrypoint

## Out Of Scope
- disease map and timeline behavior
- auth
- report submission
- dashboards

## Risks Or Impacts
- If the animal-to-disease flow is loose, later plans will rework page and route structure.
- UI work must not embed premium assumptions into the public shell.

## Definition Of Done
- The public browsing flow is routed and modularized under `animal-selection` and `disease-catalog`.
- The module boundaries are clear enough for later disease-view work.
- Plugin lifecycle is explicit for future frontend execution.

## Expected Validations
- `./scripts/validate-plan.sh docs/plans/P-002-web-public-exploration-shell.md`
- `./scripts/validate-resource-inventory.sh docs/plans/P-002-web-public-exploration-shell.md`

