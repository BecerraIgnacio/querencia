"use client";

import type { LocalizedAlert, AlertSeverity } from "@querencia/contracts";
import { useLocale } from "@/i18n/locale-context";

interface AlertCardProps {
  alert: LocalizedAlert;
  onMarkRead: (id: string) => void;
}

const SEVERITY_COLORS: Record<AlertSeverity, string> = {
  critical: "bg-primary text-white",
  high: "bg-orange-600 text-white",
  medium: "bg-yellow-600 text-white",
  low: "bg-green-600 text-white",
};

function formatTime(iso: string, locale: string): string {
  const date = new Date(iso);
  return date.toLocaleDateString(locale === "en" ? "en-US" : "es-ES", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function AlertCard({ alert, onMarkRead }: AlertCardProps) {
  const { locale, messages } = useLocale();

  return (
    <div
      className={`border border-ink bg-white p-6 space-y-4 ${
        !alert.read ? "border-l-4 border-l-primary" : ""
      }`}
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="space-y-3 flex-1">
          <div className="flex items-center gap-3">
            <span
              className={`inline-block px-3 py-1 font-label text-[0.6875rem] font-bold uppercase tracking-[0.2em] ${SEVERITY_COLORS[alert.severity]}`}
            >
              {alert.severity}
            </span>
            {!alert.read && (
              <span className="inline-block w-2 h-2 rounded-full bg-primary" />
            )}
          </div>
          <h3 className="font-headline text-xl font-bold text-ink">
            {alert.title}
          </h3>
          <p className="font-label text-sm text-ink/70">{alert.message}</p>
          <div className="flex flex-wrap gap-2">
            {alert.regionId && (
              <span className="inline-block border border-ink px-3 py-1 font-label text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-ink">
                {alert.regionId}
              </span>
            )}
            <span className="inline-block border border-ink px-3 py-1 font-label text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-ink">
              {alert.source.replaceAll("_", " ")}
            </span>
            <span className="inline-block border border-ink px-3 py-1 font-label text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-ink">
              {alert.confidenceStatus}
            </span>
          </div>
          <div className="grid gap-3 border-t border-ink/10 pt-3 sm:grid-cols-2">
            <div>
              <div className="font-label text-[0.625rem] font-bold uppercase tracking-[0.16em] text-ink/45">
                {messages.alerts.triggeredAt}
              </div>
              <p className="mt-1 font-body text-sm text-ink/75">
                {formatTime(alert.triggeredAt, locale)}
              </p>
            </div>
            <div>
              <div className="font-label text-[0.625rem] font-bold uppercase tracking-[0.16em] text-ink/45">
                {messages.alerts.settings}
              </div>
              <p className="mt-1 font-body text-sm text-ink/75">
                {alert.source.replaceAll("_", " ")} / {alert.confidenceStatus}
              </p>
            </div>
          </div>
        </div>
        {!alert.read && (
          <button
            onClick={() => onMarkRead(alert.id)}
            className="border border-ink px-4 py-3 font-label text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-ink hover:bg-ink hover:text-white transition-colors shrink-0 md:self-start"
          >
            {messages.alerts.markRead}
          </button>
        )}
      </div>
    </div>
  );
}
