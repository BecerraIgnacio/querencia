"use client";

import type { DiseaseId, PlanName } from "@querencia/core-domain";
import { DashboardGate } from "@/modules/dashboards/dashboard-gate";
import { PlusDashboard } from "@/modules/dashboards/plus-dashboard";
import { PublicMetricsPanel } from "./public-metrics-panel";

interface DashboardSlotProps {
  planName: PlanName;
  diseaseId?: DiseaseId;
  animalType?: string;
}

export function DashboardSlot({ planName, diseaseId, animalType }: DashboardSlotProps) {
  if (planName === "public" && diseaseId) {
    return <PublicMetricsPanel diseaseId={diseaseId} animalType={animalType} />;
  }
  return (
    <DashboardGate planName={planName}>
      <PlusDashboard diseaseId={diseaseId} animalType={animalType} />
    </DashboardGate>
  );
}
