export interface TrendPoint {
  diseaseKey: string;
  animalType: string;
  timeBucket: string;
  bucketStart: string;
  bucketEnd: string;
  totalCases: number;
  affectedRegionCount: number;
  peakIntensity: number;
}

export interface TrendSeries {
  diseaseKey: string;
  animalType: string;
  timeBucket: string;
  points: TrendPoint[];
  periodCount: number;
  overallTrend: string;
  totalCasesSum: number;
  peakIntensityMax: number;
}

const fmdPoints: TrendPoint[] = [
  { diseaseKey: "fmd", animalType: "bovine", timeBucket: "month", bucketStart: "2024-01-01", bucketEnd: "2024-01-31", totalCases: 5, affectedRegionCount: 2, peakIntensity: 0.4 },
  { diseaseKey: "fmd", animalType: "bovine", timeBucket: "month", bucketStart: "2024-02-01", bucketEnd: "2024-02-29", totalCases: 9, affectedRegionCount: 3, peakIntensity: 0.6 },
  { diseaseKey: "fmd", animalType: "bovine", timeBucket: "month", bucketStart: "2024-03-01", bucketEnd: "2024-03-31", totalCases: 14, affectedRegionCount: 4, peakIntensity: 0.85 },
  { diseaseKey: "fmd", animalType: "bovine", timeBucket: "month", bucketStart: "2024-04-01", bucketEnd: "2024-04-30", totalCases: 18, affectedRegionCount: 4, peakIntensity: 1.0 },
  { diseaseKey: "fmd", animalType: "bovine", timeBucket: "month", bucketStart: "2024-05-01", bucketEnd: "2024-05-31", totalCases: 12, affectedRegionCount: 3, peakIntensity: 0.7 },
  { diseaseKey: "fmd", animalType: "bovine", timeBucket: "month", bucketStart: "2024-06-01", bucketEnd: "2024-06-30", totalCases: 9, affectedRegionCount: 3, peakIntensity: 0.55 },
];

const brucellosisPoints: TrendPoint[] = [
  { diseaseKey: "brucellosis", animalType: "bovine", timeBucket: "month", bucketStart: "2024-01-01", bucketEnd: "2024-01-31", totalCases: 6, affectedRegionCount: 2, peakIntensity: 0.5 },
  { diseaseKey: "brucellosis", animalType: "bovine", timeBucket: "month", bucketStart: "2024-02-01", bucketEnd: "2024-02-29", totalCases: 7, affectedRegionCount: 3, peakIntensity: 0.55 },
  { diseaseKey: "brucellosis", animalType: "bovine", timeBucket: "month", bucketStart: "2024-03-01", bucketEnd: "2024-03-31", totalCases: 8, affectedRegionCount: 3, peakIntensity: 0.65 },
  { diseaseKey: "brucellosis", animalType: "bovine", timeBucket: "month", bucketStart: "2024-04-01", bucketEnd: "2024-04-30", totalCases: 9, affectedRegionCount: 3, peakIntensity: 0.8 },
  { diseaseKey: "brucellosis", animalType: "bovine", timeBucket: "month", bucketStart: "2024-05-01", bucketEnd: "2024-05-31", totalCases: 7, affectedRegionCount: 2, peakIntensity: 0.6 },
  { diseaseKey: "brucellosis", animalType: "bovine", timeBucket: "month", bucketStart: "2024-06-01", bucketEnd: "2024-06-30", totalCases: 6, affectedRegionCount: 2, peakIntensity: 0.5 },
];

const bovineTbPoints: TrendPoint[] = [
  { diseaseKey: "bovine_tuberculosis", animalType: "bovine", timeBucket: "month", bucketStart: "2024-01-01", bucketEnd: "2024-01-31", totalCases: 5, affectedRegionCount: 1, peakIntensity: 0.55 },
  { diseaseKey: "bovine_tuberculosis", animalType: "bovine", timeBucket: "month", bucketStart: "2024-02-01", bucketEnd: "2024-02-29", totalCases: 4, affectedRegionCount: 1, peakIntensity: 0.5 },
  { diseaseKey: "bovine_tuberculosis", animalType: "bovine", timeBucket: "month", bucketStart: "2024-03-01", bucketEnd: "2024-03-31", totalCases: 5, affectedRegionCount: 2, peakIntensity: 0.6 },
  { diseaseKey: "bovine_tuberculosis", animalType: "bovine", timeBucket: "month", bucketStart: "2024-04-01", bucketEnd: "2024-04-30", totalCases: 4, affectedRegionCount: 2, peakIntensity: 0.55 },
  { diseaseKey: "bovine_tuberculosis", animalType: "bovine", timeBucket: "month", bucketStart: "2024-05-01", bucketEnd: "2024-05-31", totalCases: 3, affectedRegionCount: 1, peakIntensity: 0.45 },
  { diseaseKey: "bovine_tuberculosis", animalType: "bovine", timeBucket: "month", bucketStart: "2024-06-01", bucketEnd: "2024-06-30", totalCases: 2, affectedRegionCount: 1, peakIntensity: 0.35 },
];

