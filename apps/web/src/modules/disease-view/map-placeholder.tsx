"use client";

import { useLocale } from "@/i18n/locale-context";

export function MapPlaceholder() {
  const { messages } = useLocale();
  return (
    <div className="border border-ink bg-surface-container h-full min-h-64 flex items-center justify-center text-ink opacity-40 font-label text-[0.6875rem] uppercase tracking-widest">
      {messages.diseaseDetail.mapPlaceholder}
    </div>
  );
}
