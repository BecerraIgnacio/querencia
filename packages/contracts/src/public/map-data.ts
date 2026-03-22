import type { AnimalType, DiseaseId, SupportedLocale } from "@querencia/core-domain";
import type { RegionAggregation } from "../shared/region-activity";
import type { TimeRange } from "../shared/time-range";

export interface MapDataRequest {
  locale: SupportedLocale;
  diseaseId: DiseaseId;
  animalType: AnimalType;
  timeRange: TimeRange;
}

export interface MapDataResponse {
  locale: SupportedLocale;
  diseaseId: DiseaseId;
  timeRange: TimeRange;
  regions: RegionAggregation[];
}