const asfPoints: TrendPoint[] = [
  { diseaseKey: "african_swine_fever", animalType: "porcine", timeBucket: "month", bucketStart: "2024-01-01", bucketEnd: "2024-01-31", totalCases: 3, affectedRegionCount: 1, peakIntensity: 0.3 },
  { diseaseKey: "african_swine_fever", animalType: "porcine", timeBucket: "month", bucketStart: "2024-02-01", bucketEnd: "2024-02-29", totalCases: 5, affectedRegionCount: 2, peakIntensity: 0.45 },
  { diseaseKey: "african_swine_fever", animalType: "porcine", timeBucket: "month", bucketStart: "2024-03-01", bucketEnd: "2024-03-31", totalCases: 7, affectedRegionCount: 2, peakIntensity: 0.6 },
  { diseaseKey: "african_swine_fever", animalType: "porcine", timeBucket: "month", bucketStart: "2024-04-01", bucketEnd: "2024-04-30", totalCases: 9, affectedRegionCount: 2, peakIntensity: 0.75 },
  { diseaseKey: "african_swine_fever", animalType: "porcine", timeBucket: "month", bucketStart: "2024-05-01", bucketEnd: "2024-05-31", totalCases: 10, affectedRegionCount: 2, peakIntensity: 0.88 },
  { diseaseKey: "african_swine_fever", animalType: "porcine", timeBucket: "month", bucketStart: "2024-06-01", bucketEnd: "2024-06-30", totalCases: 10, affectedRegionCount: 2, peakIntensity: 1.0 },
];

const prrsPoints: TrendPoint[] = [
  { diseaseKey: "prrsv", animalType: "porcine", timeBucket: "month", bucketStart: "2024-01-01", bucketEnd: "2024-01-31", totalCases: 4, affectedRegionCount: 1, peakIntensity: 0.45 },
  { diseaseKey: "prrsv", animalType: "porcine", timeBucket: "month", bucketStart: "2024-02-01", bucketEnd: "2024-02-29", totalCases: 5, affectedRegionCount: 2, peakIntensity: 0.55 },
  { diseaseKey: "prrsv", animalType: "porcine", timeBucket: "month", bucketStart: "2024-03-01", bucketEnd: "2024-03-31", totalCases: 5, affectedRegionCount: 2, peakIntensity: 0.6 },
  { diseaseKey: "prrsv", animalType: "porcine", timeBucket: "month", bucketStart: "2024-04-01", bucketEnd: "2024-04-30", totalCases: 4, affectedRegionCount: 2, peakIntensity: 0.5 },
  { diseaseKey: "prrsv", animalType: "porcine", timeBucket: "month", bucketStart: "2024-05-01", bucketEnd: "2024-05-31", totalCases: 4, affectedRegionCount: 1, peakIntensity: 0.5 },
  { diseaseKey: "prrsv", animalType: "porcine", timeBucket: "month", bucketStart: "2024-06-01", bucketEnd: "2024-06-30", totalCases: 4, affectedRegionCount: 1, peakIntensity: 0.45 },
];

