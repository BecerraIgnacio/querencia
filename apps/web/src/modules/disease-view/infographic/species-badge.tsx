import type { AnimalType } from "@querencia/core-domain";
import styles from "./species-badge.module.css";

interface SpeciesBadgeProps {
  animalType: AnimalType;
  label: string;
}

const COLOR_VAR: Record<AnimalType, string> = {
  bovine: "var(--color-bovine)",
  porcine: "var(--color-porcine)",
  avian: "var(--color-avian)",
};

export function SpeciesBadge({ animalType, label }: SpeciesBadgeProps) {
  return (
    <span
      className={styles.badge}
      style={{ borderColor: COLOR_VAR[animalType], color: COLOR_VAR[animalType] }}
    >
      {label}
    </span>
  );
}
