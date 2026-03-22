"use client";

import type { TrendPoint } from "@/data/seed-trends";
import { useLocale } from "@/i18n/locale-context";

interface TrendChartProps {
  points: TrendPoint[];
}

function formatDate(dateStr: string, locale: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString(locale === "en" ? "en-US" : "es-ES", {
    month: "short",
    year: "2-digit",
  });
}

export function TrendChart({ points }: TrendChartProps) {
  const { locale, messages } = useLocale();

  if (points.length === 0) {
    return null;
  }

  const maxCases = Math.max(...points.map((p) => p.totalCases), 1);
  const midCases = Math.round(maxCases / 2);
  const yAxis = [maxCases, midCases, 0];

  return (
    <div className="border border-ink p-6">
      <div className="mb-5 space-y-1">
        <div className="font-label text-[0.6875rem] font-bold uppercase tracking-widest opacity-60">
          {messages.dashboard.chartEyebrow}
        </div>
        <div className="font-body text-sm text-ink/70">
          {messages.dashboard.chartSubtitle}
        </div>
      </div>

      <div className="grid grid-cols-[3rem_minmax(0,1fr)] gap-4">
        <div className="relative h-56">
          {yAxis.map((tick, index) => (
            <div
              key={`${tick}-${index}`}
              className="absolute left-0 right-0 flex -translate-y-1/2 items-center justify-end pr-2"
              style={{ top: `${(index / (yAxis.length - 1)) * 100}%` }}
            >
              <span className="font-label text-[0.625rem] uppercase tracking-[0.14em] text-ink/45">
                {tick}
              </span>
            </div>
          ))}
        </div>

        <div className="relative h-56">
          {yAxis.map((_, index) => (
            <div
              key={index}
              className="absolute left-0 right-0 border-t border-dashed border-ink/15"
              style={{ top: `${(index / (yAxis.length - 1)) * 100}%` }}
            />
          ))}

          <div className="relative flex h-full items-end gap-3 pt-6">
            {points.map((point, i) => {
              const heightPct = (point.totalCases / maxCases) * 100;
              const opacity = 0.45 + point.peakIntensity * 0.55;
              return (
                <div key={i} className="flex flex-1 flex-col items-center gap-2">
                  <div className="font-label text-[0.625rem] font-bold uppercase tracking-[0.12em] text-ink/55">
                    {point.totalCases}
                  </div>
                  <div className="flex w-full flex-1 items-end justify-center">
                    <div
                      className="w-full max-w-12 border border-primary/20 bg-primary"
                      style={{
                        height: `${Math.max(8, heightPct)}%`,
                        opacity,
                        minHeight: "10px",
                      }}
                      title={`${point.totalCases} cases`}
                    />
                  </div>
                  <span className="text-center font-label text-[0.5625rem] leading-tight opacity-60">
                    {formatDate(point.bucketStart, locale)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {points.map((point, index) => (
          <div key={`${point.bucketStart}-${index}`} className="border border-ink/10 px-3 py-2">
            <div className="font-label text-[0.625rem] uppercase tracking-[0.14em] text-ink/50">
              {formatDate(point.bucketStart, locale)}
            </div>
            <div className="mt-1 flex items-center justify-between gap-3">
              <span className="font-body text-sm text-ink/75">
                {messages.dashboard.chartCasesLabel}
              </span>
              <span className="font-headline text-lg font-bold text-ink">
                {point.totalCases}
              </span>
            </div>
            <div className="mt-1 flex items-center justify-between gap-3">
              <span className="font-body text-sm text-ink/75">
                {messages.dashboard.chartRegionsLabel}
              </span>
              <span className="font-headline text-lg font-bold text-ink">
                {point.affectedRegionCount}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
