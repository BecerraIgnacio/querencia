# Querencia

Querencia is a bilingual veterinary surveillance platform focused on avian disease reporting, regional risk visibility, and response coordination.

The current product is designed around veterinarians:

- confidential avian signal intake
- disease intelligence briefs
- regional outbreak mapping
- alerting and watch regions
- response dashboards for veterinary networks

## Stack

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- pnpm workspaces
- Turbo monorepo

## Monorepo Layout

- `apps/web`: main Next.js application
- `packages/core-domain`: shared domain types and helpers
- `packages/contracts`: shared API and UI contracts
- `packages/authz`: plan and entitlement logic
- `packages/map-hex`: hex and territory utilities
- `services/pipeline`: Python data pipeline modules

## Local Development

From the repo root:

```bash
pnpm install
pnpm --filter @querencia/web dev
```

Open:

```text
http://localhost:3000
```

Useful routes:

- `/en`
- `/en/avian`
- `/en/avian/avian_influenza`
- `/en/report`
- `/en/dashboard`
- `/en/monitoring`

## Environment Variables

Create `apps/web/.env.local` with:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_DEMO_MODE=false
```

Reference template:

- `apps/web/.env.example`

## Build

```bash
pnpm turbo build
```

## Vercel

Recommended Vercel settings:

- Framework Preset: `Next.js`
- Root Directory: `apps/web`
- Install Command: `pnpm install --frozen-lockfile`
- Build Command: `cd ../.. && pnpm turbo build --filter=@querencia/web...`
- Output Directory: `.next`

Environment variables required in Vercel:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_DEMO_MODE`

## Current Product Direction

Querencia is being shaped as a biotech and veterinary intelligence product rather than a generic dashboard. The strongest current workflow is:

1. a verified veterinarian reports an avian signal
2. the system preserves privacy through regional aggregation
3. disease context and risk views support triage
4. alerts and response boards help networks coordinate follow-up

## Status

This repository currently contains the web app, shared TypeScript packages, and the Python pipeline modules. Local Supabase project scaffolding has been removed for now.
