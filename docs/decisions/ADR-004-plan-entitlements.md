# ADR-004: Organization Access Tiers

## Status
- accepted

## Decision
- Product capability is gated by organization access tier: `public`, `network`, `coordinator`.
- Locale handling is cross-cutting: all user-facing entitlement surfaces must be available in English and Spanish.

## Why
- The product is sold as organization SaaS for veterinary networks, not as self-serve consumer plan upsells.

## Consequences
- UI, API, and analytics logic use a shared entitlement vocabulary.
- Profile and settings flows must persist `preferredLocale`.
- Access-tier changes should coordinate `packages/authz`, `apps/web`, and `supabase/` explicitly.
