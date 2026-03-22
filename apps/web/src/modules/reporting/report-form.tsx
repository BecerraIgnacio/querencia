"use client";

import { useMemo, useState } from "react";
import type { MemberProfile, ReportStatus } from "@querencia/contracts";
import type { DiseaseId } from "@querencia/core-domain";
import { useLocale } from "@/i18n/locale-context";
import { createClient } from "@/lib/supabase/client";
import { SEED_DISEASES } from "@/data/seed-diseases";
import { WATCH_REGION_OPTIONS } from "@/data/seed-map-data";
import { ReportSuccess } from "./report-success";

interface ReportFormProps {
  profile: MemberProfile;
}

export function ReportForm({ profile }: ReportFormProps) {
  const { locale, messages } = useLocale();
  const [diseaseId, setDiseaseId] = useState<DiseaseId | "">("");
  const [regionId, setRegionId] = useState("");
  const [reportedAt, setReportedAt] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [caseCountEstimate, setCaseCountEstimate] = useState("");
  const [evidenceSummary, setEvidenceSummary] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successStatus, setSuccessStatus] = useState<ReportStatus | null>(null);

  const filteredDiseases = useMemo(
    () => SEED_DISEASES.filter((d) => d.animalTypes.includes("avian")),
    [],
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!diseaseId || !regionId) {
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
        setError(messages.reporting.signInRequired);
        setSubmitting(false);
        return;
      }

      const payload = {
        user_id: user.id,
        disease_id: diseaseId,
        animal_type: "avian",
        source: "verified_veterinarian",
        status: "submitted",
        reported_at: new Date(reportedAt).toISOString(),
        region_id: regionId,
        case_count_estimate: caseCountEstimate ? Number(caseCountEstimate) : null,
        evidence_summary: evidenceSummary.trim() || null,
        notes: notes.trim() || null,
        notes_locale: notes.trim() ? locale : null,
        veterinary_network_id: profile.veterinaryNetworkId,
        reporter_role: profile.networkRole,
        reporter_is_verified_veterinarian: profile.isVerifiedVeterinarian,
      };

      const { error: insertError } = await supabase.from("reports").insert(payload);

      if (insertError) {
        setError(messages.reporting.error);
        setSubmitting(false);
        return;
      }

      setSuccessStatus("submitted");
    } catch {
      setError(messages.reporting.error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setSuccessStatus(null);
    setDiseaseId("");
    setRegionId("");
    setReportedAt(new Date().toISOString().split("T")[0]);
    setCaseCountEstimate("");
    setEvidenceSummary("");
    setNotes("");
    setError(null);
  };

  if (successStatus) {
    return <ReportSuccess status={successStatus} onReset={handleReset} />;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      <div className="border border-ink border-dashed p-6 space-y-2">
        <p className="font-label text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-ink/60">
          {messages.reporting.operationalPilot}
        </p>
        <p className="font-headline text-2xl font-bold text-ink">
          {messages.reporting.avianOnly}
        </p>
        <p className="font-label text-sm text-ink/70">
          {messages.reporting.confidentialNotice}
        </p>
      </div>

      <div className="space-y-3">
        <label
          htmlFor="disease"
          className="font-label text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-ink block"
        >
          {messages.reporting.selectDisease}
        </label>
        <select
          id="disease"
          value={diseaseId}
          onChange={(e) => setDiseaseId(e.target.value as DiseaseId)}
          required
          className="w-full border border-ink bg-surface px-4 py-3 font-label text-sm text-ink appearance-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-ink"
        >
          <option value="" disabled>
            —
          </option>
          {filteredDiseases.map((disease) => (
            <option key={disease.id} value={disease.id}>
              {disease.name[locale]}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-3">
        <label
          htmlFor="region"
          className="font-label text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-ink block"
        >
          {messages.reporting.selectRegion}
        </label>
        <select
          id="region"
          value={regionId}
          onChange={(e) => setRegionId(e.target.value)}
          required
          className="w-full border border-ink bg-surface px-4 py-3 font-label text-sm text-ink appearance-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-ink"
        >
          <option value="" disabled>
            —
          </option>
          {WATCH_REGION_OPTIONS.map((region) => (
            <option key={region.id} value={region.id}>
              {region.label}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-3">
        <label
          htmlFor="reportedAt"
          className="font-label text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-ink block"
        >
          {messages.reporting.reportedDate}
        </label>
        <input
          id="reportedAt"
          type="date"
          value={reportedAt}
          onChange={(e) => setReportedAt(e.target.value)}
          required
          className="w-full border border-ink bg-surface px-4 py-3 font-label text-sm text-ink focus:outline-none focus:ring-1 focus:ring-ink"
        />
      </div>

      <div className="space-y-3">
        <label
          htmlFor="caseCountEstimate"
          className="font-label text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-ink block"
        >
          {messages.reporting.caseCountEstimate}
        </label>
        <input
          id="caseCountEstimate"
          type="number"
          min="0"
          step="1"
          value={caseCountEstimate}
          onChange={(e) => setCaseCountEstimate(e.target.value)}
          placeholder={messages.reporting.caseCountHint}
          className="w-full border border-ink bg-surface px-4 py-3 font-label text-sm text-ink placeholder:text-ink/40 focus:outline-none focus:ring-1 focus:ring-ink"
        />
      </div>

      <div className="space-y-3">
        <label
          htmlFor="evidenceSummary"
          className="font-label text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-ink block"
        >
          {messages.reporting.evidenceSummary}
        </label>
        <textarea
          id="evidenceSummary"
          value={evidenceSummary}
          onChange={(e) => setEvidenceSummary(e.target.value)}
          rows={3}
          placeholder={messages.reporting.evidenceHint}
          className="w-full border border-ink bg-surface px-4 py-3 font-label text-sm text-ink placeholder:text-ink/40 resize-vertical focus:outline-none focus:ring-1 focus:ring-ink"
        />
      </div>

      <div className="space-y-3">
        <label
          htmlFor="notes"
          className="font-label text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-ink block"
        >
          {messages.reporting.notes}
        </label>
        <textarea
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={4}
          placeholder={messages.reporting.notesHint}
          className="w-full border border-ink bg-surface px-4 py-3 font-label text-sm text-ink placeholder:text-ink/40 resize-vertical focus:outline-none focus:ring-1 focus:ring-ink"
        />
      </div>

      {error && (
        <p className="font-label text-sm text-primary font-bold">{error}</p>
      )}

      <button
        type="submit"
        disabled={submitting || !diseaseId || !regionId}
        className="bg-primary text-white px-10 py-4 font-label text-[0.6875rem] font-bold uppercase tracking-[0.2em] hover:bg-ink transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {submitting ? messages.reporting.submitting : messages.reporting.submit}
      </button>
    </form>
  );
}
