---
id: M1-P03
title: MVP1 Phase 03 Public Web
kind: phase
runnable: false
status: blocked
phase: phase-03-public-web
track: mvp1
depends_on:
  - M1-P01
  - M1-P02
child_plans:
  - M1-005
  - M1-006
  - M1-007
  - M1-008
read_first:
  - CLAUDE.md
  - apps/web/CLAUDE.md
  - docs/domains/public-exploration.md
  - docs/domains/disease-view.md
  - docs/plans/mvp1/index.md
unlocks:
  - M1-P04
---

## Objective
- Build the public `Free` browsing flow from landing page through bilingual disease intelligence surfaces.

## Sequencing
- Execute `M1-005` before `M1-006` so locale routing and switching are stable before catalog work.
- Execute `M1-006` before `M1-007`.
- Execute `M1-008` only after both disease-detail shell and public aggregation outputs are complete.

## Entry Criteria
- `M1-001` and `M1-002` are complete.
- `M1-004` is complete before `M1-008` begins.

## Exit Criteria
- Public users can browse animal types, disease catalog, disease detail, and public intelligence surfaces through stable module boundaries in English and Spanish.

## Child Plans
- `M1-005`
- `M1-006`
- `M1-007`
- `M1-008`
