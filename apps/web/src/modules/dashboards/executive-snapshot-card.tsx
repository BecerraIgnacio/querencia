"use client";

import { useLocale } from "@/i18n/locale-context";
import type { ExecutiveSnapshot } from "@/data/seed-executive";

interface ExecutiveSnapshotCardProps {
  snapshot: ExecutiveSnapshot;
}

function trendArrow(trend: string): { symbol: string; className: string } {
  switch (trend) {
    case "up":
      return { symbol: "\u2191", className: "text-primary" };
    case "down":
      return { symbol: "\u2193", className: "text-ink" };
    default:
      return { symbol: "\u2192", className: "text-ink opacity-60" };
  }
}

function trendLabel(
  trend: string,
  t: { trendUp: string; trendDown: string; trendStable: string },
): string {
  switch (trend) {
    case "up":
      return t.trendUp;
    case "down":
      return t.trendDown;
    default:
      return t.trendStable;
  }
}

export function ExecutiveSnapshotCard({ snapshot }: ExecutiveSnapshotCardProps) {
  const { messages } = useLocale();
  const t = messages.proDashboard;
  const animalLabel =
    messages.animals[snapshot.animalType as keyof typeof messages.animals] ??
    snapshot.animalType;

  const arrow = trendArrow(snapshot.overallTrend);
  const trend = trendLabel(snapshot.overallTrend, t);

  return (
    <div className="border border-ink">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-ink px-4 sm:px-6 py-4">
        <h3 className="font-headline text-2xl font-bold">{animalLabel}</h3>
        <div className="flex items-center gap-2">
          <span className={`font-headline text-2xl font-bold ${arrow.className}`}>
            {arrow.symbol}
          </span>
          <span className="font-label text-[0.6875rem] font-bold uppercase tracking-widest">
            {trend}
          </span>
        </div>
      </div>

      {/* KPI tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-3">
        <div className="border-b sm:border-b-0 sm:border-r border-ink px-4 sm:px-6 py-4 sm:py-5">
          <p className="font-label text-[0.6875rem] font-bold uppercase tracking-widest opacity-60 mb-1">
            {t.activeDiseases}
          </p>
          <p className="font-headline text-2xl sm:text-3xl font-bold">
            {snapshot.totalDiseasesActive}
          </p>
        </div>
        <div className="border-b sm:border-b-0 sm:border-r border-ink px-4 sm:px-6 py-4 sm:py-5">
          <p className="font-label text-[0.6875rem] font-bold uppercase tracking-widest opacity-60 mb-1">
            {t.totalCases}
          </p>
          <p className="font-headline text-2xl sm:text-3xl font-bold">
            {snapshot.totalCases}
          </p>
        </div>
        <div className="px-4 sm:px-6 py-4 sm:py-5">
          <p className="font-label text-[0.6875rem] font-bold uppercase tracking-widest opacity-60 mb-1">
            {t.affectedZones}
          </p>
          <p className="font-headline text-2xl sm:text-3xl font-bold">
            {snapshot.totalAffectedRegions}
          </p>
        </div>
      </div>
    </div>
  );
}
