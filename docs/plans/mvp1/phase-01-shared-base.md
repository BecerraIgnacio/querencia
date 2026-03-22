---
id: M1-P01
title: MVP1 Phase 01 Shared Base
kind: phase
runnable: false
status: ready
phase: phase-01-shared-base
track: mvp1
depends_on:
  - P-000
child_plans:
  - M1-001
  - M1-002
read_first:
  - CLAUDE.md
  - docs/overview/architecture.md
  - docs/plans/mvp1/index.md
unlocks:
  - M1-P02
  - M1-P03
  - M1-P04
---

## Objective
- Establish the shared vocabulary, entitlement names, and locale primitives that every MVP1 implementation plan depends on.

## Sequencing
- Execute `M1-001` first to define core domain terms, `Free`/`Plus`/`Pro` naming, and locale primitives.
- Execute `M1-002` only after `M1-001` is complete so public/member contracts reuse the same vocabulary and locale model.

## Entry Criteria
- `P-000` is completed.
- Runtime inventories, CLAUDE memories, and plan scripts are stable.

## Exit Criteria
- Core domain vocabulary exists and is stable enough for downstream modules.
- Public and member contract shapes exist and reflect entitlement, privacy, and localization rules.

## Child Plans
- `M1-001`
- `M1-002`
