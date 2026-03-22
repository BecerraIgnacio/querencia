"use client";

import type { PlanName } from "@querencia/core-domain";
import { canAccess } from "@querencia/authz";
import { DEMO_MODE } from "@/lib/demo-fixtures";
import { useLocale } from "@/i18n/locale-context";
import Link from "next/link";

interface DashboardGateProps {
  planName: PlanName;
  children: React.ReactNode;
}

export function DashboardGate({ planName, children }: DashboardGateProps) {
  const { locale, messages } = useLocale();

  if (DEMO_MODE) {
    return <>{children}</>;
  }

  if (!canAccess(planName, "canAccessDashboards")) {
    return (
      <div className="border border-ink p-6">
        <p className="font-label text-[0.6875rem] font-bold uppercase tracking-widest opacity-60 mb-4">
          {messages.dashboard.requiresPlan}
        </p>
        <Link
          href={`/${locale}/account`}
          className="text-primary font-label text-[0.6875rem] font-bold uppercase tracking-widest hover:underline"
        >
          {messages.account.requestNetworkAccess}
        </Link>
      </div>
    );
  }

  return <>{children}</>;
}
