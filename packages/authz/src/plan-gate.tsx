import type { PlanName } from "@querencia/core-domain";
import { canAccess } from "./check-entitlement";
import type { PlanEntitlements } from "./entitlements";

interface PlanGateProps {
  planName: PlanName;
  feature: keyof Omit<PlanEntitlements, "planName" | "maxWatchAreas">;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function PlanGate({ planName, feature, children, fallback = null }: PlanGateProps) {
  if (canAccess(planName, feature)) {
    return <>{children}</>;
  }
  return <>{fallback}</>;
}
