export type AccessTier = "public" | "network" | "coordinator";

// Backwards-compatible alias kept while the codebase migrates from consumer plans
// to organization access tiers.
export type PlanName = AccessTier;

export type NetworkRole = "public" | "member" | "coordinator";

export const ACCESS_TIERS: readonly AccessTier[] = [
  "public",
  "network",
  "coordinator",
] as const;

export const PLAN_NAMES: readonly PlanName[] = ACCESS_TIERS;
