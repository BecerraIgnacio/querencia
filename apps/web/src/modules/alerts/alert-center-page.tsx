"use client";

import { useState, useEffect, useCallback } from "react";
import type { MemberProfile, Alert, LocalizedAlert, WatchArea } from "@querencia/contracts";
import { localizeAlert } from "@querencia/contracts";
import { getEntitlements } from "@querencia/authz";
import { useLocale } from "@/i18n/locale-context";
import { createClient } from "@/lib/supabase/client";
import { AlertList } from "./alert-list";
import { WatchAreaList } from "./watch-area-list";

interface AlertCenterPageProps {
  profile: MemberProfile | null;
}

type Tab = "alerts" | "watchAreas";

export function AlertCenterPage({ profile }: AlertCenterPageProps) {
  const { locale, messages } = useLocale();
  const [activeTab, setActiveTab] = useState<Tab>("alerts");
  const [alerts, setAlerts] = useState<LocalizedAlert[]>([]);
  const [watchAreas, setWatchAreas] = useState<WatchArea[]>([]);
  const [loading, setLoading] = useState(true);

  const planName = profile?.planName ?? "public";
  const entitlements = getEntitlements(planName);

  const fetchAlerts = useCallback(async () => {
    const supabase = createClient();
    const { data } = await supabase
      .from("alerts")
      .select("*")
      .order("triggered_at", { ascending: false });

    if (data) {
      const localized = data.map((row) => {
        const alert: Alert = {
          id: row.id,
          userId: row.user_id,
          watchAreaId: row.watch_area_id,
          diseaseId: row.disease_id,
          animalType: row.animal_type,
          severity: row.severity,
          source: row.source ?? "verified_veterinarian",
          confidenceStatus: row.confidence_status ?? "screened",
          titleEn: row.title_en,
          titleEs: row.title_es,
          messageEn: row.message_en,
          messageEs: row.message_es,
          regionId: row.region_id ?? row.hex_cell_id ?? null,
          triggeredAt: row.triggered_at,
          read: row.read,
          createdAt: row.created_at,
        };
        return localizeAlert(alert, locale);
      });
      setAlerts(localized);
    }
  }, [locale]);

  const fetchWatchAreas = useCallback(async () => {
    const supabase = createClient();
    const { data } = await supabase
      .from("watch_areas")
      .select("*")
      .order("created_at", { ascending: false });

    if (data) {
      setWatchAreas(
        data.map((row) => ({
          id: row.id,
          userId: row.user_id,
          label: row.label,
          animalTypes: row.animal_types ?? ["avian"],
          regionIds: row.region_ids ?? row.hex_cell_ids ?? [],
          portfolioId: row.portfolio_id ?? undefined,
          isActive: row.is_active,
          createdAt: row.created_at,
          updatedAt: row.updated_at,
        })),
      );
    }
  }, []);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    await Promise.all([fetchAlerts(), fetchWatchAreas()]);
    setLoading(false);
  }, [fetchAlerts, fetchWatchAreas]);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const handleMarkRead = async (id: string) => {
    const supabase = createClient();
    await supabase.from("alerts").update({ read: true }).eq("id", id);
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, read: true } : a)),
    );
  };

  const handleMarkAllRead = async () => {
    const supabase = createClient();
    const unreadIds = alerts.filter((a) => !a.read).map((a) => a.id);
    if (unreadIds.length === 0) return;
    await supabase.from("alerts").update({ read: true }).in("id", unreadIds);
    setAlerts((prev) => prev.map((a) => ({ ...a, read: true })));
  };

  const unreadCount = alerts.filter((a) => !a.read).length;
  const activeWatchCount = watchAreas.filter((area) => area.isActive).length;

  if (loading) {
    return (
      <div className="border border-ink border-dashed p-12 text-center">
        <div className="inline-block w-6 h-6 border-2 border-ink border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <div className="grid gap-3 sm:grid-cols-3">
        <div className="border border-ink bg-white px-4 py-4">
          <p className="font-label text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-ink/55">
            {messages.nav.alerts}
          </p>
          <p className="mt-2 font-headline text-3xl font-bold text-ink">{alerts.length}</p>
        </div>
        <div className="border border-ink bg-white px-4 py-4">
          <p className="font-label text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-ink/55">
            {messages.alerts.markRead}
          </p>
          <p className="mt-2 font-headline text-3xl font-bold text-ink">{unreadCount}</p>
        </div>
        <div className="border border-ink bg-white px-4 py-4">
          <p className="font-label text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-ink/55">
            {messages.alerts.watchAreas}
          </p>
          <p className="mt-2 font-headline text-3xl font-bold text-ink">
            {activeWatchCount}/{entitlements.maxWatchAreas}
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-0 border-b border-ink">
        <button
          onClick={() => setActiveTab("alerts")}
          className={`px-8 py-4 font-label text-[0.6875rem] font-bold uppercase tracking-[0.2em] transition-colors border-b-2 -mb-px ${
            activeTab === "alerts"
              ? "border-b-primary text-primary"
              : "border-b-transparent text-ink hover:text-primary"
          }`}
        >
          {messages.nav.alerts}
          {unreadCount > 0 && (
            <span className="ml-2 inline-block bg-primary text-white px-2 py-0.5 text-[0.6rem] font-bold rounded-full">
              {unreadCount}
            </span>
          )}
        </button>
        <button
          onClick={() => setActiveTab("watchAreas")}
          className={`px-8 py-4 font-label text-[0.6875rem] font-bold uppercase tracking-[0.2em] transition-colors border-b-2 -mb-px ${
            activeTab === "watchAreas"
              ? "border-b-primary text-primary"
              : "border-b-transparent text-ink hover:text-primary"
          }`}
        >
          {messages.monitoring.focusWatch}
          <span className="ml-2 inline-block border border-ink px-2 py-0.5 text-[0.6rem] font-bold text-ink">
            {watchAreas.length}/{entitlements.maxWatchAreas}
          </span>
        </button>
      </div>

      {/* Alerts Tab */}
      {activeTab === "alerts" && (
        <div className="space-y-6">
          {unreadCount > 0 && (
            <div className="flex justify-end">
              <button
                onClick={handleMarkAllRead}
                className="border border-ink px-6 py-3 font-label text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-ink hover:bg-ink hover:text-white transition-colors"
              >
                {messages.alerts.markAllRead}
              </button>
            </div>
          )}
          <AlertList alerts={alerts} onMarkRead={handleMarkRead} />
        </div>
      )}

      {/* Watch Areas Tab */}
      {activeTab === "watchAreas" && (
        <WatchAreaList
          watchAreas={watchAreas}
          maxWatchAreas={entitlements.maxWatchAreas}
          onRefresh={fetchAll}
        />
      )}
    </div>
  );
}
