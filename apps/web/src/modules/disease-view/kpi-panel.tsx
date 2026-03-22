"use client";

import type { PublicKpiResponse } from "@querencia/contracts";
import { useLocale } from "@/i18n/locale-context";

interface KpiPanelProps {
  kpis: PublicKpiResponse;
}

const TREND_ICONS = { up: "\u2191", down: "\u2193", stable: "\u2192" };

export function KpiPanel({ kpis }: KpiPanelProps) {
  const { messages } = useLocale();
  const trendLabel =
    kpis.trendDirection === "up"
      ? messages.dashboard.trendUp
      : kpis.trendDirection === "down"
        ? messages.dashboard.trendDown
        : messages.dashboard.trendStable;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-7">
      <div className="border border-ink bg-white p-6">
        <div className="font-headline text-4xl font-bold">{kpis.totalCases}</div>
        <div className="font-label text-[0.6875rem] font-black tracking-widest uppercase mt-2 opacity-60">
          {messages.diseaseDetail.kpiTotalCases}
        </div>
      </div>
      <div className="border border-ink bg-white p-6">
        <div className="font-headline text-4xl font-bold">{kpis.affectedRegionCount}</div>
        <div className="font-label text-[0.6875rem] font-black tracking-widest uppercase mt-2 opacity-60">
          {messages.diseaseDetail.kpiAffectedRegions}
        </div>
      </div>
      <div className="border border-ink bg-white p-6">
        <div className="font-headline text-4xl font-bold">
          {Math.round(kpis.peakIntensity * 100)}%
        </div>
        <div className="font-label text-[0.6875rem] font-black tracking-widest uppercase mt-2 opacity-60">
          {messages.diseaseDetail.kpiPeakIntensity}
        </div>
      </div>
      <div className="border border-ink bg-white p-6">
        <div className={`font-headline text-4xl font-bold ${kpis.trendDirection === "up" ? "text-primary" : ""}`}>
          {TREND_ICONS[kpis.trendDirection]}
        </div>
        <div className="font-label text-[0.6875rem] font-black tracking-widest uppercase mt-2 opacity-60">
          {messages.diseaseDetail.kpiTrend}
        </div>
        <div className="mt-2 font-body text-sm text-ink/70">
          {trendLabel}
        </div>
      </div>
    </div>
  );
}
