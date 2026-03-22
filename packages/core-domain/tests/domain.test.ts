import { describe, it, expect } from "vitest";
import {
  ANIMAL_TYPES,
  DEFAULT_LOCALE,
  PLAN_NAMES,
  MIN_ANONYMITY_THRESHOLD,
  makeDiseaseId,
  makeTerritoryId,
  makeRegionId,
  ACCESS_TIERS,
  makeAggregationKey,
} from "../src/index";

describe("ANIMAL_TYPES", () => {
  it("contains all three animal types", () => {
    expect(ANIMAL_TYPES).toContain("bovine");
    expect(ANIMAL_TYPES).toContain("porcine");
    expect(ANIMAL_TYPES).toContain("avian");
    expect(ANIMAL_TYPES).toHaveLength(3);
  });
});

describe("locale", () => {
  it("DEFAULT_LOCALE is es", () => {
    expect(DEFAULT_LOCALE).toBe("es");
  });
});

describe("PLAN_NAMES", () => {
  it("contains public, network, and coordinator", () => {
    expect(PLAN_NAMES).toContain("public");
    expect(PLAN_NAMES).toContain("network");
    expect(PLAN_NAMES).toContain("coordinator");
    expect(PLAN_NAMES).toHaveLength(3);
  });
});

describe("ACCESS_TIERS", () => {
  it("mirrors plan names during the migration", () => {
    expect(ACCESS_TIERS).toEqual(PLAN_NAMES);
  });
});

describe("privacy", () => {
  it("MIN_ANONYMITY_THRESHOLD is 3", () => {
    expect(MIN_ANONYMITY_THRESHOLD).toBe(3);
  });
});

describe("branded constructors", () => {
  it("makeDiseaseId returns the input value", () => {
    expect(makeDiseaseId("fmd")).toBe("fmd");
  });

  it("makeTerritoryId returns the input value", () => {
    expect(makeTerritoryId("AR-B")).toBe("AR-B");
  });

  it("makeRegionId returns the input value", () => {
    expect(makeRegionId("AR-B")).toBe("AR-B");
  });

  it("makeAggregationKey builds colon-separated key", () => {
    expect(makeAggregationKey("fmd", "AR-B", "week")).toBe(
      "fmd:AR-B:week",
    );
  });
});
