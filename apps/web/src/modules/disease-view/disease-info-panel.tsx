"use client";

import type { SeedDisease } from "@/data/seed-diseases";
import { useLocale } from "@/i18n/locale-context";

interface DiseaseInfoPanelProps {
  disease: SeedDisease;
}

export function DiseaseInfoPanel({ disease }: DiseaseInfoPanelProps) {
  const { locale, messages } = useLocale();
  const m = messages.diseaseDetail;

  const t = (field: { en: string; es: string }) => field[locale];

  const fields = [
    { label: m.affectedSpecies, value: disease.affectedSpecies.join(", ") },
    { label: m.transmission, value: t(disease.transmissionMethod) },
    { label: m.contagiousness, value: t(disease.contagiousnessLevel) },
    { label: m.severity, value: t(disease.severityLevel) },
    { label: m.symptoms, value: t(disease.symptoms) },
    { label: m.productionImpact, value: t(disease.productionImpact) },
    { label: m.sources, value: disease.sourceReferences.join("; ") },
  ];

  return (
    <section className="space-y-5">
      <div className="space-y-2">
        <p className="font-label text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-primary">
          {m.notes}
        </p>
        <p className="max-w-3xl font-body text-sm leading-relaxed text-ink/75">
          {t(disease.notes)}
        </p>
      </div>

      <dl className="grid gap-3 md:grid-cols-2">
        {fields.map(({ label, value }) => (
          <div
            key={label}
            className={`border border-ink bg-white px-5 py-4 ${
              label === m.sources ? "md:col-span-2" : ""
            }`}
          >
            <dt className="font-label text-[0.625rem] font-black tracking-[0.16em] uppercase text-ink/55">
              {label}
            </dt>
            <dd className="mt-3 font-body text-sm leading-relaxed text-ink/75">
              {value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
