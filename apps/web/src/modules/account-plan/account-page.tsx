"use client";

import type { MemberProfile } from "@querencia/contracts";
import { DEMO_MODE } from "@/lib/demo-fixtures";
import { useLocale } from "@/i18n/locale-context";
import { ProfileShell } from "./profile-shell";
import { EntitlementSummary } from "./entitlement-summary";
import { UpgradePrompt } from "./upgrade-prompt";
import { AuthButton } from "./auth-button";

interface AccountPageProps {
  profile: MemberProfile;
}

export function AccountPage({ profile }: AccountPageProps) {
  const { messages } = useLocale();
  const readOnly = DEMO_MODE;

  return (
    <div className="max-w-lg space-y-14">
      <ProfileShell profile={profile} readOnly={readOnly} />

      <section className="space-y-4">
        <h3 className="font-headline text-2xl font-bold">{messages.account.plan}</h3>
        <div className="h-px bg-ink" />
        <EntitlementSummary planName={profile.planName} />
      </section>

      {!readOnly && <UpgradePrompt currentPlan={profile.planName} />}

      {readOnly ? (
        <div className="border border-ink border-dashed p-8 text-center space-y-3">
          <p className="font-label text-[0.6875rem] font-bold uppercase tracking-widest opacity-50">
            Demo access
          </p>
          <p className="font-body text-sm leading-relaxed text-ink/75">
            This account surface is shown as a read-only demo. No sign-in is required.
          </p>
        </div>
      ) : (
        <AuthButton isAuthenticated={true} />
      )}
    </div>
  );
}
