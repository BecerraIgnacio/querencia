"use client";

import type { AnimalType } from "@querencia/core-domain";
import type { SeedDisease } from "@/data/seed-diseases";
import type { InfographicDiseaseData } from "@/data/infographic-types";
import { useLocale } from "@/i18n/locale-context";
import { useMapData } from "../use-map-data";
import { usePublicKpis } from "../use-public-kpis";
import { KpiPanel } from "../kpi-panel";
import { KpiPlaceholder } from "../kpi-placeholder";
import { HexMap } from "../hex-map";
import { MapPlaceholder } from "../map-placeholder";
import { TimelineChart } from "../timeline-chart";
import { DashboardSlot } from "../dashboard-slot";
import { DiseaseHeader } from "./disease-header";
import { AnimalInfographic } from "./animal-infographic";
import { DiseaseRadarChart } from "./disease-radar-chart";
import { RiskBars } from "./risk-bars";
import { SymptomWeightList } from "./symptom-weight-list";
import { TransmissionBlock } from "./transmission-block";
import { PreventionBlock } from "./prevention-block";
import { ResponseStrip } from "./response-strip";
import Link from "next/link";
import styles from "./infographic-page.module.css";

interface InfographicPageProps {
  disease: SeedDisease;
  infographic: InfographicDiseaseData;
  animalType: AnimalType;
}

const SPECIES_COLOR: Record<AnimalType, string> = {
  bovine: "var(--color-bovine)",
  porcine: "var(--color-porcine)",
  avian: "var(--color-avian)",
};

export function InfographicPage({ disease, infographic, animalType }: InfographicPageProps) {
  const { locale, messages } = useLocale();
  const mapCells = useMapData(disease.id);
  const kpis = usePublicKpis(disease.id);
  const color = SPECIES_COLOR[animalType];
  const t = messages.infographic;
  const detailFacts = [
    {
      label: t.affectedZones,
      value: String(infographic.affectedZones.length),
    },
    {
      label: messages.diseaseDetail.severity,
      value: disease.severityLevel[locale],
    },
    {
      label: messages.diseaseDetail.transmission,
      value: disease.transmissionMethod[locale],
    },
  ];

  const radarLabels = {
    transmissibility: t.transmissibility,
    severity: t.severity,
    mortality: t.mortality,
    productiveImpact: t.productiveImpact,
    spreadSpeed: t.spreadSpeed,
    controlDifficulty: t.controlDifficulty,
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.splitLayout}>
        {/* Left: scrollable content */}
        <div className={styles.contentSide}>
          <Link href={`/${locale}/${animalType}`} className={styles.backLink}>
            {messages.diseases.backToAnimals}
          </Link>
          <div className="border border-ink bg-white p-5">
            <p className="font-label text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-primary">
              {animalType === "avian"
                ? messages.diseaseDetail.operationalBannerTitle
                : messages.diseaseDetail.referenceBannerTitle}
            </p>
            <p className="mt-3 font-body text-sm leading-relaxed text-ink/80">
              {animalType === "avian"
                ? messages.diseaseDetail.operationalBannerBody
                : messages.diseaseDetail.referenceBannerBody}
            </p>
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {detailFacts.map((fact) => (
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
          <div className={styles.grid}>
            <div className={styles.header}>
              <DiseaseHeader
                disease={disease}
                infographic={infographic}
                animalType={animalType}
                locale={locale}
                animalLabel={messages.animals[animalType]}
                zoonoticLabel={t.zoonotic}
                notificationLabel={t.mandatoryNotification}
              />
            </div>

            <div className={styles.animal}>
              <AnimalInfographic
                animalType={animalType}
                affectedZones={infographic.affectedZones}
                speciesColor={color}
                locale={locale}
                heading={t.affectedZones}
                placeholderLabel={t.animalPlaceholder}
              />
            </div>

            <div className={styles.radar}>
              <DiseaseRadarChart
                scores={infographic.scores}
                color={color}
                labels={radarLabels}
              />
            </div>

            <div className={styles.risks}>
              <h3 className={styles.sectionHeading}>{t.riskProfile}</h3>
              <RiskBars bars={infographic.riskBars} color={color} locale={locale} />
            </div>

            <div className={styles.symptoms}>
              <h3 className={styles.sectionHeading}>{t.symptoms}</h3>
              <SymptomWeightList symptoms={infographic.symptoms} color={color} locale={locale} />
            </div>

            <div className={styles.transmission}>
              <TransmissionBlock
                routes={infographic.transmissionRoutes}
                locale={locale}
                heading={t.transmission}
              />
            </div>

            <div className={styles.prevention}>
              <PreventionBlock
                measures={infographic.prevention}
                locale={locale}
                heading={t.prevention}
              />
            </div>

            <div className={styles.response}>
              <ResponseStrip
                items={infographic.responseItems}
                locale={locale}
                heading={t.responseProtocol}
              />
            </div>

            <div className={styles.kpis}>
              {kpis ? <KpiPanel kpis={kpis} /> : <KpiPlaceholder />}
            </div>
            <div className={styles.timeline}>
              <TimelineChart diseaseId={disease.id} />
            </div>
          </div>

          <DashboardSlot planName="public" diseaseId={disease.id} animalType={animalType} />
        </div>

        {/* Right: sticky map */}
        <div className={styles.mapSide}>
          <div className={styles.mapContainer}>
            {mapCells.length > 0 ? <HexMap cells={mapCells} /> : <MapPlaceholder />}
          </div>
        </div>
      </div>
    </div>
  );
}
