import type { LocalizedText } from "@querencia/core-domain";

export interface AnimalTypeLabels {
  bovine: LocalizedText;
  porcine: LocalizedText;
  avian: LocalizedText;
}

export interface SeverityLabels {
  low: LocalizedText;
  medium: LocalizedText;
  high: LocalizedText;
  critical: LocalizedText;
}

export interface PlanLabels {
  free: LocalizedText;
  plus: LocalizedText;
  pro: LocalizedText;
}

export const ANIMAL_TYPE_LABELS: AnimalTypeLabels = {
  bovine: { en: "Bovine", es: "Bovino" },
  porcine: { en: "Porcine", es: "Porcino" },
  avian: { en: "Avian", es: "Aviar" },
};

export const PLAN_LABELS: PlanLabels = {
  free: { en: "Free", es: "Gratuito" },
  plus: { en: "Plus", es: "Plus" },
  pro: { en: "Pro", es: "Pro" },
};
