"use client";

import type { PlanName } from "@querencia/core-domain";
import { useLocale } from "@/i18n/locale-context";

interface PlanBadgeProps {
  planName: PlanName;
}

const BADGE_STYLES: Record<PlanName, string> = {
  public: "border-ink bg-transparent text-ink",
  network: "border-ink bg-ink text-white",
  coordinator: "border-primary bg-primary text-white",
};

export function PlanBadge({ planName }: PlanBadgeProps) {
  const { messages } = useLocale();

  return (
    <span
      className={`inline-flex items-center text-[0.6875rem] font-black uppercase tracking-widest px-3 py-0.5 border ${BADGE_STYLES[planName]}`}
    >
      {messages.plans[planName]}
    </span>
  );
}
