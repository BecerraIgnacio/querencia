---
id: M3-P01
title: MVP3 Phase 01 Multi-Area Monitoring
kind: phase
runnable: false
status: blocked
phase: phase-01-multi-area-monitoring
track: mvp3
depends_on:
  - M2-P03
child_plans:
  - M3-001
  - M3-002
read_first:
  - CLAUDE.md
  - docs/plans/mvp3/index.md
  - docs/domains/reporting-alerts.md
  - docs/domains/auth-and-plans.md
unlocks:
  - M3-P02
  - M3-P03
---

## Objective
- Add the higher-tier monitoring model for multiple saved areas.

## Sequencing
- Execute `M3-001` first for portfolio persistence and contracts.
- Execute `M3-002` after `M3-001` so the workspace UI uses the stable monitoring model.

## Entry Criteria
- `Plus` dashboards and watch-area boundaries are complete.

## Exit Criteria
- Multi-area monitoring exists in both persistence and UI form.

## Child Plans
- `M3-001`
- `M3-002`
