---
id: M1-P02
title: MVP1 Phase 02 Public Data
kind: phase
runnable: false
status: blocked
phase: phase-02-public-data
track: mvp1
depends_on:
  - M1-P01
child_plans:
  - M1-003
  - M1-004
read_first:
  - CLAUDE.md
  - services/pipeline/CLAUDE.md
  - docs/domains/data-pipeline.md
  - docs/plans/mvp1/index.md
unlocks:
  - M1-P03
---

## Objective
- Produce privacy-safe aggregated data and locale-ready outputs that the public web can consume without reading raw territorial records.

## Sequencing
- Execute `M1-003` first for ingestion and normalization.
- Execute `M1-004` only after normalized outputs are stable and contract-aligned.

## Entry Criteria
- `M1-001` and `M1-002` are complete.

## Exit Criteria
- Normalized records exist as a stable pipeline stage.
- Geocoding, hex assignment, aggregation, and KPI outputs exist behind shared contracts.
- Downstream public and paid web plans can attach English and Spanish labels without changing the underlying record model.

## Child Plans
- `M1-003`
- `M1-004`
