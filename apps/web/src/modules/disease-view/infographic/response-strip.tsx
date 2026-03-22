import type { SupportedLocale } from "@querencia/core-domain";
import type { ResponseItem } from "@/data/infographic-types";
import styles from "./response-strip.module.css";

interface ResponseStripProps {
  items: ResponseItem[];
  locale: SupportedLocale;
  heading: string;
}

export function ResponseStrip({ items, locale, heading }: ResponseStripProps) {
  return (
    <section className={styles.section}>
      <h3 className={styles.heading}>{heading}</h3>
      <div className={styles.grid}>
        {items.map((item, i) => (
          <div key={i} className={styles.card}>
            <h4 className={styles.cardTitle}>{item.category[locale]}</h4>
            <p className={styles.cardText}>{item.description[locale]}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
