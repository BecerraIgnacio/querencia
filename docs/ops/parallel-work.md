# Parallel Work

## Protected Shared Areas
- `packages/contracts`
- `packages/core-domain`
- `supabase/`
- `docs/decisions/`
- `docs/ops/`
- root `CLAUDE.md`
- root `.claude/agents/`
- root `.claude/skills/`

## Parallelization Rule
- One plan owns one primary write scope.
- If shared contracts must change, split the work into a shared-base plan first and dependent module plans after.

## Collision Avoidance
- Keep `affected_paths` disjoint across concurrently active plans.
- Use worktree isolation when multiple agents operate in neighboring code.
- Run `comprehensive-review` before merging large cross-stack work.

