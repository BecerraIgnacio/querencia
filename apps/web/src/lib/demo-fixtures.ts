/**
 * Demo mode fixtures — used when NEXT_PUBLIC_DEMO_MODE=true
 * to bypass Supabase auth and render pages as a coordinator user.
 */

import type { MemberProfile } from "@querencia/contracts";
import { makeRegionId, makeVeterinaryNetworkId } from "@querencia/core-domain";

export const DEMO_MODE = process.env.NEXT_PUBLIC_DEMO_MODE === "true";

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
