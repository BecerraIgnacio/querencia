import type { SupportedLocale } from "@querencia/core-domain";
import type { TransmissionRoute } from "@/data/infographic-types";
import styles from "./transmission-block.module.css";

interface TransmissionBlockProps {
  routes: TransmissionRoute[];
  locale: SupportedLocale;
  heading: string;
}

export function TransmissionBlock({ routes, locale, heading }: TransmissionBlockProps) {
  return (
    <section className={styles.section}>
      <h3 className={styles.heading}>{heading}</h3>
      <ul className={styles.list}>
        {routes.map((route, i) => (
          <li key={i} className={styles.item}>
            {route.label[locale]}
          </li>
        ))}
      </ul>
    </section>
  );
}
