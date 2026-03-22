import { describe, it, expect } from "vitest";
import { intensityToLevel, intensityToColor, intensityToOpacity } from "../src/index";

describe("intensityToLevel", () => {
  it("maps 0 to none", () => expect(intensityToLevel(0)).toBe("none"));
  it("maps 0.1 to low", () => expect(intensityToLevel(0.1)).toBe("low"));
  it("maps 0.3 to medium", () => expect(intensityToLevel(0.3)).toBe("medium"));
  it("maps 0.7 to high", () => expect(intensityToLevel(0.7)).toBe("high"));
  it("maps 1 to critical", () => expect(intensityToLevel(1)).toBe("critical"));
});

describe("intensityToColor", () => {
  it("returns a hex color string", () => {
    const color = intensityToColor(0.5);
    expect(color).toMatch(/^#[0-9a-f]{6}$/i);
  });
});

describe("intensityToOpacity", () => {
  it("returns a value between 0 and 1", () => {
    const opacity = intensityToOpacity(0.5);
    expect(opacity).toBeGreaterThan(0);
    expect(opacity).toBeLessThanOrEqual(1);
  });
});
