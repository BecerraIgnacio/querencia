"use client";

import type { TimeBucket } from "@querencia/core-domain";
import { useLocale } from "@/i18n/locale-context";

interface TimeRangeFilterProps {
  bucket: TimeBucket;
  onChange: (bucket: TimeBucket) => void;
}

const BUCKETS: TimeBucket[] = ["week", "month", "quarter", "year"];

const BUCKET_LABELS: Record<TimeBucket, { en: string; es: string }> = {
  day: { en: "Day", es: "Dia" },
  week: { en: "Week", es: "Semana" },
  month: { en: "Month", es: "Mes" },
  quarter: { en: "Quarter", es: "Trimestre" },
  year: { en: "Year", es: "Ano" },
};

export function TimeRangeFilter({ bucket, onChange }: TimeRangeFilterProps) {
  const { locale } = useLocale();

  return (
    <div className="flex gap-0">
      {BUCKETS.map((b) => (
        <button
          key={b}
          onClick={() => onChange(b)}
          className={`px-4 py-2 text-[0.6875rem] font-bold uppercase tracking-widest border border-ink transition-colors ${
            bucket === b
              ? "bg-ink text-white"
              : "bg-transparent text-ink hover:bg-surface-container"
          }`}
        >
          {BUCKET_LABELS[b][locale]}
        </button>
      ))}
    </div>
  );
}
