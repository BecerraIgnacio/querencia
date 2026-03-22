import { describe, it, expect } from "vitest";
import { PLAN_ENTITLEMENTS, getEntitlements, canAccess } from "../src/index";

describe("PLAN_ENTITLEMENTS", () => {
  it("public access is read-only", () => {
    const publicTier = PLAN_ENTITLEMENTS.public;
    expect(publicTier.canReport).toBe(false);
    expect(publicTier.canSetAlerts).toBe(false);
    expect(publicTier.canAccessDashboards).toBe(false);
    expect(publicTier.canExport).toBe(false);
    expect(publicTier.maxWatchAreas).toBe(0);
  });

  it("network access can report and monitor regions", () => {
    const network = PLAN_ENTITLEMENTS.network;
    expect(network.canReport).toBe(true);
    expect(network.canSetAlerts).toBe(true);
    expect(network.canAccessDashboards).toBe(true);
    expect(network.canExport).toBe(false);
    expect(network.requiresVerifiedVeterinarian).toBe(true);
  });

  it("coordinator access has review and export features", () => {
    const coordinator = PLAN_ENTITLEMENTS.coordinator;
    expect(coordinator.canReport).toBe(true);
    expect(coordinator.canExport).toBe(true);
    expect(coordinator.canReviewSignals).toBe(true);
    expect(coordinator.maxWatchAreas).toBeGreaterThan(0);
  });
});

describe("getEntitlements", () => {
  it("returns the correct access entitlements", () => {
    expect(getEntitlements("public").planName).toBe("public");
    expect(getEntitlements("network").planName).toBe("network");
    expect(getEntitlements("coordinator").planName).toBe("coordinator");
  });
});

describe("canAccess", () => {
  it("public users cannot access operational dashboards", () => {
    expect(canAccess("public", "canAccessDashboards")).toBe(false);
  });

  it("coordinators can export", () => {
    expect(canAccess("coordinator", "canExport")).toBe(true);
  });
});