const avianFluPoints: TrendPoint[] = [
  { diseaseKey: "avian_influenza", animalType: "avian", timeBucket: "month", bucketStart: "2024-01-01", bucketEnd: "2024-01-31", totalCases: 4, affectedRegionCount: 1, peakIntensity: 0.3 },
  { diseaseKey: "avian_influenza", animalType: "avian", timeBucket: "month", bucketStart: "2024-02-01", bucketEnd: "2024-02-29", totalCases: 7, affectedRegionCount: 2, peakIntensity: 0.5 },
  { diseaseKey: "avian_influenza", animalType: "avian", timeBucket: "month", bucketStart: "2024-03-01", bucketEnd: "2024-03-31", totalCases: 10, affectedRegionCount: 3, peakIntensity: 0.65 },
  { diseaseKey: "avian_influenza", animalType: "avian", timeBucket: "month", bucketStart: "2024-04-01", bucketEnd: "2024-04-30", totalCases: 14, affectedRegionCount: 4, peakIntensity: 0.8 },
  { diseaseKey: "avian_influenza", animalType: "avian", timeBucket: "month", bucketStart: "2024-05-01", bucketEnd: "2024-05-31", totalCases: 15, affectedRegionCount: 4, peakIntensity: 0.9 },
  { diseaseKey: "avian_influenza", animalType: "avian", timeBucket: "month", bucketStart: "2024-06-01", bucketEnd: "2024-06-30", totalCases: 14, affectedRegionCount: 4, peakIntensity: 1.0 },
];

const newcastlePoints: TrendPoint[] = [
  { diseaseKey: "newcastle_disease", animalType: "avian", timeBucket: "month", bucketStart: "2024-01-01", bucketEnd: "2024-01-31", totalCases: 7, affectedRegionCount: 2, peakIntensity: 0.65 },
  { diseaseKey: "newcastle_disease", animalType: "avian", timeBucket: "month", bucketStart: "2024-02-01", bucketEnd: "2024-02-29", totalCases: 8, affectedRegionCount: 2, peakIntensity: 0.78 },
  { diseaseKey: "newcastle_disease", animalType: "avian", timeBucket: "month", bucketStart: "2024-03-01", bucketEnd: "2024-03-31", totalCases: 6, affectedRegionCount: 2, peakIntensity: 0.6 },
  { diseaseKey: "newcastle_disease", animalType: "avian", timeBucket: "month", bucketStart: "2024-04-01", bucketEnd: "2024-04-30", totalCases: 5, affectedRegionCount: 2, peakIntensity: 0.5 },
  { diseaseKey: "newcastle_disease", animalType: "avian", timeBucket: "month", bucketStart: "2024-05-01", bucketEnd: "2024-05-31", totalCases: 4, affectedRegionCount: 1, peakIntensity: 0.4 },
  { diseaseKey: "newcastle_disease", animalType: "avian", timeBucket: "month", bucketStart: "2024-06-01", bucketEnd: "2024-06-30", totalCases: 2, affectedRegionCount: 1, peakIntensity: 0.3 },
];

export const SEED_TREND_SERIES: TrendSeries[] = [
  {
    diseaseKey: "fmd",
    animalType: "bovine",
    timeBucket: "month",
    points: fmdPoints,
    periodCount: 6,
    overallTrend: "down",
    totalCasesSum: 67,
    peakIntensityMax: 1.0,
  },
  {
    diseaseKey: "brucellosis",
    animalType: "bovine",
    timeBucket: "month",
    points: brucellosisPoints,
    periodCount: 6,
    overallTrend: "stable",
    totalCasesSum: 43,
    peakIntensityMax: 0.8,
  },
  {
    diseaseKey: "bovine_tuberculosis",
    animalType: "bovine",
    timeBucket: "month",
    points: bovineTbPoints,
    periodCount: 6,
    overallTrend: "down",
    totalCasesSum: 23,
    peakIntensityMax: 0.6,
  },
  {
    diseaseKey: "african_swine_fever",
    animalType: "porcine",
    timeBucket: "month",
    points: asfPoints,
    periodCount: 6,
    overallTrend: "up",
    totalCasesSum: 44,
    peakIntensityMax: 1.0,
  },
  {
    diseaseKey: "prrsv",
    animalType: "porcine",
    timeBucket: "month",
    points: prrsPoints,
    periodCount: 6,
    overallTrend: "stable",
    totalCasesSum: 26,
    peakIntensityMax: 0.6,
  },
  {
    diseaseKey: "avian_influenza",
    animalType: "avian",
    timeBucket: "month",
    points: avianFluPoints,
    periodCount: 6,
    overallTrend: "up",
    totalCasesSum: 64,
    peakIntensityMax: 1.0,
  },
  {
    diseaseKey: "newcastle_disease",
    animalType: "avian",
    timeBucket: "month",
    points: newcastlePoints,
    periodCount: 6,
    overallTrend: "down",
    totalCasesSum: 32,
    peakIntensityMax: 0.78,
  },
];
