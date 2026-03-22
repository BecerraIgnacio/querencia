import type { PrivacyLevel, RegionId } from "@querencia/core-domain";

export type RegionAdminLevel = "country" | "province" | "state" | "district";
export type ActivityConfidence = "low" | "medium" | "high";

export interface Region {
  id: RegionId;
  label: string;
  adminLevel: RegionAdminLevel;
  countryCode: string;
  centroidLat: number | null;
  centroidLng: number | null;
}

export interface RegionAggregation {
  id: RegionId;
  label: string;
  adminLevel: RegionAdminLevel;
  caseCount: number;
  intensity: number;
  privacyLevel: PrivacyLevel;
  confidence: ActivityConfidence;
  isDelayed: boolean;
  lastReportedAt: string | null;
  sourceMix: {
    officialConfirmed: number;
    verifiedVeterinarian: number;
    publicIntelligence: number;
  };
}
