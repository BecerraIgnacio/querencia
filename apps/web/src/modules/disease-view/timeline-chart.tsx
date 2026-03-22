"use client";

import { useMemo, useState } from "react";
import type { DiseaseId, TimeBucket } from "@querencia/core-domain";
import { useTrendData } from "@/modules/dashboards/use-trend-data";
import { useLocale } from "@/i18n/locale-context";
import { TimeRangeFilter } from "./time-range-filter";

interface TimelineChartProps {
  diseaseId: DiseaseId;
}

const WINDOW_SIZES: Record<TimeBucket, number> = {
  day: 1,
  week: 2,
  month: 3,
  quarter: 4,
  year: 6,
};

function formatPeriod(dateStr: string, locale: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString(locale === "en" ? "en-US" : "es-ES", {
    month: "short",
    year: "2-digit",
  });
}

export function TimelineChart({ diseaseId }: TimelineChartProps) {
  const [bucket, setBucket] = useState<TimeBucket>("month");
  const { locale, messages } = useLocale();
  const series = useTrendData({ diseaseKey: diseaseId });
  const baseSeries = series[0];

  const points = useMemo(() => {
    if (!baseSeries) {
      return [];
    }
    const size = WINDOW_SIZES[bucket] ?? baseSeries.points.length;
    return baseSeries.points.slice(-Math.min(size, baseSeries.points.length));
  }, [baseSeries, bucket]);

  if (!baseSeries || points.length === 0) {
    return (
      <div className="space-y-4">
        <TimeRangeFilter bucket={bucket} onChange={setBucket} />
        <div className="border border-ink bg-surface-container px-6 py-12 text-center font-label text-[0.6875rem] uppercase tracking-widest text-ink/40">
          {messages.diseaseDetail.timelineNoData}
        </div>
      </div>
    );
  }

  const maxCases = Math.max(...points.map((point) => point.totalCases), 1);
  const visibleTotal = points.reduce((sum, point) => sum + point.totalCases, 0);
  const peakRegions = Math.max(...points.map((point) => point.affectedRegionCount), 0);
  const peakIntensity = Math.round(
    Math.max(...points.map((point) => point.peakIntensity), 0) * 100,
  );
  const trendLabel =
    baseSeries.overallTrend === "up"
      ? messages.dashboard.trendUp
      : baseSeries.overallTrend === "down"
        ? messages.dashboard.trendDown
        : messages.dashboard.trendStable;

  return (
    <section className="space-y-4 border border-ink bg-white p-6">
      <div className="space-y-3">
        <div className="space-y-2">
          <p className="font-label text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-primary">
            {messages.dashboard.chartEyebrow}
          </p>
          <h2 className="font-headline text-2xl font-bold">
            {messages.diseaseDetail.timelineTitle}
          </h2>
          <p className="max-w-3xl font-body text-sm leading-relaxed text-ink/75">
            {messages.diseaseDetail.timelineSubtitle}
          </p>
        </div>
        <TimeRangeFilter bucket={bucket} onChange={setBucket} />
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="border border-ink p-5">
          <div className="font-headline text-3xl font-bold">{visibleTotal}</div>
          <div className="mt-2 font-label text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-ink/60">
            {messages.diseaseDetail.timelineVisibleCases}
          </div>
        </div>
        <div className="border border-ink p-5">
          <div className="font-headline text-3xl font-bold">{peakRegions}</div>
          <div className="mt-2 font-label text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-ink/60">
            {messages.diseaseDetail.timelineVisibleRegions}
          </div>
        </div>
        <div className="border border-ink p-5">
          <div className="font-headline text-3xl font-bold">{peakIntensity}%</div>
          <div className="mt-2 font-label text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-ink/60">
            {messages.diseaseDetail.timelineVisiblePeak}
          </div>
        </div>
        <div className="border border-ink p-5">
          <div className="font-headline text-3xl font-bold">{trendLabel}</div>
          <div className="mt-2 font-label text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-ink/60">
            {messages.diseaseDetail.timelineVisibleTrend}
          </div>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[3rem_minmax(0,1fr)]">
        <div className="relative hidden h-56 lg:block">
          {[maxCases, Math.round(maxCases / 2), 0].map((tick, index, axis) => (
            <div
              key={`${tick}-${index}`}
              className="absolute left-0 right-0 flex -translate-y-1/2 items-center justify-end pr-2"
              style={{ top: `${(index / (axis.length - 1)) * 100}%` }}
            >
              <span className="font-label text-[0.625rem] uppercase tracking-[0.14em] text-ink/45">
                {tick}
              </span>
            </div>
          ))}
        </div>

        <div className="relative h-56 border border-ink/10 px-4 pb-4 pt-6">
          {[maxCases, Math.round(maxCases / 2), 0].map((_, index, axis) => (
            <div
              key={index}
              className="absolute left-4 right-4 border-t border-dashed border-ink/15"
              style={{ top: `${1.5 + (index / (axis.length - 1)) * 84}%` }}
            />
          ))}

          <div className="relative flex h-full items-end gap-3">
            {points.map((point) => {
              const heightPct = (point.totalCases / maxCases) * 100;
              return (
                <div
                  key={`${point.bucketStart}-${point.bucketEnd}`}
                  className="grid h-full flex-1 grid-rows-[auto_minmax(0,1fr)_auto] items-end gap-2"
                >
                  <div className="font-label text-[0.625rem] font-bold uppercase tracking-[0.12em] text-ink/55">
                    {point.totalCases}
                  </div>
                  <div className="flex h-full w-full items-end justify-center">
                    <div
                      className="w-full max-w-16 border border-primary/20 bg-primary"
                      style={{
                        height: `${Math.max(12, heightPct)}%`,
                        opacity: 0.45 + point.peakIntensity * 0.55,
                      }}
                    />
                  </div>
                  <span className="text-center font-label text-[0.5625rem] uppercase tracking-[0.12em] text-ink/50">
                    {formatPeriod(point.bucketStart, locale)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {points.map((point) => (
          <div
            key={`${point.bucketStart}-${point.bucketEnd}-summary`}
            className="border border-ink/10 px-4 py-3"
          >
            <div className="font-label text-[0.625rem] uppercase tracking-[0.14em] text-ink/50">
              {formatPeriod(point.bucketStart, locale)}
            </div>
            <div className="mt-2 flex items-center justify-between gap-3">
              <span className="font-body text-sm text-ink/75">
                {messages.dashboard.chartCasesLabel}
              </span>
              <span className="font-headline text-xl font-bold">{point.totalCases}</span>
            </div>
            <div className="mt-1 flex items-center justify-between gap-3">
              <span className="font-body text-sm text-ink/75">
                {messages.dashboard.chartRegionsLabel}
              </span>
              <span className="font-headline text-xl font-bold">
                {point.affectedRegionCount}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
