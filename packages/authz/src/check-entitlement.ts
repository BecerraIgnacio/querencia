import type { PlanName } from "@querencia/core-domain";
import { PLAN_ENTITLEMENTS } from "./entitlements";
import type { PlanEntitlements } from "./entitlements";

export function getEntitlements(planName: PlanName): PlanEntitlements {
  return PLAN_ENTITLEMENTS[planName];
}

export function checkEntitlement<K extends keyof PlanEntitlements>(
  planName: PlanName,
  feature: K,
): PlanEntitlements[K] {
  return PLAN_ENTITLEMENTS[planName][feature];
}

export function canAccess(planName: PlanName, feature: keyof Omit<PlanEntitlements, "planName" | "maxWatchAreas">): boolean {
  return PLAN_ENTITLEMENTS[planName][feature] as boolean;
}
