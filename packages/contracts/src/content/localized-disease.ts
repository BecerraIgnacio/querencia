import type { DiseaseId, DiseaseInfoFields, LocalizedText } from "@querencia/core-domain";

export interface LocalizedDiseaseContent {
  id: DiseaseId;
  slug: string;
  name: LocalizedText;
  summary: LocalizedText;
  affectedSpecies: string[];
  transmissionMethod: LocalizedText;
  contagiousnessLevel: LocalizedText;
  severityLevel: LocalizedText;
  symptoms: LocalizedText;
  productionImpact: LocalizedText;
  notes: LocalizedText;
  sourceReferences: string[];
}

export type LocalizedDiseaseInfoFields = {
  [K in keyof DiseaseInfoFields]: DiseaseInfoFields[K] extends string
    ? LocalizedText
    : DiseaseInfoFields[K] extends string[]
      ? LocalizedText
      : DiseaseInfoFields[K];
};
