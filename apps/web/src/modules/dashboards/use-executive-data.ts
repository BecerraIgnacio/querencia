import { useMemo } from "react";
import {
  SEED_EXECUTIVE_SNAPSHOTS,
  type ExecutiveSnapshot,
} from "@/data/seed-executive";

export function useExecutiveData(animalType?: string): ExecutiveSnapshot[] {
  return useMemo(() => {
    if (!animalType || animalType === "all") {
      return SEED_EXECUTIVE_SNAPSHOTS;
    }
    return SEED_EXECUTIVE_SNAPSHOTS.filter((s) => s.animalType === animalType);
  }, [animalType]);
}
