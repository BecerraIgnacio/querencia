import type { AnimalType, DiseaseId, SupportedLocale } from "@querencia/core-domain";

export interface DiseaseListRequest {
  locale: SupportedLocale;
  animalType: AnimalType;
}

export interface DiseaseSummary {
  id: DiseaseId;
  slug: string;
  name: string;
  summary: string;
  severityLevel: string;
  animalType: AnimalType;
}

export interface DiseaseListResponse {
  locale: SupportedLocale;
  animalType: AnimalType;
  diseases: DiseaseSummary[];
}
