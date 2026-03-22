import type { MemberProfile } from "@querencia/contracts";
import { LocalePreferenceForm } from "./locale-preference-form";
import { PlanBadge } from "./plan-badge";
import { User } from "lucide-react";

interface ProfileShellProps {
  profile: MemberProfile;
}

export function ProfileShell({ profile }: ProfileShellProps) {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-6">
        <div className="w-16 h-16 bg-ink flex items-center justify-center text-white">
          <User size={28} strokeWidth={1.5} />
        </div>
        <div>
          <h2 className="font-headline text-2xl font-bold">
            {profile.displayName ?? profile.id}
          </h2>
          <PlanBadge planName={profile.planName} />
        </div>
      </div>

      <div className="h-px bg-ink" />

      <LocalePreferenceForm
        currentLocale={profile.preferredLocale}
        userId={profile.id}
      />
    </div>
  );
}
