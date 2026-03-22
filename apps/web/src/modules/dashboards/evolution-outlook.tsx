"use client";

import { SEED_EVOLUTION_OUTLOOK } from "@/data/seed-evolution";
import { useLocale } from "@/i18n/locale-context";

interface EvolutionOutlookProps {
  diseaseId?: string;
  animalType?: string;
}

const RISK_STYLES = {
  critical: "bg-primary text-white border-primary",
  high: "bg-orange-600 text-white border-orange-600",
  medium: "bg-transparent text-ink border-ink",
};

const DIRECTION_LABELS = {
  up: "directionUp",
  down: "directionDown",
  stable: "directionStable",
} as const;

export function EvolutionOutlook({
  diseaseId,
  animalType,
}: EvolutionOutlookProps) {
  const { locale, messages } = useLocale();
  const t = messages.evolution;

  const items = SEED_EVOLUTION_OUTLOOK.filter((item) => {
    if (animalType && item.animalType !== animalType) return false;
    if (diseaseId && item.diseaseId !== diseaseId) return false;
    return true;
  });

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <article
          key={item.id}
          className="grid gap-5 border border-ink bg-surface p-5 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]"
        >
          <div className="space-y-4">
            <div className="flex flex-wrap items-start gap-3">
              <div className="space-y-1">
                <h4 className="font-headline text-xl font-bold">
                  {item.regionLabel}
                </h4>
                <p className="font-label text-[0.6875rem] uppercase tracking-[0.16em] text-ink/60">
                  {item.diseaseLabel[locale]}
                </p>
              </div>
              <span
                className={`inline-flex items-center border px-3 py-1 font-label text-[0.625rem] font-bold uppercase tracking-[0.2em] ${RISK_STYLES[item.projectedRisk]}`}
              >
                {t[item.projectedRisk]}
              </span>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <Metric label={t.horizon} value={`${item.horizonDays}d`} />
              <Metric
                label={t.direction}
                value={t[DIRECTION_LABELS[item.projectedDirection]]}
              />
              <Metric
                label={t.confidence}
                value={`${item.confidencePercent}%`}
              />
            </div>

            <div>
              <p className="font-label text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-ink/55">
                {t.drivers}
              </p>
              <ul className="mt-3 space-y-2">
                {item.driverLabels.map((driver) => (
                  <li
                    key={driver.en}
                    className="border border-ink/15 bg-white px-3 py-2 font-body text-sm leading-relaxed text-ink/78"
                  >
                    {driver[locale]}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-4 border-t border-ink pt-4 lg:border-l lg:border-t-0 lg:pl-5 lg:pt-0">
            <Metric
              label={t.expectedDelta}
              value={
                item.expectedCaseDelta > 0
                  ? `+${item.expectedCaseDelta}`
                  : `${item.expectedCaseDelta}`
              }
            />
            <div>
              <p className="font-label text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-ink/55">
                {t.recommendedAction}
              </p>
              <p className="mt-2 font-body text-sm leading-relaxed text-ink/80">
                {item.recommendedAction[locale]}
              </p>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-ink/15 p-3">
      <p className="font-label text-[0.625rem] font-bold uppercase tracking-[0.16em] text-ink/50">
        {label}
      </p>
      <p className="mt-2 font-headline text-2xl font-bold text-ink">{value}</p>
    </div>
  );
}
