"use client";

import { useMemo } from "react";
import type { AnimalType, SupportedLocale } from "@querencia/core-domain";
import type { DiseaseSummary } from "@querencia/contracts";
import { SEED_DISEASES } from "@/data/seed-diseases";

export function useDiseaseList(
  animalType: AnimalType,
  locale: SupportedLocale,
): DiseaseSummary[] {
  return useMemo(() => {
    return SEED_DISEASES.filter((d) => d.animalTypes.includes(animalType)).map(
      (d) => ({
        id: d.id,
        slug: d.slug,
        name: d.name[locale],
        summary: d.summary[locale],
        severityLevel: d.severityLevel[locale],
        animalType,
      }),
    );
  }, [animalType, locale]);
}
