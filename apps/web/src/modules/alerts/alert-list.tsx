"use client";

import type { LocalizedAlert } from "@querencia/contracts";
import { useLocale } from "@/i18n/locale-context";
import { AlertCard } from "./alert-card";

interface AlertListProps {
  alerts: LocalizedAlert[];
  onMarkRead: (id: string) => void;
}

export function AlertList({ alerts, onMarkRead }: AlertListProps) {
  const { messages } = useLocale();

  if (alerts.length === 0) {
    return (
      <div className="border border-ink border-dashed p-12 text-center">
        <p className="font-headline text-xl font-bold text-ink/60">
          {messages.alerts.empty}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {alerts.map((alert) => (
        <AlertCard key={alert.id} alert={alert} onMarkRead={onMarkRead} />
      ))}
    </div>
  );
}
