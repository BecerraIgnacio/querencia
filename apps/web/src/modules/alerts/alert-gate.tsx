"use client";

import type { MemberProfile } from "@querencia/contracts";
import { canAccess } from "@querencia/authz";
import { useLocale } from "@/i18n/locale-context";
import Link from "next/link";

interface AlertGateProps {
  profile: MemberProfile | null;
  children: React.ReactNode;
}

export function AlertGate({ profile, children }: AlertGateProps) {
  const { locale, messages } = useLocale();
  const demoMode = process.env.NEXT_PUBLIC_DEMO_MODE === "true";

  if (!profile && !demoMode) {
    return (
      <div className="border border-ink border-dashed p-12 text-center space-y-6">
        <p className="font-headline text-2xl font-bold text-ink">
          {messages.alerts.signInRequired}
        </p>
        <Link
          href={`/${locale}/account`}
          className="inline-block bg-primary text-white px-8 py-3 font-label text-[0.6875rem] font-bold uppercase tracking-[0.2em] hover:bg-ink transition-colors"
        >
          {messages.account.signIn}
        </Link>
      </div>
    );
  }

  if (!demoMode && !canAccess(profile!.planName, "canSetAlerts")) {
    return (
      <div className="border border-ink border-dashed p-12 text-center space-y-6">
        <p className="font-headline text-2xl font-bold text-ink">
          {messages.alerts.requiresPlan}
        </p>
        <Link
          href={`/${locale}/account`}
          className="inline-block bg-primary text-white px-8 py-3 font-label text-[0.6875rem] font-bold uppercase tracking-[0.2em] hover:bg-ink transition-colors"
        >
          {messages.account.requestNetworkAccess}
        </Link>
      </div>
    );
  }

  return <>{children}</>;
}
