# Runtime Baseline

## Marketplaces To Register
```bash
/plugin marketplace add wshobson/agents
/plugin marketplace add anthropics/skills
/plugin marketplace add thedotmack/claude-mem
```

## Fixed Transversal Plugin
```bash
/plugin install claude-mem
```

- `claude-mem` is permanent and supports cross-session retrieval.
- Use `<private>` for prompts or data that must not enter memory.
- Do not use memory results as the canonical architecture or plan record.

## Fixed Transversal Tool
```bash
brew install rtk
rtk init --global
```

- `rtk` compresses Bash command output such as `git`, tests, logs, `rg`, and builds.
- RTK only rewrites Bash tool calls. Built-in `Read`, `Grep`, and `Glob` do not pass through it.
- For large file or search output, prefer shell wrappers or explicit `rtk` commands.

## Temporary Plugin Cleanup
- Remove plan-temporary plugins at plan end unless the plan explicitly promotes them to module-persistent.
- Reflect the new state in `.claude/inventories/plugins.yaml` and `docs/state/current.md`.

