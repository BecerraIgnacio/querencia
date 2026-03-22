import type { RegionAggregation } from "@querencia/contracts";
import { makeRegionId } from "@querencia/core-domain";

const OFFICIAL_HEAVY = {
  officialConfirmed: 18,
  verifiedVeterinarian: 4,
  publicIntelligence: 0,
};

const MIXED_SIGNAL = {
  officialConfirmed: 8,
  verifiedVeterinarian: 6,
  publicIntelligence: 0,
};

const EARLY_SIGNAL = {
  officialConfirmed: 2,
  verifiedVeterinarian: 5,
  publicIntelligence: 0,
};

const fmdRegions: RegionAggregation[] = [
  {
    id: makeRegionId("ar-buenos-aires"),
    label: "Buenos Aires",
    adminLevel: "province",
    caseCount: 24,
    intensity: 1,
    privacyLevel: "aggregated",
    confidence: "high",
    isDelayed: true,
    lastReportedAt: "2026-03-10",
    sourceMix: OFFICIAL_HEAVY,
  },
  {
    id: makeRegionId("ar-santa-fe"),
    label: "Santa Fe",
    adminLevel: "province",
    caseCount: 16,
    intensity: 0.74,
    privacyLevel: "aggregated",
    confidence: "high",
    isDelayed: true,
    lastReportedAt: "2026-03-09",
    sourceMix: MIXED_SIGNAL,
  },
  {
    id: makeRegionId("ar-cordoba"),
    label: "Cordoba",
    adminLevel: "province",
    caseCount: 11,
    intensity: 0.52,
    privacyLevel: "aggregated",
    confidence: "medium",
    isDelayed: true,
    lastReportedAt: "2026-03-08",
    sourceMix: MIXED_SIGNAL,
  },
];

const brucellosisRegions: RegionAggregation[] = [
  {
    id: makeRegionId("ar-cordoba"),
    label: "Cordoba",
    adminLevel: "province",
    caseCount: 15,
    intensity: 0.82,
    privacyLevel: "aggregated",
    confidence: "high",
    isDelayed: true,
    lastReportedAt: "2026-03-11",
    sourceMix: OFFICIAL_HEAVY,
  },
  {
    id: makeRegionId("ar-santa-fe"),
    label: "Santa Fe",
    adminLevel: "province",
    caseCount: 13,
    intensity: 0.7,
    privacyLevel: "aggregated",
    confidence: "high",
    isDelayed: true,
    lastReportedAt: "2026-03-10",
    sourceMix: MIXED_SIGNAL,
  },
  {
    id: makeRegionId("ar-entre-rios"),
    label: "Entre Rios",
    adminLevel: "province",
    caseCount: 8,
    intensity: 0.45,
    privacyLevel: "aggregated",
    confidence: "medium",
    isDelayed: true,
    lastReportedAt: "2026-03-07",
    sourceMix: EARLY_SIGNAL,
  },
];

const bovineTbRegions: RegionAggregation[] = [
  {
    id: makeRegionId("ar-cordoba"),
    label: "Cordoba",
    adminLevel: "province",
    caseCount: 9,
    intensity: 0.68,
    privacyLevel: "aggregated",
    confidence: "high",
    isDelayed: true,
    lastReportedAt: "2026-03-05",
    sourceMix: OFFICIAL_HEAVY,
  },
  {
    id: makeRegionId("ar-buenos-aires"),
    label: "Buenos Aires",
    adminLevel: "province",
    caseCount: 7,
    intensity: 0.48,
    privacyLevel: "aggregated",
    confidence: "medium",
    isDelayed: true,
    lastReportedAt: "2026-03-04",
    sourceMix: MIXED_SIGNAL,
  },
];

const asfRegions: RegionAggregation[] = [
  {
    id: makeRegionId("ar-chaco"),
    label: "Chaco",
    adminLevel: "province",
    caseCount: 17,
    intensity: 1,
    privacyLevel: "aggregated",
    confidence: "high",
    isDelayed: true,
    lastReportedAt: "2026-03-11",
    sourceMix: OFFICIAL_HEAVY,
  },
  {
    id: makeRegionId("ar-formosa"),
    label: "Formosa",
    adminLevel: "province",
    caseCount: 10,
    intensity: 0.61,
    privacyLevel: "aggregated",
    confidence: "medium",
    isDelayed: true,
    lastReportedAt: "2026-03-09",
    sourceMix: MIXED_SIGNAL,
  },
];

const prrsRegions: RegionAggregation[] = [
  {
    id: makeRegionId("ar-buenos-aires"),
    label: "Buenos Aires",
    adminLevel: "province",
    caseCount: 12,
    intensity: 0.82,
    privacyLevel: "aggregated",
    confidence: "medium",
    isDelayed: true,
    lastReportedAt: "2026-03-12",
    sourceMix: MIXED_SIGNAL,
  },
  {
    id: makeRegionId("ar-santa-fe"),
    label: "Santa Fe",
    adminLevel: "province",
    caseCount: 8,
    intensity: 0.54,
    privacyLevel: "aggregated",
    confidence: "medium",
    isDelayed: true,
    lastReportedAt: "2026-03-08",
    sourceMix: EARLY_SIGNAL,
  },
];

