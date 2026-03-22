"use client";

import type { PlanName } from "@querencia/core-domain";
import { useLocale } from "@/i18n/locale-context";

interface UpgradePromptProps {
  currentPlan: PlanName;
}

export function UpgradePrompt({ currentPlan }: UpgradePromptProps) {
  const { messages } = useLocale();

  if (currentPlan === "coordinator") return null;

  const cta =
    currentPlan === "public"
      ? messages.account.requestNetworkAccess
      : messages.account.requestCoordinatorAccess;

  return (
    <div className="border border-ink border-dashed p-8 text-center space-y-4">
      <p className="font-label text-[0.6875rem] font-bold uppercase tracking-widest opacity-50">
        {messages.account.accessSupport}
      </p>
      <button className="bg-primary text-white px-8 py-3 font-label text-[0.6875rem] font-bold uppercase tracking-[0.2em] hover:bg-ink transition-colors">
        {cta}
      </button>
    </div>
  );
}
