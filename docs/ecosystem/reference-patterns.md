# Reference Patterns

## Patterns Adopted
- progressive disclosure for skills
- narrow, composable plugins instead of plugin sprawl
- search-first and verification-first execution
- runtime hook awareness and context discipline
- explicit multi-agent isolation for parallel work

## Sources
- `wshobson/agents`: granular plugin installation and composability
- `affaan-m/everything-claude-code`: language-split rules, verification loops, context discipline
- Ralph Wiggum plugin: looped execution only for bounded, test-rich isolated work

## Patterns Rejected
- permanently installing broad plugin bundles with overlapping responsibilities
- using memory tools as authoritative documentation
- using looped execution for governance or architecture decisions

