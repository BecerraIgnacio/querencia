import type { PlanName } from "@querencia/core-domain";
import type { PlanEntitlements } from "@querencia/contracts";

export type { PlanEntitlements };

export const PLAN_ENTITLEMENTS: Record<PlanName, PlanEntitlements> = {
  public: {
    planName: "public",
    canReport: false,
    canSetAlerts: false,
    canAccessDashboards: false,
    canExport: false,
    canManagePortfolios: false,
    canReviewSignals: false,
    requiresVerifiedVeterinarian: true,
    maxWatchAreas: 0,
  },
  network: {
    planName: "network",
    canReport: true,
    canSetAlerts: true,
    canAccessDashboards: true,
    canExport: false,
    canManagePortfolios: false,
    canReviewSignals: false,
    requiresVerifiedVeterinarian: true,
    maxWatchAreas: 6,
  },
  coordinator: {
    planName: "coordinator",
    canReport: true,
    canSetAlerts: true,
    canAccessDashboards: true,
    canExport: true,
    canManagePortfolios: true,
    canReviewSignals: true,
    requiresVerifiedVeterinarian: false,
    maxWatchAreas: 24,
  },
};
