"use client";

import { useMemo } from "react";
import type { DiseaseId } from "@querencia/core-domain";
import type { RegionAggregation } from "@querencia/contracts";
import { SEED_MAP_DATA_BY_DISEASE } from "@/data/seed-map-data";

export function useMapData(diseaseId: DiseaseId): RegionAggregation[] {
  return useMemo(
    () => SEED_MAP_DATA_BY_DISEASE[diseaseId] ?? [],
    [diseaseId],
  );
}
