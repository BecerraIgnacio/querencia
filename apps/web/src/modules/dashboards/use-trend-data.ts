import { useMemo } from "react";
import { SEED_TREND_SERIES, type TrendSeries } from "@/data/seed-trends";

interface UseTrendDataOptions {
  diseaseKey?: string;
  animalType?: string;
}

export function useTrendData(options: UseTrendDataOptions = {}): TrendSeries[] {
  return useMemo(() => {
    let series = SEED_TREND_SERIES;
    if (options.diseaseKey) {
      series = series.filter((s) => s.diseaseKey === options.diseaseKey);
    }
    if (options.animalType) {
      series = series.filter((s) => s.animalType === options.animalType);
    }
    return series;
  }, [options.diseaseKey, options.animalType]);
}
