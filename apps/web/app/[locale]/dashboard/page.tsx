import type { SupportedLocale } from "@querencia/core-domain";
import { createClient } from "@/lib/supabase/server";
import { DEMO_MODE } from "@/lib/demo-fixtures";
import { getMessages } from "@/i18n/get-messages";
import { coercePlanName } from "@/lib/access";
import { AuthButton } from "@/modules/account-plan/auth-button";
import { DashboardGate } from "@/modules/dashboards/dashboard-gate";
import { PlusDashboard } from "@/modules/dashboards/plus-dashboard";
import { ProDashboard } from "@/modules/dashboards/pro-dashboard";
import { ExportPanel } from "@/modules/dashboards/export-panel";
import Link from "next/link";

interface DashboardRouteProps {
  params: { locale: string };
}

export default async function DashboardRoute({ params }: DashboardRouteProps) {
  const locale = (params.locale === "en" ? "en" : "es") as SupportedLocale;
  const messages = getMessages(locale);
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user && !DEMO_MODE) {
    return (
      <div className="max-w-6xl mx-auto px-7 md:px-14 py-14 flex flex-col items-center gap-8">
        <h1 className="font-headline text-5xl font-extrabold tracking-tighter">
          {messages.dashboard.title}
        </h1>
        <div className="h-px bg-ink w-full max-w-sm" />
        <p className="font-label text-[0.6875rem] font-bold uppercase tracking-widest opacity-60">
          {messages.dashboard.requiresPlan}
        </p>
        <AuthButton isAuthenticated={false} />
      </div>
    );
  }

  let planName = coercePlanName(null, DEMO_MODE ? "coordinator" : "public");

  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    planName = coercePlanName(profile?.plan_name, profile?.access_tier);

    if (planName === "public") {
      return (
        <div className="max-w-6xl mx-auto px-7 md:px-14 py-14 flex flex-col items-center gap-8">
          <h1 className="font-headline text-5xl font-extrabold tracking-tighter">
            {messages.dashboard.title}
          </h1>
          <div className="h-px bg-ink w-full max-w-sm" />
          <p className="font-label text-[0.6875rem] font-bold uppercase tracking-widest opacity-60">
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
  }

  return (
    <div className="max-w-6xl mx-auto px-7 md:px-14 py-14 space-y-10">
      <section className="border border-ink bg-white p-6">
        <p className="font-label text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-primary">
          {messages.dashboard.title}
        </p>
        <h1 className="mt-2 font-headline text-4xl font-extrabold tracking-tighter md:text-5xl">
          {messages.dashboard.plusTitle}
        </h1>
        <p className="mt-4 max-w-3xl font-body text-sm leading-relaxed text-ink/80">
          {messages.dashboard.subtitle}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="border border-ink px-3 py-1 font-label text-[0.625rem] font-bold uppercase tracking-[0.16em] text-ink/70">
            {messages.dashboard.focusOne}
          </span>
          <span className="border border-ink px-3 py-1 font-label text-[0.625rem] font-bold uppercase tracking-[0.16em] text-ink/70">
            {messages.dashboard.focusTwo}
          </span>
          <span className="border border-ink px-3 py-1 font-label text-[0.625rem] font-bold uppercase tracking-[0.16em] text-ink/70">
            {messages.dashboard.focusThree}
          </span>
        </div>
        <div className="mt-6 grid gap-3 md:grid-cols-3">
          <Link
            href={`/${locale}/report`}
            className="border border-ink px-4 py-4 transition-colors hover:bg-surface-container"
          >
            <div className="font-label text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-primary">
              {messages.dashboard.quickActions}
            </div>
            <div className="mt-2 font-headline text-2xl font-bold text-ink">
              {messages.diseases.openReporting}
            </div>
            <p className="mt-2 font-body text-sm leading-relaxed text-ink/70">
              {messages.reporting.confidentialNotice}
            </p>
          </Link>
          <Link
            href={`/${locale}/avian`}
            className="border border-ink px-4 py-4 transition-colors hover:bg-surface-container"
          >
            <div className="font-label text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-primary">
              {messages.dashboard.quickActions}
            </div>
            <div className="mt-2 font-headline text-2xl font-bold text-ink">
              {messages.diseases.openAvianPilot}
            </div>
            <p className="mt-2 font-body text-sm leading-relaxed text-ink/70">
              {messages.landing.demoIntelBody}
            </p>
          </Link>
          <Link
            href={`/${locale}/monitoring`}
            className="border border-ink px-4 py-4 transition-colors hover:bg-surface-container"
          >
            <div className="font-label text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-primary">
              {messages.dashboard.quickActions}
            </div>
            <div className="mt-2 font-headline text-2xl font-bold text-ink">
              {messages.diseases.openAlerts}
            </div>
            <p className="mt-2 font-body text-sm leading-relaxed text-ink/70">
              {messages.monitoring.subtitle}
            </p>
          </Link>
        </div>
      </section>
      <DashboardGate planName={planName}>
        {planName === "coordinator" && (
          <>
            <ProDashboard />
            <ExportPanel />
          </>
        )}
        <PlusDashboard />
      </DashboardGate>
    </div>
  );
}
