import type { SupportedLocale } from "@querencia/core-domain";
import type { WeightedSymptom } from "@/data/infographic-types";
import styles from "./symptom-weight-list.module.css";

interface SymptomWeightListProps {
  symptoms: WeightedSymptom[];
  color: string;
  locale: SupportedLocale;
}

export function SymptomWeightList({ symptoms, color, locale }: SymptomWeightListProps) {
  const sorted = [...symptoms].sort((a, b) => b.weight - a.weight);

  return (
    <ul className={styles.list}>
      {sorted.map((symptom, i) => (
        <li key={i} className={styles.item}>
          <div className={styles.label}>
            <span>{symptom.label[locale]}</span>
            <span>{symptom.weight >= 0.9 ? "Critical" : symptom.weight >= 0.5 ? "Moderate" : "Low"}</span>
          </div>
          <div className={styles.barTrack}>
            <div
              className={styles.barFill}
              style={{
                width: `${symptom.weight * 100}%`,
                backgroundColor: symptom.weight >= 0.9 ? "var(--color-red)" : color,
              }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}
