"use client";

import { useState } from "react";
import { useLocale } from "@/i18n/locale-context";
import { createClient } from "@/lib/supabase/client";

interface PortfolioRow {
  id: string;
  user_id: string;
  name: string;
  description: string | null;
  is_default: boolean;
  created_at: string;
  updated_at: string;
}

interface PortfolioFormProps {
  existing: PortfolioRow | null;
  onSave: () => void;
  onCancel: () => void;
}

export function PortfolioForm({ existing, onSave, onCancel }: PortfolioFormProps) {
  const { messages } = useLocale();

  const [name, setName] = useState(existing?.name ?? "");
  const [description, setDescription] = useState(existing?.description ?? "");
  const [isDefault, setIsDefault] = useState(existing?.is_default ?? false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setSubmitting(true);
    setError(null);

    try {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setError("Authentication required");
        setSubmitting(false);
        return;
      }

      /* If setting as default, clear other defaults first */
      if (isDefault) {
        await supabase
          .from("monitoring_portfolios")
          .update({ is_default: false, updated_at: new Date().toISOString() })
          .eq("user_id", user.id)
          .eq("is_default", true);
      }

      if (existing) {
        const { error: updateError } = await supabase
          .from("monitoring_portfolios")
          .update({
            name: name.trim(),
            description: description.trim() || null,
            is_default: isDefault,
            updated_at: new Date().toISOString(),
          })
          .eq("id", existing.id);

        if (updateError) {
          setError(updateError.message);
          setSubmitting(false);
          return;
        }
      } else {
        const { error: insertError } = await supabase
          .from("monitoring_portfolios")
          .insert({
            user_id: user.id,
            name: name.trim(),
            description: description.trim() || null,
            is_default: isDefault,
          });

        if (insertError) {
          setError(insertError.message);
          setSubmitting(false);
          return;
        }
      }

      onSave();
    } catch {
      setError("Unexpected error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border border-ink p-8 space-y-8">
      <h3 className="font-headline text-2xl font-bold text-ink">
        {existing ? messages.workspace.editPortfolio : messages.workspace.createPortfolio}
      </h3>

      {/* Name */}
      <div className="space-y-3">
        <label
          htmlFor="pf-name"
          className="font-label text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-ink block"
        >
          {messages.workspace.portfolioName}
        </label>
        <input
          id="pf-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full border border-ink bg-surface px-4 py-3 font-label text-sm text-ink focus:outline-none focus:ring-1 focus:ring-ink"
        />
      </div>

      {/* Description */}
      <div className="space-y-3">
        <label
          htmlFor="pf-desc"
          className="font-label text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-ink block"
        >
          {messages.workspace.portfolioDescription}
        </label>
        <textarea
          id="pf-desc"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="w-full border border-ink bg-surface px-4 py-3 font-label text-sm text-ink focus:outline-none focus:ring-1 focus:ring-ink resize-none"
        />
      </div>

      {/* Default toggle */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => setIsDefault(!isDefault)}
          className={`px-6 py-3 border font-label text-[0.6875rem] font-bold uppercase tracking-[0.2em] transition-colors ${
            isDefault
              ? "bg-ink text-white border-ink"
              : "border-ink text-ink hover:bg-ink hover:text-white"
          }`}
        >
          {messages.workspace.setAsDefault}
        </button>
        {isDefault && (
          <span className="font-label text-[0.6875rem] text-ink/50 uppercase tracking-[0.1em]">
            {messages.workspace.default}
          </span>
        )}
      </div>

      {/* Error */}
      {error && (
        <p className="font-label text-sm text-primary font-bold">{error}</p>
      )}

      {/* Actions */}
      <div className="flex gap-4">
        <button
          type="submit"
          disabled={submitting || !name.trim()}
          className="bg-primary text-white px-8 py-3 font-label text-[0.6875rem] font-bold uppercase tracking-[0.2em] hover:bg-ink transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {messages.workspace.save}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="border border-ink px-8 py-3 font-label text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-ink hover:bg-ink hover:text-white transition-colors"
        >
          {messages.workspace.cancel}
        </button>
      </div>
    </form>
  );
}
