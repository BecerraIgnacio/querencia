# Ownership

| Area | Owner Type | Notes |
| --- | --- | --- |
| `apps/web/src/modules/*` | feature/module owner | independent UI/domain work |
| `services/pipeline/src/querencia_pipeline/modules/*` | pipeline/module owner | isolated data-stage work |
| `packages/contracts` | shared-base owner | interface changes require explicit coordination |
| `packages/core-domain` | shared-base owner | central vocabulary and invariants |
| `supabase/` | backend/platform owner | auth, schema, RLS, server-side changes |
| `.claude/agents` and `.claude/skills` | runtime/governance owner | protected transversal resources |
| `docs/decisions` and `docs/ops` | architecture/governance owner | canonical decisions and rules |

