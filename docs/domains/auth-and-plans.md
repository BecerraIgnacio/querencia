# Auth And Access

## Auth
- Use Supabase Auth with Google login.
- Profiles store access tier, network context, verification state, user settings, and `preferredLocale`.

## Authorization
- Entitlements are organization-access-driven.
- Alerts, watch areas, dashboards, and exports are not public capabilities.
- Public, network, and coordinator access tiers use the same entitlement vocabulary across UI, contracts, and backend rules.

## Shared Responsibilities
- `supabase/`: auth, persistence, RLS, server-side policies
- `packages/authz`: reusable entitlement semantics
- `apps/web`: UI gating and account surfaces
