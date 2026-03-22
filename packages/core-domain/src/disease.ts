export type DiseaseId = string & { readonly __diseaseIdBrand: void };

export function makeDiseaseId(id: string): DiseaseId {
  return id as DiseaseId;
}

export interface DiseaseInfoFields {
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
