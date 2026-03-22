"use client";

import { useState } from "react";
import type { SupportedLocale } from "@querencia/core-domain";
import { createClient } from "@/lib/supabase/client";
import { DEMO_MODE } from "@/lib/demo-fixtures";
import { hasSupabaseConfig } from "@/lib/supabase/config";
import { useLocale } from "@/i18n/locale-context";

interface LocalePreferenceFormProps {
  currentLocale: SupportedLocale;
  userId: string;
}

export function LocalePreferenceForm({
  currentLocale,
  userId,
}: LocalePreferenceFormProps) {
  const { messages } = useLocale();
  const [selected, setSelected] = useState<SupportedLocale>(currentLocale);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (DEMO_MODE || !hasSupabaseConfig()) {
      return;
    }

    setSaving(true);
    const supabase = createClient();
    await supabase
      .from("profiles")
      .update({ preferred_locale: selected })
      .eq("id", userId);
    setSaving(false);
  };

  return (
    <div className="space-y-4">
      <label className="font-label text-[0.6875rem] font-black tracking-widest uppercase block">
        {messages.account.preferredLocale}
      </label>
      <div className="flex gap-0">
        {(["es", "en"] as SupportedLocale[]).map((locale) => (
          <button
            key={locale}
            onClick={() => setSelected(locale)}
            className={`px-6 py-3 border border-ink font-label text-[0.6875rem] font-bold uppercase tracking-widest transition-colors ${
              selected === locale
                ? "bg-ink text-white"
                : "bg-transparent text-ink hover:bg-surface-container"
            }`}
          >
            {locale === "es" ? "Espanol" : "English"}
          </button>
        ))}
      </div>
      <button
        onClick={handleSave}
        disabled={saving || DEMO_MODE || !hasSupabaseConfig()}
        className="bg-primary text-white px-6 py-3 font-label text-[0.6875rem] font-bold uppercase tracking-[0.2em] hover:bg-ink transition-colors disabled:opacity-50"
      >
        {DEMO_MODE || !hasSupabaseConfig()
          ? messages.account.preferredLocale
          : saving
            ? "\u2026"
            : messages.account.save}
      </button>
    </div>
  );
}
