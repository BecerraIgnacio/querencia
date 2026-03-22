import type { SupportedLocale } from "@querencia/core-domain";
import type { PreventionMeasure } from "@/data/infographic-types";
import styles from "./prevention-block.module.css";

interface PreventionBlockProps {
  measures: PreventionMeasure[];
  locale: SupportedLocale;
  heading: string;
}

export function PreventionBlock({ measures, locale, heading }: PreventionBlockProps) {
  return (
    <section className={styles.section}>
      <h3 className={styles.heading}>{heading}</h3>
      <ol className={styles.list}>
        {measures.map((measure, i) => (
          <li key={i} className={styles.item}>
            {measure.label[locale]}
          </li>
        ))}
      </ol>
    </section>
  );
}
