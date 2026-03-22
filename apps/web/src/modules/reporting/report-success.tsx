"use client";

import type { ReportStatus } from "@querencia/contracts";
import { useLocale } from "@/i18n/locale-context";

interface ReportSuccessProps {
  status: ReportStatus;
  onReset: () => void;
}

export function ReportSuccess({ status, onReset }: ReportSuccessProps) {
  const { messages } = useLocale();

  const statusMessage =
    status === "confirmed"
      ? messages.reporting.confirmed
      : messages.reporting.pending;

  return (
    <div className="border border-ink p-12 text-center space-y-8">
      <div className="space-y-4">
        <div className="w-16 h-16 border-2 border-primary mx-auto flex items-center justify-center">
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="square"
            className="text-primary"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h2 className="font-headline text-3xl font-bold text-ink">
          {messages.reporting.success}
        </h2>
        <p className="font-label text-sm text-ink/70">{statusMessage}</p>
      </div>
      <button
        onClick={onReset}
        className="border border-ink px-8 py-3 font-label text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-ink hover:bg-ink hover:text-white transition-colors"
      >
        {messages.reporting.reportAnother}
      </button>
    </div>
  );
}
