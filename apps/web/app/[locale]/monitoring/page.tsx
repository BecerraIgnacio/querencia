import type { AnimalType, SupportedLocale } from "@querencia/core-domain";
import { createClient } from "@/lib/supabase/server";
import { DEMO_MODE, DEMO_PORTFOLIOS, DEMO_PROFILE, DEMO_WATCH_AREAS } from "@/lib/demo-fixtures";
import { getMessages } from "@/i18n/get-messages";
import { coerceNetworkRole, coercePlanName, coerceVerifiedVeterinarian } from "@/lib/access";
import { hasSupabaseConfig } from "@/lib/supabase/config";
import { AlertGate } from "@/modules/alerts/alert-gate";
import { AlertCenterPage } from "@/modules/alerts/alert-center-page";
import { PortfolioWorkspace } from "@/modules/dashboards/portfolio-workspace";
import type { MemberProfile } from "@querencia/contracts";

interface MonitoringRouteProps {
  params: { locale: string };
}

export default async function MonitoringRoute({ params }: MonitoringRouteProps) {
  const locale = (params.locale === "en" ? "en" : "es") as SupportedLocale;
  const messages = getMessages(locale);

  let memberProfile: MemberProfile | null = DEMO_MODE ? DEMO_PROFILE : null;
  let portfolios: typeof DEMO_PORTFOLIOS = DEMO_MODE ? DEMO_PORTFOLIOS : [];
  let watchAreas: typeof DEMO_WATCH_AREAS = DEMO_MODE ? DEMO_WATCH_AREAS : [];

  if (hasSupabaseConfig()) {
    try {
      const supabase = await createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        if (profile) {
          const planName = coercePlanName(profile.plan_name, profile.access_tier);
          memberProfile = {
            id: profile.id,
            displayName: profile.display_name ?? null,
            preferredLocale: (profile.preferred_locale ?? "es") as SupportedLocale,
            planName,
            networkRole: coerceNetworkRole(profile.network_role, planName),
            isVerifiedVeterinarian: coerceVerifiedVeterinarian(
              profile.is_verified_veterinarian,
              planName,
            ),
            veterinaryNetworkId: profile.veterinary_network_id ?? null,
            veterinaryNetworkName: profile.veterinary_network_name ?? null,
            createdAt: profile.created_at,
            updatedAt: profile.updated_at,
          };

          if (planName === "coordinator") {
            const [{ data: pData }, { data: wData }] = await Promise.all([
              supabase
                .from("monitoring_portfolios")
                .select("*")
                .eq("user_id", user.id)
                .order("created_at", { ascending: true }),
              supabase
                .from("watch_areas")
                .select("*")
                .eq("user_id", user.id)
                .order("created_at", { ascending: true }),
            ]);

            portfolios = pData ?? [];
            watchAreas = wData ?? [];
          }
        }
      }
    } catch {
      // Fall back to demo or gated UI instead of crashing the route.
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-7 md:px-14 py-14 space-y-12">
      <section className="border border-ink bg-white p-6">
        <p className="font-label text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-primary">
          {messages.monitoring.eyebrow}
        </p>
        <h1 className="mt-2 font-headline text-4xl font-extrabold tracking-tighter md:text-5xl">
          {messages.monitoring.title}
        </h1>
        <p className="mt-4 max-w-3xl font-body text-sm leading-relaxed text-ink/80">
          {messages.monitoring.subtitle}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="border border-ink px-3 py-1 font-label text-[0.625rem] font-bold uppercase tracking-[0.16em] text-ink/70">
            {messages.monitoring.focusAlerts}
          </span>
          <span className="border border-ink px-3 py-1 font-label text-[0.625rem] font-bold uppercase tracking-[0.16em] text-ink/70">
            {messages.monitoring.focusWatch}
          </span>
          <span className="border border-ink px-3 py-1 font-label text-[0.625rem] font-bold uppercase tracking-[0.16em] text-ink/70">
            {messages.monitoring.focusCoordination}
          </span>
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <div className="border border-ink/15 px-4 py-4">
            <p className="font-label text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-ink/55">
              {messages.monitoring.focusWatch}
            </p>
            <p className="mt-2 font-headline text-3xl font-bold text-ink">
              {watchAreas.length}
            </p>
          </div>
          <div className="border border-ink/15 px-4 py-4">
            <p className="font-label text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-ink/55">
              {messages.workspace.portfolios}
            </p>
            <p className="mt-2 font-headline text-3xl font-bold text-ink">
              {portfolios.length}
            </p>
          </div>
          <div className="border border-ink/15 px-4 py-4">
            <p className="font-label text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-ink/55">
              {messages.account.plan}
            </p>
            <p className="mt-2 font-headline text-2xl font-bold text-ink">
              {memberProfile?.planName ?? "public"}
            </p>
          </div>
        </div>
      </section>

      <AlertGate profile={memberProfile}>
        <div className="space-y-12">
          <section className="space-y-5">
            <div className="space-y-2">
              <h2 className="font-headline text-3xl font-extrabold tracking-tighter">
                {messages.monitoring.alertsTitle}
              </h2>
              <p className="max-w-3xl font-body text-sm leading-relaxed text-ink/75">
                {messages.monitoring.alertsSubtitle}
              </p>
            </div>
            <AlertCenterPage
              profile={memberProfile}
              initialWatchAreas={watchAreas.map((area) => ({
                id: area.id,
                userId: area.user_id,
                label: area.label,
                animalTypes: area.animal_types as AnimalType[],
                regionIds: area.region_ids ?? [],
                portfolioId: area.portfolio_id ?? undefined,
                isActive: area.is_active,
                createdAt: area.created_at,
                updatedAt: area.updated_at,
              }))}
            />
          </section>

          {memberProfile?.planName === "coordinator" && (
            <section className="space-y-5 border-t border-ink pt-10">
              <div className="space-y-2">
                <h2 className="font-headline text-3xl font-extrabold tracking-tighter">
                  {messages.monitoring.coordinationTitle}
                </h2>
                <p className="max-w-3xl font-body text-sm leading-relaxed text-ink/75">
                  {messages.monitoring.coordinationSubtitle}
                </p>
              </div>
              <PortfolioWorkspace
                initialPortfolios={portfolios}
                initialWatchAreas={watchAreas}
                readOnly={DEMO_MODE || !hasSupabaseConfig()}
              />
            </section>
          )}
        </div>
      </AlertGate>
    </div>
  );
}
