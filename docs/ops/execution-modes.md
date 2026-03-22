# Execution Modes

## `manual`
- Default mode.
- Use when scope is bounded and a single agent can own the work.

## `agent-team`
- Use only when write scopes are disjoint, contracts are frozen, and worktree isolation is available.

## `ralph-loop`
- Use only for isolated greenfield work with testable completion criteria and a max-iteration cap.
- Never use for architecture decisions, shared contracts, auth/RLS policy, or ambiguous product work.

