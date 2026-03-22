"use client";

import { useState } from "react";
import type { WatchArea } from "@querencia/contracts";
import { useLocale } from "@/i18n/locale-context";
import { createClient } from "@/lib/supabase/client";
import { WATCH_REGION_OPTIONS } from "@/data/seed-map-data";

interface WatchAreaFormProps {
  existing?: WatchArea;
  onSave: () => void;
  onCancel: () => void;
}

export function WatchAreaForm({
  existing,
  onSave,
  onCancel,
}: WatchAreaFormProps) {
  const { messages } = useLocale();
  const [label, setLabel] = useState(existing?.label ?? "");
  const [regionIds, setRegionIds] = useState(existing?.regionIds ?? []);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggleRegion = (regionId: string) => {
    setRegionIds((prev) =>
      prev.includes(regionId)
        ? prev.filter((item) => item !== regionId)
        : [...prev, regionId],
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!label.trim() || regionIds.length === 0) {
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setError(messages.alerts.signInRequired);
        setSubmitting(false);
        return;
      }

      const payload = {
        label: label.trim(),
        animal_types: ["avian"],
        region_ids: regionIds,
        updated_at: new Date().toISOString(),
      };

      if (existing) {
        const { error: updateError } = await supabase
          .from("watch_areas")
          .update(payload)
          .eq("id", existing.id);

        if (updateError) {
          setError(updateError.message);
          setSubmitting(false);
          return;
        }
      } else {
        const { error: insertError } = await supabase.from("watch_areas").insert({
          user_id: user.id,
          label: label.trim(),
          animal_types: ["avian"],
          region_ids: regionIds,
          is_active: true,
        });

        if (insertError) {
          setError(insertError.message);
          setSubmitting(false);
          return;
        }
      }

      onSave();
    } catch {
      setError(messages.reporting.error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border border-ink p-8 space-y-8">
      <div className="space-y-2">
        <h3 className="font-headline text-2xl font-bold text-ink">
          {existing ? messages.alerts.editWatchArea : messages.alerts.addWatchArea}
        </h3>
        <p className="font-label text-sm text-ink/70">
          {messages.alerts.avianPilotOnly}
        </p>
      </div>

      <div className="space-y-3">
        <label
          htmlFor="wa-label"
          className="font-label text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-ink block"
        >
          {messages.alerts.watchAreaLabel}
        </label>
        <input
          id="wa-label"
          type="text"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          required
          className="w-full border border-ink bg-surface px-4 py-3 font-label text-sm text-ink focus:outline-none focus:ring-1 focus:ring-ink"
        />
      </div>

      <fieldset className="space-y-3">
        <legend className="font-label text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-ink">
          {messages.alerts.watchAreaAnimals}
        </legend>
        <div className="inline-flex border border-ink bg-ink text-white px-6 py-3 font-label text-[0.6875rem] font-bold uppercase tracking-[0.2em]">
          {messages.animals.avian}
        </div>
      </fieldset>

      <fieldset className="space-y-3">
        <legend className="font-label text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-ink">
          {messages.alerts.watchAreaRegions}
        </legend>
        <div className="grid gap-3 sm:grid-cols-2">
          {WATCH_REGION_OPTIONS.map((region) => {
            const selected = regionIds.includes(region.id);
            return (
              <button
                key={region.id}
                type="button"
                onClick={() => toggleRegion(region.id)}
                className={`border px-4 py-3 text-left transition-colors ${
                  selected
                    ? "border-ink bg-ink text-white"
                    : "border-ink/30 text-ink hover:border-ink"
                }`}
              >
                <span className="font-label text-[0.6875rem] font-bold uppercase tracking-[0.2em]">
                  {region.label}
                </span>
              </button>
            );
          })}
        </div>
      </fieldset>

      {error && (
        <p className="font-label text-sm text-primary font-bold">{error}</p>
      )}

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={submitting || !label.trim() || regionIds.length === 0}
          className="bg-primary text-white px-8 py-3 font-label text-[0.6875rem] font-bold uppercase tracking-[0.2em] hover:bg-ink transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {messages.alerts.save}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="border border-ink px-8 py-3 font-label text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-ink hover:bg-ink hover:text-white transition-colors"
        >
          {messages.alerts.cancel}
        </button>
      </div>
    </form>
  );
}
