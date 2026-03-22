"use client";

import type { MemberProfile } from "@querencia/contracts";
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

  return (
    <div className="max-w-lg space-y-14">
      <ProfileShell profile={profile} />

      <section className="space-y-4">
        <h3 className="font-headline text-2xl font-bold">{messages.account.plan}</h3>
        <div className="h-px bg-ink" />
        <EntitlementSummary planName={profile.planName} />
      </section>

      <UpgradePrompt currentPlan={profile.planName} />

      <AuthButton isAuthenticated={true} />
    </div>
  );
}
