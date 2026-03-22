import type { PlanName } from "@querencia/core-domain";

export interface PlanEntitlements {
  planName: PlanName;
  canReport: boolean;
  canSetAlerts: boolean;
  canAccessDashboards: boolean;
  canExport: boolean;
  canManagePortfolios: boolean;
  canReviewSignals: boolean;
  requiresVerifiedVeterinarian: boolean;
  maxWatchAreas: number;
}