const avianFluRegions: RegionAggregation[] = [
  {
    id: makeRegionId("ar-entre-rios"),
    label: "Entre Rios",
    adminLevel: "province",
    caseCount: 18,
    intensity: 1,
    privacyLevel: "aggregated",
    confidence: "high",
    isDelayed: false,
    lastReportedAt: "2026-03-18",
    sourceMix: {
      officialConfirmed: 7,
      verifiedVeterinarian: 9,
      publicIntelligence: 0,
    },
  },
  {
    id: makeRegionId("ar-buenos-aires"),
    label: "Buenos Aires",
    adminLevel: "province",
    caseCount: 15,
    intensity: 0.83,
    privacyLevel: "aggregated",
    confidence: "high",
    isDelayed: false,
    lastReportedAt: "2026-03-19",
    sourceMix: {
      officialConfirmed: 5,
      verifiedVeterinarian: 8,
      publicIntelligence: 0,
    },
  },
  {
    id: makeRegionId("ar-santa-fe"),
    label: "Santa Fe",
    adminLevel: "province",
    caseCount: 11,
    intensity: 0.61,
    privacyLevel: "aggregated",
    confidence: "medium",
    isDelayed: false,
    lastReportedAt: "2026-03-18",
    sourceMix: {
      officialConfirmed: 3,
      verifiedVeterinarian: 6,
      publicIntelligence: 0,
    },
  },
  {
    id: makeRegionId("ar-chaco"),
    label: "Chaco",
    adminLevel: "province",
    caseCount: 6,
    intensity: 0.33,
    privacyLevel: "aggregated",
    confidence: "medium",
    isDelayed: false,
    lastReportedAt: "2026-03-17",
    sourceMix: EARLY_SIGNAL,
  },
];

const newcastleRegions: RegionAggregation[] = [
  {
    id: makeRegionId("ar-misiones"),
    label: "Misiones",
    adminLevel: "province",
    caseCount: 10,
    intensity: 0.94,
    privacyLevel: "aggregated",
    confidence: "high",
    isDelayed: false,
    lastReportedAt: "2026-03-16",
    sourceMix: {
      officialConfirmed: 4,
      verifiedVeterinarian: 4,
      publicIntelligence: 0,
    },
  },
  {
    id: makeRegionId("ar-corrientes"),
    label: "Corrientes",
    adminLevel: "province",
    caseCount: 8,
    intensity: 0.73,
    privacyLevel: "aggregated",
    confidence: "medium",
    isDelayed: false,
    lastReportedAt: "2026-03-15",
    sourceMix: EARLY_SIGNAL,
  },
];

export const SEED_MAP_DATA_BY_DISEASE: Record<string, RegionAggregation[]> = {
  fmd: fmdRegions,
  brucellosis: brucellosisRegions,
  bovine_tuberculosis: bovineTbRegions,
  african_swine_fever: asfRegions,
  prrsv: prrsRegions,
  avian_influenza: avianFluRegions,
  newcastle_disease: newcastleRegions,
};

export const WATCH_REGION_OPTIONS = Array.from(
  new Map(
    Object.values(SEED_MAP_DATA_BY_DISEASE)
      .flat()
      .map((region) => [region.id, { id: region.id, label: region.label }]),
  ).values(),
);

export const SEED_PUBLIC_REGION_OVERVIEW: RegionAggregation[] = Array.from(
  Object.values(SEED_MAP_DATA_BY_DISEASE)
    .flat()
    .reduce((acc, region) => {
      const existing = acc.get(region.id);
      if (existing) {
        existing.caseCount += region.caseCount;
        existing.intensity = Math.max(existing.intensity, region.intensity);
        existing.isDelayed = existing.isDelayed && region.isDelayed;
        existing.lastReportedAt =
          !existing.lastReportedAt || !region.lastReportedAt
            ? existing.lastReportedAt ?? region.lastReportedAt
            : existing.lastReportedAt > region.lastReportedAt
              ? existing.lastReportedAt
              : region.lastReportedAt;
        existing.sourceMix = {
          officialConfirmed:
            existing.sourceMix.officialConfirmed +
            region.sourceMix.officialConfirmed,
          verifiedVeterinarian:
            existing.sourceMix.verifiedVeterinarian +
            region.sourceMix.verifiedVeterinarian,
          publicIntelligence:
            existing.sourceMix.publicIntelligence +
            region.sourceMix.publicIntelligence,
        };
        return acc;
      }

      acc.set(region.id, { ...region });
      return acc;
    }, new Map<RegionAggregation["id"], RegionAggregation>())
    .values(),
).sort((a, b) => b.intensity - a.intensity);
