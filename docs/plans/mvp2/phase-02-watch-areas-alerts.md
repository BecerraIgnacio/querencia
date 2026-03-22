---
id: M2-P02
title: MVP2 Phase 02 Watch Areas And Alerts
kind: phase
runnable: false
status: blocked
phase: phase-02-watch-areas-alerts
track: mvp2
depends_on:
  - M1-P04
  - M2-P01
child_plans:
  - M2-004
  - M2-005
  - M2-006
read_first:
  - CLAUDE.md
  - docs/plans/mvp2/index.md
  - docs/domains/reporting-alerts.md
  - docs/domains/auth-and-plans.md
unlocks:
  - M2-P03
---

## Objective
- Add persistent watch areas, alert evaluation, and the bilingual alert experience.

## Sequencing
- Execute `M2-004` first for watch-area persistence.
- Execute `M2-005` only after report integration and watch areas are stable.
- Execute `M2-006` after `M2-005` to consume the stored alert boundary.

## Entry Criteria
- Auth, profile, and `Free` account foundations are complete.
- Reporting boundaries exist.

## Exit Criteria
- Watch areas can be stored and managed.
- Alert rules and alert UI are stable enough for Plus users.

## Child Plans
- `M2-004`
- `M2-005`
- `M2-006`
