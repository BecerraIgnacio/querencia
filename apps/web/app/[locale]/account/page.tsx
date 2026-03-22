import type { SupportedLocale } from "@querencia/core-domain";
import { createClient } from "@/lib/supabase/server";
import { DEMO_MODE, DEMO_PROFILE } from "@/lib/demo-fixtures";
import { coerceNetworkRole, coercePlanName, coerceVerifiedVeterinarian } from "@/lib/access";
import { AuthButton } from "@/modules/account-plan/auth-button";
import { AccountPage } from "@/modules/account-plan/account-page";
import { redirect } from "next/navigation";

interface AccountRouteProps {
  params: { locale: string };
}

export default async function AccountRoute({ params }: AccountRouteProps) {
  const locale = (params.locale === "en" ? "en" : "es") as SupportedLocale;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user && !DEMO_MODE) {
    return (
      <div className="max-w-6xl mx-auto px-7 md:px-14 py-14 flex flex-col items-center gap-8">
        <h1 className="font-headline text-5xl font-extrabold tracking-tighter">
          Account
        </h1>
        <div className="h-px bg-ink w-full max-w-sm" />
        <AuthButton isAuthenticated={false} />
      </div>
    );
  }

  let memberProfile;

  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (!profile) {
      redirect(`/${locale}`);
    }

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
  } else {
    memberProfile = DEMO_PROFILE;
  }

  return (
    <div className="max-w-6xl mx-auto px-7 md:px-14 py-14">
      <AccountPage profile={memberProfile} />
    </div>
  );
}
