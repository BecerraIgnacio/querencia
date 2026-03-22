import type { NetworkRole, PlanName } from "@querencia/core-domain";

export function coercePlanName(
  rawPlanName: string | null | undefined,
  rawAccessTier?: string | null,
): PlanName {
  const candidate = (rawAccessTier ?? rawPlanName ?? "public").toLowerCase();

  if (candidate === "network" || candidate === "coordinator") {
    return candidate;
  }

  if (candidate === "plus") {
    return "network";
  }

  if (candidate === "pro") {
    return "coordinator";
  }

  return "public";
}

export function coerceNetworkRole(
  rawRole: string | null | undefined,
  planName: PlanName,
): NetworkRole {
  if (
    rawRole === "public" ||
    rawRole === "member" ||
    rawRole === "coordinator"
  ) {
    return rawRole;
  }

  if (planName === "coordinator") {
    return "coordinator";
  }

  if (planName === "network") {
    return "member";
  }

  return "public";
}

export function coerceVerifiedVeterinarian(
  rawFlag: boolean | null | undefined,
  planName: PlanName,
): boolean {
  if (typeof rawFlag === "boolean") {
    return rawFlag;
  }

  return planName === "network";
}
