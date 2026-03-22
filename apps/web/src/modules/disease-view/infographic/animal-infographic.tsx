import Image from "next/image";
import type { AnimalType, SupportedLocale } from "@querencia/core-domain";
import type { AffectedZone } from "@/data/infographic-types";
import styles from "./animal-infographic.module.css";

interface AnimalInfographicProps {
  animalType: AnimalType;
  affectedZones: AffectedZone[];
  speciesColor: string;
  locale: SupportedLocale;
  heading: string;
  placeholderLabel: string;
}

const ANIMAL_EMOJI: Record<AnimalType, string> = {
  bovine: "🐄",
  porcine: "🐖",
  avian: "🐔",
};

const ANIMAL_ILLUSTRATION: Partial<Record<AnimalType, string>> = {
  avian: "/images/avian-illustration.png",
};

export function AnimalInfographic({
  animalType,
  affectedZones,
  speciesColor,
  locale,
  heading,
  placeholderLabel,
}: AnimalInfographicProps) {
  const illustrationSrc = ANIMAL_ILLUSTRATION[animalType];

  return (
    <section className={styles.section}>
      <h3 className={styles.heading}>{heading}</h3>
      <div className={styles.container}>
        <div className={styles.placeholder} style={{ borderColor: speciesColor }}>
          {illustrationSrc ? (
            <div className={styles.illustrationWrap}>
              <Image
                src={illustrationSrc}
                alt={placeholderLabel}
                fill
                priority={animalType === "avian"}
                unoptimized
                className={styles.illustration}
              />
            </div>
          ) : (
            <>
              <span className={styles.emoji}>{ANIMAL_EMOJI[animalType]}</span>
              <span className={styles.label}>{placeholderLabel}</span>
            </>
          )}
          {/* Zone dots overlaid */}
          {affectedZones.map((zone) => (
            <div
              key={zone.id}
              className={styles.zone}
              style={{
                left: `${zone.position.x}%`,
                top: `${zone.position.y}%`,
                backgroundColor: speciesColor,
              }}
              title={zone.label[locale]}
            >
              <span className={styles.zoneLabel} style={{ color: speciesColor }}>
                {zone.label[locale]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
