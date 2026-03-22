# Context Loading

## Standard Read Order
1. `CLAUDE.md`
2. active runnable leaf plan, usually via `./scripts/plan-context.sh M1-001` or another leaf ID
3. files listed in the plan's `read_first`
4. local `CLAUDE.md` for the owned subtree
5. only the domain, contract, ADR, or state files named in `minimal_context`

## Token Discipline
- Do not read the entire `docs/` tree.
- Do not scan the whole repo unless the active plan explicitly owns cross-cutting discovery.
- Prefer narrow inventory lookups over marketplace browsing in-session.
- Do not execute phase or track docs directly.
