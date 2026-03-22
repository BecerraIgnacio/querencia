# Core Rules

## Always
- Start from the root `CLAUDE.md`.
- Read the active plan before editing.
- Execute only runnable leaf plans.
- Load only the context named in `read_first`, `minimal_context`, and local `CLAUDE.md` files.
- Keep shared contracts, ADRs, runtime rules, and transversal Claude resources stable.

## Never
- Treat `claude-mem` as the source of truth.
- Install unrelated plugins just because they are available.
- Edit protected shared areas from a normal feature plan.
- Treat phase or track docs as execution targets.

## Default Tooling
- Prefer `rtk` for noisy Bash output.
- Prefer repo-local docs and inventories over external references after initial setup.
