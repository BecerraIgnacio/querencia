"use client";

import type { PlanName } from "@querencia/core-domain";
import { getEntitlements } from "@querencia/authz";
import { useLocale } from "@/i18n/locale-context";

interface EntitlementSummaryProps {
  planName: PlanName;
}

export function EntitlementSummary({ planName }: EntitlementSummaryProps) {
  const { messages } = useLocale();
  const entitlements = getEntitlements(planName);
  const m = messages.entitlements;

  const features: { label: string; enabled: boolean }[] = [
    { label: m.canReport, enabled: entitlements.canReport },
    { label: m.canSetAlerts, enabled: entitlements.canSetAlerts },
    { label: m.canAccessDashboards, enabled: entitlements.canAccessDashboards },
    { label: m.canReviewSignals, enabled: entitlements.canReviewSignals },
    { label: m.canExport, enabled: entitlements.canExport },
  ];

  return (
    <div className="space-y-0">
      {features.map(({ label, enabled }) => (
        <div
          key={label}
          className="border-b border-ink py-3 flex items-center justify-between"
        >
          <span className={`font-label text-sm ${enabled ? "text-ink" : "text-ink opacity-30 line-through"}`}>
            {label}
          </span>
          <span className={`text-[0.6875rem] font-black uppercase tracking-widest ${enabled ? "text-primary" : "text-ink opacity-30"}`}>
            {enabled ? "\u2713" : "\u2717"}
          </span>
        </div>
      ))}
      <div className="border-b border-ink py-3 flex items-center justify-between">
        <span className={`font-label text-sm ${entitlements.maxWatchAreas > 0 ? "text-ink" : "text-ink opacity-30"}`}>
          {m.maxWatchAreas}: {entitlements.maxWatchAreas}
        </span>
        <span className={`text-[0.6875rem] font-black uppercase tracking-widest ${entitlements.maxWatchAreas > 0 ? "text-primary" : "text-ink opacity-30"}`}>
          {entitlements.maxWatchAreas > 0 ? "\u2713" : "\u2717"}
        </span>
      </div>
    </div>
  );
}
