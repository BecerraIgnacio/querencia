export interface EvolutionOutlookItem {
  id: string;
  diseaseId: string;
  animalType: string;
  diseaseLabel: { en: string; es: string };
  regionLabel: string;
  horizonDays: number;
  projectedDirection: "up" | "down" | "stable";
  projectedRisk: "critical" | "high" | "medium";
  confidencePercent: number;
  expectedCaseDelta: number;
  driverLabels: Array<{ en: string; es: string }>;
  recommendedAction: { en: string; es: string };
}

export const SEED_EVOLUTION_OUTLOOK: EvolutionOutlookItem[] = [
  {
    id: "evolution-avian-influenza-entre-rios",
    diseaseId: "avian_influenza",
    animalType: "avian",
    diseaseLabel: { en: "Avian Influenza", es: "Influenza Aviar" },
    regionLabel: "Entre Rios",
    horizonDays: 14,
    projectedDirection: "up",
    projectedRisk: "critical",
    confidencePercent: 86,
    expectedCaseDelta: 5,
    driverLabels: [
      { en: "Verified veterinary submissions accelerating", es: "Aceleracion de reportes veterinarios verificados" },
      { en: "Recent increase in affected neighboring regions", es: "Aumento reciente en regiones vecinas afectadas" },
      { en: "High baseline regional intensity", es: "Alta intensidad regional de base" },
    ],
    recommendedAction: {
      en: "Escalate coordinator review and tighten watch-region alert thresholds this week.",
      es: "Escalar la revision coordinadora y endurecer esta semana los umbrales de alerta en regiones vigiladas.",
    },
  },
  {
    id: "evolution-avian-influenza-buenos-aires",
    diseaseId: "avian_influenza",
    animalType: "avian",
    diseaseLabel: { en: "Avian Influenza", es: "Influenza Aviar" },
    regionLabel: "Buenos Aires",
    horizonDays: 14,
    projectedDirection: "up",
    projectedRisk: "high",
    confidencePercent: 79,
    expectedCaseDelta: 4,
    driverLabels: [
      { en: "Sustained veterinary signal density", es: "Densidad sostenida de senales veterinarias" },
      { en: "Persistent cross-region activity", es: "Actividad persistente entre regiones" },
      { en: "Recent official confirmations", es: "Confirmaciones oficiales recientes" },
    ],
    recommendedAction: {
      en: "Prioritize field verification coverage and keep the region on heightened watch.",
      es: "Priorizar cobertura de verificacion en campo y mantener la region en vigilancia reforzada.",
    },
  },
  {
    id: "evolution-newcastle-misiones",
    diseaseId: "newcastle_disease",
    animalType: "avian",
    diseaseLabel: { en: "Newcastle Disease", es: "Enfermedad de Newcastle" },
    regionLabel: "Misiones",
    horizonDays: 14,
    projectedDirection: "stable",
    projectedRisk: "medium",
    confidencePercent: 73,
    expectedCaseDelta: 0,
    driverLabels: [
      { en: "Stable official signal profile", es: "Perfil de senal oficial estable" },
      { en: "Lower week-over-week spread velocity", es: "Menor velocidad de propagacion semana contra semana" },
      { en: "Contained watch-region overlap", es: "Solapamiento contenido entre regiones vigiladas" },
    ],
    recommendedAction: {
      en: "Maintain monitoring cadence and verify any new veterinary signal before escalating alerts.",
      es: "Mantener la cadencia de monitoreo y verificar toda nueva senal veterinaria antes de escalar alertas.",
    },
  },
];
