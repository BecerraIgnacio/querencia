"use client";

import { createClient } from "@/lib/supabase/client";
import { useLocale } from "@/i18n/locale-context";
import { useRouter } from "next/navigation";

interface AuthButtonProps {
  isAuthenticated: boolean;
}

export function AuthButton({ isAuthenticated }: AuthButtonProps) {
  const { locale, messages } = useLocale();
  const router = useRouter();
  const supabase = createClient();

  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  if (isAuthenticated) {
    return (
      <button
        onClick={handleSignOut}
        className="px-6 py-3 border border-ink font-label text-[0.6875rem] font-bold uppercase tracking-[0.2em] hover:bg-ink hover:text-white transition-colors"
      >
        {messages.account.signOut}
      </button>
    );
  }

  return (
    <button
      onClick={handleSignIn}
      className="bg-primary text-white px-6 py-3 font-label text-[0.6875rem] font-bold uppercase tracking-[0.2em] hover:bg-ink transition-colors"
    >
      {messages.account.signIn}
    </button>
  );
}
