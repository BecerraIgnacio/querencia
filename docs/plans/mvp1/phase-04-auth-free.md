---
id: M1-P04
title: MVP1 Phase 04 Auth And Free
kind: phase
runnable: false
status: blocked
phase: phase-04-auth-free
track: mvp1
depends_on:
  - M1-P01
child_plans:
  - M1-009
  - M1-010
read_first:
  - CLAUDE.md
  - apps/web/CLAUDE.md
  - docs/domains/auth-and-plans.md
  - docs/plans/mvp1/index.md
unlocks:
  - M2-T01
---

## Objective
- Add the minimum account, locale, and entitlement shell needed to evolve `Free` into paid plan tiers later.

## Sequencing
- Execute `M1-009` first for auth and profile foundations.
- Execute `M1-010` only after member and entitlement contracts plus profile state are stable.

## Entry Criteria
- `M1-001` is complete for shared entitlement vocabulary.
- `M1-002` is complete before `M1-010`.

## Exit Criteria
- Google auth and profile foundation exist.
- `Free` account and entitlement shell exist without pulling in later paid-tier features.
- Preferred locale can be persisted for later multilingual account and alert work.

## Child Plans
- `M1-009`
- `M1-010`
