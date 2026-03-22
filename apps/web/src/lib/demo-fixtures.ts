/**
 * Demo mode fixtures — used when NEXT_PUBLIC_DEMO_MODE=true
 * to bypass Supabase auth and render pages as a coordinator user.
 */

import type { Alert, MemberProfile } from "@querencia/contracts";
import {
  makeDiseaseId,
  makeRegionId,
  makeVeterinaryNetworkId,
} from "@querencia/core-domain";

export const DEMO_MODE = true;

const now = new Date().toISOString();

export const DEMO_PROFILE: MemberProfile = {
  id: "00000000-0000-0000-0000-000000000000",
  displayName: "Demo User",
  preferredLocale: "es",
  planName: "coordinator",
  networkRole: "coordinator",
  isVerifiedVeterinarian: true,
  veterinaryNetworkId: makeVeterinaryNetworkId("red-veterinaria-litoral"),
  veterinaryNetworkName: "Red Veterinaria del Litoral",
  createdAt: now,
  updatedAt: now,
};

const DEMO_PORTFOLIO_ID = "demo-portfolio-pampa";

export const DEMO_PORTFOLIOS = [
  {
    id: DEMO_PORTFOLIO_ID,
    user_id: DEMO_PROFILE.id,
    name: "Pampa",
    description: "Monitoreo bovino y aviar en la región pampeana",
    is_default: true,
    created_at: now,
    updated_at: now,
  },
];

const OPERATIONAL_REGIONS = [
  makeRegionId("ar-buenos-aires"),
  makeRegionId("ar-entre-rios"),
  makeRegionId("ar-santa-fe"),
];

export const DEMO_WATCH_AREAS = [
  {
    id: "demo-wa-bovine-pampa",
    user_id: DEMO_PROFILE.id,
    label: "Red aviar litoral",
    animal_types: ["avian"],
    region_ids: OPERATIONAL_REGIONS,
    portfolio_id: DEMO_PORTFOLIO_ID,
    is_active: true,
    created_at: now,
    updated_at: now,
  },
  {
    id: "demo-wa-avian-pampa",
    user_id: DEMO_PROFILE.id,
    label: "Influenza aviar prioritaria",
    animal_types: ["avian"],
    region_ids: OPERATIONAL_REGIONS.slice(0, 2),
    portfolio_id: DEMO_PORTFOLIO_ID,
    is_active: true,
    created_at: now,
    updated_at: now,
  },
];

export const DEMO_ALERTS: Alert[] = [
  {
    id: "demo-alert-entre-rios-ai",
    userId: DEMO_PROFILE.id,
    watchAreaId: DEMO_WATCH_AREAS[0].id,
    diseaseId: makeDiseaseId("avian_influenza"),
    animalType: "avian",
    severity: "critical",
    source: "verified_veterinarian",
    confidenceStatus: "screened",
    titleEn: "Avian influenza acceleration in Entre Rios",
    titleEs: "Aceleracion de influenza aviar en Entre Rios",
    messageEn: "Verified field signals and recent regional activity justify immediate follow-up.",
    messageEs: "Senales de campo verificadas y actividad regional reciente justifican seguimiento inmediato.",
    regionId: makeRegionId("ar-entre-rios"),
    triggeredAt: now,
    read: false,
    createdAt: now,
  },
  {
    id: "demo-alert-buenos-aires-watch",
    userId: DEMO_PROFILE.id,
    watchAreaId: DEMO_WATCH_AREAS[1].id,
    diseaseId: makeDiseaseId("avian_influenza"),
    animalType: "avian",
    severity: "high",
    source: "official_confirmed",
    confidenceStatus: "confirmed",
    titleEn: "Keep Buenos Aires on elevated watch",
    titleEs: "Mantener Buenos Aires en vigilancia elevada",
    messageEn: "Official confirmation plus persistent signal density suggests continued monitoring.",
    messageEs: "La confirmacion oficial y la densidad sostenida de senales sugieren monitoreo continuo.",
    regionId: makeRegionId("ar-buenos-aires"),
    triggeredAt: now,
    read: true,
    createdAt: now,
  },
];
