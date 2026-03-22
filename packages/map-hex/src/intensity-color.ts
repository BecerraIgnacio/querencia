import type { IntensityLevel } from "./types";

const INTENSITY_COLORS: Record<IntensityLevel, string> = {
  none: "#e5e7eb",
  low: "#fef9c3",
  medium: "#fde68a",
  high: "#f97316",
  critical: "#dc2626",
};

const INTENSITY_OPACITY: Record<IntensityLevel, number> = {
  none: 0.1,
  low: 0.4,
  medium: 0.6,
  high: 0.75,
  critical: 0.9,
};

export function intensityToLevel(intensity: number): IntensityLevel {
  if (intensity <= 0) return "none";
  if (intensity < 0.2) return "low";
  if (intensity < 0.5) return "medium";
  if (intensity < 0.8) return "high";
  return "critical";
}

export function intensityToColor(intensity: number): string {
  return INTENSITY_COLORS[intensityToLevel(intensity)];
}

export function intensityToOpacity(intensity: number): number {
  return INTENSITY_OPACITY[intensityToLevel(intensity)];
}
