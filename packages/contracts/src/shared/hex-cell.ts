import type { HexCellId, PrivacyLevel } from "@querencia/core-domain";

export interface HexCell {
  id: HexCellId;
  centerLat: number;
  centerLng: number;
  resolution: number;
}

export interface AggregatedHexCell {
  id: HexCellId;
  centerLat: number;
  centerLng: number;
  resolution: number;
  caseCount: number;
  intensity: number; // 0–1 normalized
  privacyLevel: PrivacyLevel;
}
