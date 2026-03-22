export interface DiseaseRanking {
  diseaseKey: string;
  animalType: string;
  rank: number;
  totalCases: number;
  affectedRegionCount: number;
  velocity: number;
  severityScore: number;
}

export interface CriticalZone {
  regionName: string;
  diseaseKey: string;
  animalType: string;
  caseCount: number;
  intensity: number;
  isHotspot: boolean;
  rank: number;
}

export interface ExecutiveSnapshot {
  animalType: string;
  timeBucket: string;
  bucketStart: string;
  bucketEnd: string;
  totalDiseasesActive: number;
  totalCases: number;
  totalAffectedRegions: number;
  topDiseases: DiseaseRanking[];
  criticalZones: CriticalZone[];
  overallTrend: string;
}

const bovineRankings: DiseaseRanking[] = [
  { diseaseKey: "fmd", animalType: "bovine", rank: 1, totalCases: 67, affectedRegionCount: 4, velocity: 2.8, severityScore: 0.91 },
  { diseaseKey: "brucellosis", animalType: "bovine", rank: 2, totalCases: 43, affectedRegionCount: 3, velocity: 0.2, severityScore: 0.72 },
  { diseaseKey: "bovine_tuberculosis", animalType: "bovine", rank: 3, totalCases: 23, affectedRegionCount: 2, velocity: -1.1, severityScore: 0.58 },
];

const bovineZones: CriticalZone[] = [
  { regionName: "Buenos Aires", diseaseKey: "fmd", animalType: "bovine", caseCount: 14, intensity: 1.0, isHotspot: true, rank: 1 },
  { regionName: "Santa Fe", diseaseKey: "fmd", animalType: "bovine", caseCount: 11, intensity: 0.79, isHotspot: true, rank: 2 },
  { regionName: "Cordoba", diseaseKey: "brucellosis", animalType: "bovine", caseCount: 10, intensity: 0.8, isHotspot: true, rank: 3 },
  { regionName: "Entre Rios", diseaseKey: "fmd", animalType: "bovine", caseCount: 9, intensity: 0.64, isHotspot: false, rank: 4 },
];

const porcineRankings: DiseaseRanking[] = [
  { diseaseKey: "african_swine_fever", animalType: "porcine", rank: 1, totalCases: 44, affectedRegionCount: 2, velocity: 4.1, severityScore: 0.94 },
  { diseaseKey: "prrsv", animalType: "porcine", rank: 2, totalCases: 26, affectedRegionCount: 2, velocity: 0.3, severityScore: 0.67 },
];

const porcineZones: CriticalZone[] = [
  { regionName: "Chaco", diseaseKey: "african_swine_fever", animalType: "porcine", caseCount: 12, intensity: 1.0, isHotspot: true, rank: 1 },
  { regionName: "Formosa", diseaseKey: "african_swine_fever", animalType: "porcine", caseCount: 9, intensity: 0.75, isHotspot: true, rank: 2 },
  { regionName: "Buenos Aires", diseaseKey: "prrsv", animalType: "porcine", caseCount: 8, intensity: 1.0, isHotspot: true, rank: 3 },
];

const avianRankings: DiseaseRanking[] = [
  { diseaseKey: "avian_influenza", animalType: "avian", rank: 1, totalCases: 64, affectedRegionCount: 4, velocity: 5.2, severityScore: 0.97 },
  { diseaseKey: "newcastle_disease", animalType: "avian", rank: 2, totalCases: 32, affectedRegionCount: 2, velocity: -1.8, severityScore: 0.76 },
];

const avianZones: CriticalZone[] = [
  { regionName: "Entre Rios", diseaseKey: "avian_influenza", animalType: "avian", caseCount: 16, intensity: 1.0, isHotspot: true, rank: 1 },
  { regionName: "Buenos Aires", diseaseKey: "avian_influenza", animalType: "avian", caseCount: 13, intensity: 0.81, isHotspot: true, rank: 2 },
  { regionName: "Santa Fe", diseaseKey: "avian_influenza", animalType: "avian", caseCount: 10, intensity: 0.63, isHotspot: true, rank: 3 },
  { regionName: "Misiones", diseaseKey: "newcastle_disease", animalType: "avian", caseCount: 9, intensity: 1.0, isHotspot: true, rank: 4 },
];

export const SEED_EXECUTIVE_SNAPSHOTS: ExecutiveSnapshot[] = [
  {
    animalType: "bovine",
    timeBucket: "month",
    bucketStart: "2024-06-01",
    bucketEnd: "2024-06-30",
    totalDiseasesActive: 3,
    totalCases: 133,
    totalAffectedRegions: 4,
    topDiseases: bovineRankings,
    criticalZones: bovineZones,
    overallTrend: "down",
  },
  {
    animalType: "porcine",
    timeBucket: "month",
    bucketStart: "2024-06-01",
    bucketEnd: "2024-06-30",
    totalDiseasesActive: 2,
    totalCases: 70,
    totalAffectedRegions: 3,
    topDiseases: porcineRankings,
    criticalZones: porcineZones,
    overallTrend: "up",
  },
  {
    animalType: "avian",
    timeBucket: "month",
    bucketStart: "2024-06-01",
    bucketEnd: "2024-06-30",
    totalDiseasesActive: 2,
    totalCases: 96,
    totalAffectedRegions: 4,
    topDiseases: avianRankings,
    criticalZones: avianZones,
    overallTrend: "up",
  },
];
