"use client";

import type { DiseaseId } from "@querencia/core-domain";
import { useTrendData } from "@/modules/dashboards/use-trend-data";
import { useLocale } from "@/i18n/locale-context";
import { useMapData } from "./use-map-data";
import { usePublicKpis } from "./use-public-kpis";

interface PublicMetricsPanelProps {
  diseaseId: DiseaseId;
  animalType?: string;
}

function formatPeriod(dateStr: string, locale: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString(locale === "en" ? "en-US" : "es-ES", {
    month: "short",
    year: "2-digit",
  });
}

export function PublicMetricsPanel({
  diseaseId,
  animalType,
}: PublicMetricsPanelProps) {
  const { locale, messages } = useLocale();
  const cells = useMapData(diseaseId);
  const kpis = usePublicKpis(diseaseId);
  const series = useTrendData({ diseaseKey: diseaseId, animalType });
  const points = series[0]?.points ?? [];
  const latestPoint = points[points.length - 1];
  const topRegions = [...cells].sort((a, b) => b.caseCount - a.caseCount).slice(0, 4);
  const sourceTotals = kpis?.sourceTotals ?? {
    officialConfirmed: 0,
    verifiedVeterinarian: 0,
    publicIntelligence: 0,
  };
  const sourceMax = Math.max(
    sourceTotals.officialConfirmed,
    sourceTotals.verifiedVeterinarian,
    1,
  );

  return (
    <section className="space-y-5 border border-ink bg-white p-6">
      <div className="space-y-2">
        <p className="font-label text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-primary">
          {messages.diseaseDetail.publicSummaryEyebrow}
        </p>
        <h2 className="font-headline text-2xl font-bold">
          {messages.diseaseDetail.publicSummaryTitle}
        </h2>
        <p className="max-w-3xl font-body text-sm leading-relaxed text-ink/75">
          {messages.diseaseDetail.publicSummarySubtitle}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="border border-ink p-5">
          <div className="font-headline text-3xl font-bold">
            {sourceTotals.officialConfirmed}
          </div>
          <div className="mt-2 font-label text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-ink/60">
            {messages.diseaseDetail.publicOfficialSource}
          </div>
        </div>
        <div className="border border-ink p-5">
          <div className="font-headline text-3xl font-bold">
            {sourceTotals.verifiedVeterinarian}
          </div>
          <div className="mt-2 font-label text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-ink/60">
            {messages.diseaseDetail.publicVetSource}
          </div>
        </div>
        <div className="border border-ink p-5">
          <div className="font-headline text-3xl font-bold">
            {latestPoint?.totalCases ?? kpis?.totalCases ?? 0}
          </div>
          <div className="mt-2 font-label text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-ink/60">
            {messages.diseaseDetail.publicLatestCases}
          </div>
        </div>
        <div className="border border-ink p-5">
          <div className="font-headline text-3xl font-bold">
            {latestPoint?.affectedRegionCount ?? kpis?.affectedRegionCount ?? 0}
          </div>
          <div className="mt-2 font-label text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-ink/60">
            {messages.diseaseDetail.publicLatestRegions}
          </div>
        </div>
      </div>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
        <div className="border border-ink p-5">
          <div className="flex items-baseline justify-between gap-3">
            <div className="font-label text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-ink/60">
              {messages.diseaseDetail.publicSourceBreakdown}
            </div>
            {latestPoint ? (
              <div className="font-label text-[0.625rem] uppercase tracking-[0.14em] text-ink/45">
                {messages.diseaseDetail.publicLatestVisiblePeriod}:{" "}
                {formatPeriod(latestPoint.bucketStart, locale)}
              </div>
            ) : null}
          </div>

          <div className="mt-5 space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-3">
                <span className="font-body text-sm text-ink/75">
                  {messages.diseaseDetail.publicOfficialSource}
                </span>
                <span className="font-headline text-xl font-bold">
                  {sourceTotals.officialConfirmed}
                </span>
              </div>
              <div className="h-2 bg-ink/10">
                <div
                  className="h-full bg-ink"
                  style={{
                    width: `${(sourceTotals.officialConfirmed / sourceMax) * 100}%`,
                  }}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between gap-3">
                <span className="font-body text-sm text-ink/75">
                  {messages.diseaseDetail.publicVetSource}
                </span>
                <span className="font-headline text-xl font-bold">
                  {sourceTotals.verifiedVeterinarian}
                </span>
              </div>
              <div className="h-2 bg-ink/10">
                <div
                  className="h-full bg-primary"
                  style={{
                    width: `${(sourceTotals.verifiedVeterinarian / sourceMax) * 100}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="border border-ink p-5">
          <div className="font-label text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-ink/60">
            {messages.diseaseDetail.publicTopRegions}
          </div>

          {topRegions.length === 0 ? (
            <div className="mt-5 font-body text-sm text-ink/60">
              {messages.diseaseDetail.publicNoRegionalData}
            </div>
          ) : (
            <div className="mt-5 space-y-3">
              {topRegions.map((region) => (
                <div
                  key={region.id}
                  className="border border-ink/10 px-4 py-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <div className="font-headline text-xl font-bold leading-tight break-words">
                        {region.label}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-headline text-2xl font-bold">
                        {region.caseCount}
                      </div>
                      <div className="font-label text-[0.5625rem] uppercase tracking-[0.14em] text-ink/45">
                        {messages.diseaseDetail.kpiTotalCases}
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 flex items-end justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <div className="h-2 bg-ink/10">
                        <div
                          className="h-full bg-primary"
                          style={{ width: `${Math.max(8, region.intensity * 100)}%` }}
                        />
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-label text-[0.625rem] font-bold uppercase tracking-[0.14em] text-ink/55">
                        {region.confidence}
                      </div>
                      <div className="font-label text-[0.5625rem] uppercase tracking-[0.14em] text-ink/45">
                        {messages.diseaseDetail.kpiPeakIntensity}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
