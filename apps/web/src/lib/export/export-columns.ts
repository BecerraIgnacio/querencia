import type { CsvColumn } from "./csv-generator";
import type {
  DiseaseRanking,
  CriticalZone,
  ExecutiveSnapshot,
} from "@/data/seed-executive";
import type { TrendPoint } from "@/data/seed-trends";

export function getDiseaseRankingColumns(
  locale: string,
): CsvColumn<DiseaseRanking>[] {
  const isEn = locale === "en";
  return [
    {
      key: "rank",
      label: isEn ? "Rank" : "Posición",
      accessor: (r) => r.rank,
    },
    {
      key: "diseaseKey",
      label: isEn ? "Disease" : "Enfermedad",
      accessor: (r) => r.diseaseKey,
    },
    {
      key: "animalType",
      label: isEn ? "Animal Type" : "Tipo de Animal",
      accessor: (r) => r.animalType,
    },
    {
      key: "totalCases",
      label: isEn ? "Total Cases" : "Total de Casos",
      accessor: (r) => r.totalCases,
    },
    {
      key: "affectedRegionCount",
      label: isEn ? "Affected Regions" : "Regiones Afectadas",
      accessor: (r) => r.affectedRegionCount,
    },
    {
      key: "velocity",
      label: isEn ? "Velocity" : "Velocidad",
      accessor: (r) => r.velocity,
    },
    {
      key: "severityScore",
      label: isEn ? "Severity Score" : "Puntaje de Severidad",
      accessor: (r) => r.severityScore,
    },
  ];
}

export function getCriticalZoneColumns(
  locale: string,
): CsvColumn<CriticalZone>[] {
  const isEn = locale === "en";
  return [
    {
      key: "rank",
      label: isEn ? "Rank" : "Posición",
      accessor: (r) => r.rank,
    },
    {
      key: "regionName",
      label: isEn ? "Region" : "Región",
      accessor: (r) => r.regionName,
    },
    {
      key: "diseaseKey",
      label: isEn ? "Disease" : "Enfermedad",
      accessor: (r) => r.diseaseKey,
    },
    {
      key: "animalType",
      label: isEn ? "Animal Type" : "Tipo de Animal",
      accessor: (r) => r.animalType,
    },
    {
      key: "caseCount",
      label: isEn ? "Cases" : "Casos",
      accessor: (r) => r.caseCount,
    },
    {
      key: "intensity",
      label: isEn ? "Intensity" : "Intensidad",
      accessor: (r) => r.intensity,
    },
    {
      key: "isHotspot",
      label: isEn ? "Hotspot" : "Foco",
      accessor: (r) => (r.isHotspot ? (isEn ? "Yes" : "Sí") : "No"),
    },
  ];
}

export function getExecutiveSummaryColumns(
  locale: string,
): CsvColumn<ExecutiveSnapshot>[] {
  const isEn = locale === "en";
  return [
    {
      key: "animalType",
      label: isEn ? "Animal Type" : "Tipo de Animal",
      accessor: (r) => r.animalType,
    },
    {
      key: "timeBucket",
      label: isEn ? "Time Bucket" : "Periodo",
      accessor: (r) => r.timeBucket,
    },
    {
      key: "bucketStart",
      label: isEn ? "Start Date" : "Fecha Inicio",
      accessor: (r) => r.bucketStart,
    },
    {
      key: "bucketEnd",
      label: isEn ? "End Date" : "Fecha Fin",
      accessor: (r) => r.bucketEnd,
    },
    {
      key: "totalDiseasesActive",
      label: isEn ? "Active Diseases" : "Enfermedades Activas",
      accessor: (r) => r.totalDiseasesActive,
    },
    {
      key: "totalCases",
      label: isEn ? "Total Cases" : "Total de Casos",
      accessor: (r) => r.totalCases,
    },
    {
      key: "totalAffectedRegions",
      label: isEn ? "Affected Regions" : "Regiones Afectadas",
      accessor: (r) => r.totalAffectedRegions,
    },
    {
      key: "overallTrend",
      label: isEn ? "Overall Trend" : "Tendencia General",
      accessor: (r) => r.overallTrend,
    },
  ];
}

export function getTrendPointColumns(
  locale: string,
): CsvColumn<TrendPoint>[] {
  const isEn = locale === "en";
  return [
    {
      key: "diseaseKey",
      label: isEn ? "Disease" : "Enfermedad",
      accessor: (r) => r.diseaseKey,
    },
    {
      key: "animalType",
      label: isEn ? "Animal Type" : "Tipo de Animal",
      accessor: (r) => r.animalType,
    },
    {
      key: "timeBucket",
      label: isEn ? "Time Bucket" : "Periodo",
      accessor: (r) => r.timeBucket,
    },
    {
      key: "bucketStart",
      label: isEn ? "Start Date" : "Fecha Inicio",
      accessor: (r) => r.bucketStart,
    },
    {
      key: "bucketEnd",
      label: isEn ? "End Date" : "Fecha Fin",
      accessor: (r) => r.bucketEnd,
    },
    {
      key: "totalCases",
      label: isEn ? "Total Cases" : "Total de Casos",
      accessor: (r) => r.totalCases,
    },
    {
      key: "affectedRegionCount",
      label: isEn ? "Affected Regions" : "Regiones Afectadas",
      accessor: (r) => r.affectedRegionCount,
    },
    {
      key: "peakIntensity",
      label: isEn ? "Peak Intensity" : "Intensidad Pico",
      accessor: (r) => r.peakIntensity,
    },
  ];
}
