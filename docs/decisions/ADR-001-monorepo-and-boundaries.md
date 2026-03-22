# ADR-001: Monorepo And Boundaries

## Status
- accepted

## Decision
- Querencia uses a monorepo with `apps/`, `services/`, `packages/`, `supabase/`, `docs/`, and `.claude/`.

## Why
- Claude Code performs better when shared context is thin and write scopes are explicit.
- Web, pipeline, and shared-base work need clean ownership boundaries.

## Consequences
- Shared packages and runtime rules are protected.
- Plans must own a bounded write scope before implementation begins.

