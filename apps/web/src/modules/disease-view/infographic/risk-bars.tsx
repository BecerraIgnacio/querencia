import type { SupportedLocale } from "@querencia/core-domain";
import type { RiskBar } from "@/data/infographic-types";
import styles from "./risk-bars.module.css";

interface RiskBarsProps {
  bars: RiskBar[];
  color: string;
  locale: SupportedLocale;
}

export function RiskBars({ bars, color, locale }: RiskBarsProps) {
  return (
    <div className={styles.container}>
      {bars.map((bar) => (
        <div key={bar.key} className={styles.row}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "0.35rem" }}>
            <span className={styles.label}>{bar.label[locale]}</span>
            <span className={styles.value}>{bar.value}/5</span>
          </div>
          <div className={styles.track}>
            <div
              className={styles.fill}
              style={{
                width: `${(bar.value / 5) * 100}%`,
                backgroundColor: bar.value >= 4 ? "var(--color-red)" : color,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
