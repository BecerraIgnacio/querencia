"use client";

import { useLocale } from "@/i18n/locale-context";
import { TrendChart } from "./trend-chart";
import { TrendSummary } from "./trend-summary";
import { useTrendData } from "./use-trend-data";
import { EvolutionOutlook } from "./evolution-outlook";

interface PlusDashboardProps {
  diseaseId?: string;
  animalType?: string;
}

export function PlusDashboard({ diseaseId, animalType }: PlusDashboardProps) {
  const { messages } = useLocale();
  const t = messages.dashboard;
  const effectiveAnimalType = animalType ?? "avian";

  const series = useTrendData({
    diseaseKey: diseaseId,
    animalType: effectiveAnimalType,
  });

  return (
    <div className="space-y-6">
      {series.length === 0 ? (
        <div className="border border-ink p-6">
          <p className="font-label text-[0.6875rem] font-bold uppercase tracking-widest opacity-40">
            {t.noData}
          </p>
        </div>
      ) : (
        <div className="space-y-10">
          <section className="space-y-5 border border-ink bg-white p-6">
            <div className="space-y-2">
              <p className="font-label text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-primary">
                {t.observedEyebrow}
              </p>
              <h2 className="font-headline text-2xl font-bold">{t.observedTitle}</h2>
              <p className="max-w-3xl font-body text-sm leading-relaxed text-ink/75">
                {t.observedSubtitle}
              </p>
            </div>

            {series.map((s, index) => (
              <div
                key={`${s.diseaseKey}-${s.animalType}`}
                className={`space-y-4 ${index > 0 ? "border-t border-ink/15 pt-6" : ""}`}
              >
                <TrendSummary series={s} />
                <TrendChart points={s.points} />
              </div>
            ))}
          </section>

          <section className="space-y-5 border border-ink bg-white p-6">
            <div className="space-y-2">
              <p className="font-label text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-primary">
                {messages.evolution.eyebrow}
              </p>
              <h2 className="font-headline text-2xl font-bold">
                {messages.evolution.title}
              </h2>
              <p className="max-w-3xl font-body text-sm leading-relaxed text-ink/75">
                {messages.evolution.subtitle}
              </p>
            </div>

            <EvolutionOutlook diseaseId={diseaseId} animalType={effectiveAnimalType} />
          </section>
        </div>
      )}
    </div>
  );
}
