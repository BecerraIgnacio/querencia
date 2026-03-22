import type { SupportedLocale } from "@querencia/core-domain";
import { createClient } from "@/lib/supabase/server";
import { DEMO_MODE, DEMO_PROFILE } from "@/lib/demo-fixtures";
import { getMessages } from "@/i18n/get-messages";
import { coerceNetworkRole, coercePlanName, coerceVerifiedVeterinarian } from "@/lib/access";
import { hasSupabaseConfig } from "@/lib/supabase/config";
import { ReportGate } from "@/modules/reporting/report-gate";
import { ReportForm } from "@/modules/reporting/report-form";
import type { MemberProfile } from "@querencia/contracts";

interface ReportRouteProps {
  params: { locale: string };
}

export default async function ReportRoute({ params }: ReportRouteProps) {
  const locale = (params.locale === "en" ? "en" : "es") as SupportedLocale;
  const messages = getMessages(locale);
  let memberProfile: MemberProfile | null = DEMO_MODE ? DEMO_PROFILE : null;

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
        }
      }
    } catch {
      // Fall back to the gated UI instead of crashing the route.
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-7 md:px-14 py-14">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start">
        <div className="min-w-0">
          <h1 className="font-headline text-5xl font-extrabold tracking-tighter mb-2">
            {messages.reporting.title}
          </h1>
          <p className="max-w-3xl font-body text-sm leading-relaxed text-ink/80 mb-4">
            {messages.reporting.subtitle}
          </p>
          <div className="h-px bg-ink mb-12" />
          <ReportGate profile={memberProfile}>
            <ReportForm profile={memberProfile ?? DEMO_PROFILE} />
          </ReportGate>
        </div>

        <aside className="space-y-5 lg:sticky lg:top-[calc(var(--app-header-height)+2rem)]">
          <section className="border border-ink bg-white p-5">
            <p className="font-label text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-primary">
              {messages.reporting.guideTitle}
            </p>
            <div className="mt-4 space-y-4">
              <div className="border border-ink/15 px-4 py-4">
                <div className="font-label text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-ink/55">
                  {messages.reporting.selectDisease}
                </div>
                <p className="mt-2 font-body text-sm leading-relaxed text-ink/75">
                  {messages.reporting.guideDisease}
                </p>
              </div>
              <div className="border border-ink/15 px-4 py-4">
                <div className="font-label text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-ink/55">
                  {messages.reporting.evidenceSummary}
                </div>
                <p className="mt-2 font-body text-sm leading-relaxed text-ink/75">
                  {messages.reporting.guideEvidence}
                </p>
              </div>
              <div className="border border-ink/15 px-4 py-4">
                <div className="font-label text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-ink/55">
                  {messages.reporting.selectRegion}
                </div>
                <p className="mt-2 font-body text-sm leading-relaxed text-ink/75">
                  {messages.reporting.guideRegion}
                </p>
              </div>
            </div>
          </section>

          <section className="border border-ink bg-white p-5">
            <p className="font-label text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-primary">
              {messages.reporting.nextTitle}
            </p>
            <ol className="mt-4 space-y-4">
              {[messages.reporting.nextOne, messages.reporting.nextTwo, messages.reporting.nextThree].map((step, index) => (
                <li key={step} className="grid grid-cols-[1.75rem_minmax(0,1fr)] gap-3">
                  <span className="inline-flex h-7 w-7 items-center justify-center border border-ink font-label text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-primary">
                    {index + 1}
                  </span>
                  <span className="font-body text-sm leading-relaxed text-ink/75">
                    {step}
                  </span>
                </li>
              ))}
            </ol>
          </section>
        </aside>
      </div>
    </div>
  );
}
