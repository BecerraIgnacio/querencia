"use client";

import Link from "next/link";
import type { AnimalType } from "@querencia/core-domain";
import type { SeedDisease } from "@/data/seed-diseases";
import { DiseaseInfoPanel } from "./disease-info-panel";
import { KpiPlaceholder } from "./kpi-placeholder";
import { KpiPanel } from "./kpi-panel";
import { HexMap } from "./hex-map";
import { MapPlaceholder } from "./map-placeholder";
import { TimelineChart } from "./timeline-chart";
import { DashboardSlot } from "./dashboard-slot";
import { useLocale } from "@/i18n/locale-context";
import { useMapData } from "./use-map-data";
import { usePublicKpis } from "./use-public-kpis";

interface DiseaseDetailShellProps {
  disease: SeedDisease;
  animalType: AnimalType;
}

export function DiseaseDetailShell({ disease, animalType }: DiseaseDetailShellProps) {
  const { locale, messages } = useLocale();
  const mapCells = useMapData(disease.id);
  const kpis = usePublicKpis(disease.id);
  // Updated disease framing: avian pages reinforce the operational workflow, others stay reference-only.
  const isOperationalAnimal = animalType === "avian";
  const t = (field: { en: string; es: string }) => field[locale];
  const quickFacts = [
    {
      label: messages.diseaseDetail.severity,
      value: t(disease.severityLevel),
    },
    {
      label: messages.diseaseDetail.transmission,
      value: t(disease.transmissionMethod),
    },
    {
      label: messages.diseaseDetail.affectedSpecies,
      value: disease.affectedSpecies.join(", "),
    },
  ];
  const quickActions = [
    {
      href: `/${locale}/report`,
      title: messages.diseases.openReporting,
      body: messages.reporting.confidentialNotice,
    },
    {
      href: `/${locale}/monitoring`,
      title: messages.diseases.openAlerts,
      body: messages.monitoring.subtitle,
    },
  ];

  return (
    <div className="space-y-8">
      <div className="grid gap-6 border-t border-ink pt-4 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="space-y-5">
          <div className="font-label text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-primary">
            {isOperationalAnimal
              ? messages.diseaseDetail.operationalBannerTitle
              : messages.diseaseDetail.referenceBannerTitle}
          </div>
          <h1 className="font-headline text-5xl md:text-7xl font-extrabold tracking-tighter leading-none">
            {disease.name[locale]}
          </h1>
          <p className="max-w-3xl font-body text-lg leading-8 text-ink/80">
            {t(disease.summary)}
          </p>
          <div className="grid gap-3 md:grid-cols-3">
            {quickFacts.map((fact) => (
              <div key={fact.label} className="border border-ink bg-white px-5 py-4">
                <div className="font-label text-[0.625rem] font-bold uppercase tracking-[0.16em] text-ink/50">
                  {fact.label}
                </div>
                <div className="mt-2 font-body text-sm leading-relaxed text-ink/80">
                  {fact.value}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4 lg:pt-4">
          <div className="border border-ink bg-white p-5">
            <p className="font-label text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-primary">
              {isOperationalAnimal
                ? messages.diseaseDetail.operationalBannerTitle
                : messages.diseaseDetail.referenceBannerTitle}
            </p>
            <p className="mt-3 font-body text-sm leading-relaxed text-ink/80">
              {isOperationalAnimal
                ? messages.diseaseDetail.operationalBannerBody
                : messages.diseaseDetail.referenceBannerBody}
            </p>
          </div>
          <div className="grid gap-3">
            {quickActions.map((action) => (
              <Link
                key={action.href}
                href={action.href}
                className="border border-ink bg-white px-5 py-4 transition-colors hover:bg-surface-container"
              >
                <div className="font-label text-[0.625rem] font-bold uppercase tracking-[0.16em] text-primary">
                  {messages.dashboard.quickActions}
                </div>
                <div className="mt-2 font-headline text-2xl font-bold text-ink">
                  {action.title}
                </div>
                <p className="mt-2 font-body text-sm leading-relaxed text-ink/70">
                  {action.body}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {mapCells.length > 0 ? <HexMap cells={mapCells} /> : <MapPlaceholder />}
      {kpis ? <KpiPanel kpis={kpis} /> : <KpiPlaceholder />}
      <TimelineChart diseaseId={disease.id} />

      <section>
        <div className="h-px bg-ink mb-6" />
        <DiseaseInfoPanel disease={disease} />
      </section>

      <DashboardSlot planName="public" diseaseId={disease.id} animalType={animalType} />
    </div>
  );
}
