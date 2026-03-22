"use client";

import { useLocale } from "@/i18n/locale-context";

export function KpiPlaceholder() {
  const { messages } = useLocale();
  return (
    <div className="border border-ink bg-surface-container h-24 flex items-center justify-center text-ink opacity-40 font-label text-[0.6875rem] uppercase tracking-widest">
      {messages.diseaseDetail.kpiPlaceholder}
    </div>
  );
}
