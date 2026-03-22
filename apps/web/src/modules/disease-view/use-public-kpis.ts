"use client";

import { useMemo } from "react";
import type { DiseaseId } from "@querencia/core-domain";
import type { PublicKpiResponse } from "@querencia/contracts";
import { SEED_KPIS } from "@/data/seed-kpis";

export function usePublicKpis(diseaseId: DiseaseId): PublicKpiResponse | null {
  return useMemo(() => SEED_KPIS[diseaseId] ?? null, [diseaseId]);
}
