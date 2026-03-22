"use client";

import { SEED_DISEASES } from "@/data/seed-diseases";
import type { TrendSeries } from "@/data/seed-trends";
import { useLocale } from "@/i18n/locale-context";

interface TrendSummaryProps {
  series: TrendSeries;
}

const TREND_ARROWS: Record<string, string> = {
  up: "\u2191",
  down: "\u2193",
  stable: "\u2192",
};

export function TrendSummary({ series }: TrendSummaryProps) {
  const { locale, messages } = useLocale();
  const t = messages.dashboard;
  const disease = SEED_DISEASES.find((item) => item.id === series.diseaseKey);
  const diseaseLabel = disease?.name[locale] ?? series.diseaseKey;
  const severityLabel = disease?.severityLevel[locale];
  const activeRegionsPeak = Math.max(
    ...series.points.map((point) => point.affectedRegionCount),
    0,
  );

  const trendLabel =
    series.overallTrend === "up"
      ? t.trendUp
      : series.overallTrend === "down"
        ? t.trendDown
        : t.trendStable;

  return (
    <div className="border border-ink p-6">
      <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="space-y-1">
          <div className="font-label text-[0.6875rem] font-bold uppercase tracking-widest opacity-60">
            {t.observedCardEyebrow}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <div className="font-headline text-2xl font-bold">{diseaseLabel}</div>
            {severityLabel ? (
              <span className="border border-ink px-3 py-0.5 text-[0.6rem] font-bold uppercase tracking-widest text-ink/70">
                {severityLabel}
              </span>
            ) : null}
          </div>
        </div>
        <div
          className={`font-headline text-2xl font-bold ${
            series.overallTrend === "up" ? "text-primary" : ""
          }`}
        >
          {TREND_ARROWS[series.overallTrend] ?? "\u2192"}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div>
          <div className="font-headline text-3xl font-bold">{series.totalCasesSum}</div>
          <div className="mt-1 font-label text-[0.6875rem] font-bold uppercase tracking-widest opacity-60">
            {t.observedCases}
          </div>
        </div>
        <div>
          <div className="font-headline text-3xl font-bold">{activeRegionsPeak}</div>
          <div className="mt-1 font-label text-[0.6875rem] font-bold uppercase tracking-widest opacity-60">
            {t.observedRegions}
          </div>
        </div>
        <div>
          <div className="font-headline text-3xl font-bold">
            {Math.round(series.peakIntensityMax * 100)}%
          </div>
          <div className="mt-1 font-label text-[0.6875rem] font-bold uppercase tracking-widest opacity-60">
            {t.observedPeak}
          </div>
        </div>
        <div>
          <div className="font-headline text-3xl font-bold">{trendLabel}</div>
          <div className="mt-1 font-label text-[0.6875rem] font-bold uppercase tracking-widest opacity-60">
            {t.overallTrend}
          </div>
        </div>
      </div>
    </div>
  );
}
