import type { AnimalType, DiseaseId, SupportedLocale } from "@querencia/core-domain";

export interface DiseaseDetailRequest {
  locale: SupportedLocale;
  diseaseId: DiseaseId;
}

export interface DiseaseDetail {
  id: DiseaseId;
  slug: string;
  animalType: AnimalType;
  name: string;
  summary: string;
  affectedSpecies: string[];
  transmissionMethod: string;
  contagiousnessLevel: string;
  severityLevel: string;
  symptoms: string[];
  productionImpact: string;
  notes: string;
  sourceReferences: string[];
}

export interface DiseaseDetailResponse {
  locale: SupportedLocale;
  disease: DiseaseDetail;
}
