---
id: P-006
title: Disease View Public Intelligence Shell
status: proposed
module: apps/web
dependencies:
  - P-001
  - P-002
  - P-005
affected_paths:
  - apps/web/src/modules/disease-view/
  - packages/map-hex/
minimal_context:
  - CLAUDE.md
  - apps/web/CLAUDE.md
  - docs/domains/disease-view.md
  - docs/contracts/public-api.md
  - docs/contracts/privacy-aggregation.md
  - docs/decisions/ADR-003-hex-privacy-model.md
plugin_marketplaces_needed:
  - wshobson/agents
fixed_transversal_plugins:
  - claude-mem
required_plugins:
  - javascript-typescript
optional_plugins:
  - frontend-mobile-development
  - performance-testing-review
install_plugins:
  - frontend-mobile-development
remove_plugins_after:
  - frontend-mobile-development
keep_plugins_persistent:
  - javascript-typescript
external_tools_required:
  - rtk
fixed_transversal_agents:
  - transversal-reviewer
  - transversal-contract-guardian
required_agents: []
optional_agents:
  - module-map-hex-specialist
install_agents:
  - module-map-hex-specialist
remove_agents_after: []
keep_agents_persistent:
  - module-map-hex-specialist
fixed_transversal_skills:
  - repo-routing
required_skills:
  - plan-execution
  - validation-checklist
optional_skills:
  - map-hex-contracts
install_skills:
  - map-hex-contracts
remove_skills_after: []
keep_skills_persistent:
  - map-hex-contracts
consult_claude_mem: false
prefer_rtk_for_validation: true
execution_mode: manual
---

## Objective
- Build the public disease page shell that composes map, timeline, KPIs, and disease information.

## Scope
- disease detail page shell
- map/timeline/KPI/info composition
- public aggregated map contracts and rendering boundaries

## Out Of Scope
- premium dashboards
- alerts
- member watch areas

## Risks Or Impacts
- If the disease page consumes raw points instead of aggregate contracts, privacy guarantees break.
- Weak composition boundaries will entangle public and premium surfaces.

## Definition Of Done
- The disease view has a bounded module with map, timeline, KPI, and information surfaces.
- Public rendering rules stay aligned with privacy contracts.
- Premium surfaces remain separable for later dashboard plans.

## Expected Validations
- `./scripts/validate-plan.sh docs/plans/P-006-disease-view-public-intelligence-shell.md`
- `./scripts/validate-resource-inventory.sh docs/plans/P-006-disease-view-public-intelligence-shell.md`

