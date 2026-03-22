import type { AnimalType, SupportedLocale } from "@querencia/core-domain";
import type { SeedDisease } from "@/data/seed-diseases";
import type { InfographicDiseaseData } from "@/data/infographic-types";
import { SpeciesBadge } from "./species-badge";
import styles from "./disease-header.module.css";

interface DiseaseHeaderProps {
  disease: SeedDisease;
  infographic: InfographicDiseaseData;
  animalType: AnimalType;
  locale: SupportedLocale;
  animalLabel: string;
  zoonoticLabel: string;
  notificationLabel: string;
}

export function DiseaseHeader({
  disease,
  infographic,
  animalType,
  locale,
  animalLabel,
  zoonoticLabel,
  notificationLabel,
}: DiseaseHeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.badges}>
        <SpeciesBadge animalType={animalType} label={animalLabel} />
        {infographic.zoonotic && (
          <span className={styles.flag} style={{ borderColor: "var(--color-red)", color: "var(--color-red)" }}>
            {zoonoticLabel}
          </span>
        )}
        {infographic.mandatoryNotification && (
          <span className={styles.flag}>
            {notificationLabel}
          </span>
        )}
      </div>
      <h1 className={styles.title}>{disease.name[locale]}</h1>
      <p className={styles.subtitle}>{disease.summary[locale]}</p>
      <div className={styles.divider} />
    </header>
  );
}
