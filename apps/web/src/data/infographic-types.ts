import type { DiseaseId } from "@querencia/core-domain";
import type { LocalizedText } from "@querencia/core-domain";

export interface DiseaseScores {
  transmissibility: number; // 1-5
  severity: number;
  mortality: number;
  productiveImpact: number;
  spreadSpeed: number;
  controlDifficulty: number;
}

export interface RiskBar {
  key: string;
  label: LocalizedText;
  value: number; // 1-5
}

export interface WeightedSymptom {
  label: LocalizedText;
  weight: number; // 0-1
}

export interface AffectedZone {
  id: string;
  label: LocalizedText;
  position: { x: number; y: number }; // percentages 0-100
}

export interface TransmissionRoute {
  label: LocalizedText;
}

export interface PreventionMeasure {
  label: LocalizedText;
}

export interface ResponseItem {
  category: LocalizedText;
  description: LocalizedText;
}

export interface InfographicDiseaseData {
  diseaseId: DiseaseId;
  scores: DiseaseScores;
  riskBars: RiskBar[];
  symptoms: WeightedSymptom[];
  affectedZones: AffectedZone[];
  transmissionRoutes: TransmissionRoute[];
  prevention: PreventionMeasure[];
  responseItems: ResponseItem[];
  zoonotic: boolean;
  mandatoryNotification: boolean;
}
