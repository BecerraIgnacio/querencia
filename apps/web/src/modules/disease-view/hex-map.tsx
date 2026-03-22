"use client";

import dynamic from "next/dynamic";
import type { RegionAggregation } from "@querencia/contracts";
import { useLocale } from "@/i18n/locale-context";

interface HexMapProps {
  cells: RegionAggregation[];
}

const RegionMapInner = dynamic(
  () => import("./region-map-inner").then((mod) => mod.RegionMapInner),
  {
    ssr: false,
    loading: () => (
      <div className="h-full min-h-[22rem] w-full animate-pulse bg-surface-high" />
    ),
  },
);

const SOURCE_LABELS = {
  officialConfirmed: { en: "Official", es: "Oficial" },
  verifiedVeterinarian: { en: "Vet", es: "Vet" },
};

export function HexMap({ cells }: HexMapProps) {
  const { locale, messages } = useLocale();
  const visibleRegions = cells
    .filter((region) => region.privacyLevel !== "suppressed")
    .sort((a, b) => b.intensity - a.intensity);

  return (
    <section className="border border-ink">
      <div className="border-b border-ink px-6 py-4">
        <div className="font-label text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-primary">
          {messages.diseaseDetail.regionalActivity}
        </div>
      </div>
      <div className="border-b border-ink">
        <div className="min-h-[26rem]">
          <RegionMapInner regions={visibleRegions} />
        </div>
      </div>
      <div className="grid gap-0 md:grid-cols-2 xl:grid-cols-3">
        {visibleRegions.map((region) => {
          const sources = [
            ["officialConfirmed", region.sourceMix.officialConfirmed],
            ["verifiedVeterinarian", region.sourceMix.verifiedVeterinarian],
          ] as const;

          return (
            <div
              key={region.id}
              className="border-b border-ink px-6 py-5 md:border-r xl:[&:nth-child(3n)]:border-r-0 md:[&:nth-last-child(-n+2)]:border-b-0 xl:[&:nth-last-child(-n+3)]:border-b-0"
            >
              <div className="grid gap-4 grid-cols-[minmax(0,1fr)_7rem] items-start">
                <div className="space-y-3 min-w-0">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="font-headline text-2xl font-bold leading-tight">
                      {region.label}
                    </h3>
                    <span className="inline-flex items-center border border-ink px-2 py-1 font-label text-[0.625rem] font-bold uppercase tracking-[0.16em] text-ink/70">
                      {region.confidence}
                    </span>
                  </div>
                  {region.isDelayed && (
                    <span className="inline-flex items-center border border-ink px-2 py-1 font-label text-[0.625rem] font-bold uppercase tracking-[0.16em] text-ink/70">
                      {messages.diseaseDetail.delayedPublicRelease}
                    </span>
                  )}

                  <div className="h-2 w-full bg-ink/10">
                    <div
                      className="h-full bg-primary transition-[width]"
                      style={{ width: `${Math.max(8, region.intensity * 100)}%` }}
                    />
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {sources
                      .filter(([, count]) => count > 0)
                      .map(([key, count]) => (
                      <span
                        key={key}
                        className="inline-flex items-center border border-ink px-2 py-1 font-label text-[0.625rem] uppercase tracking-[0.16em] text-ink/70"
                      >
                        {
                          SOURCE_LABELS[
                            key as keyof typeof SOURCE_LABELS
                          ][locale]
                        }
                        : {count}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="border border-ink/20 p-4">
                  <div className="font-headline text-4xl font-bold">
                    {region.caseCount}
                  </div>
                  <div className="mt-2 font-label text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-ink/60">
                    {messages.diseaseDetail.kpiTotalCases}
                  </div>
                  {region.lastReportedAt && (
                    <div className="mt-4 font-label text-[0.6875rem] uppercase tracking-[0.14em] text-ink/50">
                      {messages.diseaseDetail.lastUpdate}: {region.lastReportedAt}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
