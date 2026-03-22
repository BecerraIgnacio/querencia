# Repo Map

Use this file to route quickly without reading the whole repository.

| Change Type | Start Here | Then Read |
| --- | --- | --- |
| Product framing | `docs/overview/product.md` | relevant domain docs |
| Architecture or boundaries | `docs/overview/architecture.md` | ADRs and governance docs |
| Web feature | `apps/web/CLAUDE.md` | domain + contract docs for the feature |
| Pipeline feature | `services/pipeline/CLAUDE.md` | `docs/domains/data-pipeline.md` |
| Auth, plans, RLS, schema | `supabase/` | `docs/domains/auth-and-plans.md`, ADRs |
| Plan execution | `docs/plans/index.md` | specific runnable leaf under `docs/plans/mvp1/...`, `mvp2/...`, `mvp3/...`, or `mvp4/...` |
| Runtime/plugin policy | `docs/ops/runtime-baseline.md` | `docs/ops/plugin-policy.md` |
| Agent/skill inventory | `.claude/inventories/*.yaml` | related plan |
