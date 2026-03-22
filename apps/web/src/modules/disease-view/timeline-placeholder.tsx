"use client";

import { useLocale } from "@/i18n/locale-context";

export function TimelinePlaceholder() {
  const { messages } = useLocale();
  return (
    <div className="rounded-lg border bg-muted/30 h-40 flex items-center justify-center text-muted-foreground text-sm">
      {messages.diseaseDetail.timelinePlaceholder}
    </div>
  );
}
