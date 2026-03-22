import type { AnimalType, DiseaseId, SupportedLocale } from "@querencia/core-domain";
import type { TimeRange } from "../shared/time-range";

export interface KpiRequest {
  locale: SupportedLocale;
  diseaseId: DiseaseId;
  animalType: AnimalType;
  timeRange: TimeRange;
}

export interface PublicKpiResponse {
  locale: SupportedLocale;
  diseaseId: DiseaseId;
  timeRange: TimeRange;
  totalCases: number;
  affectedRegionCount: number;
  peakIntensity: number;
  trendDirection: "up" | "down" | "stable";
  sourceTotals: {
    officialConfirmed: number;
    verifiedVeterinarian: number;
    publicIntelligence: number;
  };
}
