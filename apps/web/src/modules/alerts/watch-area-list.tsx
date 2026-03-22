"use client";

import { useState } from "react";
import type { WatchArea } from "@querencia/contracts";
import { useLocale } from "@/i18n/locale-context";
import { createClient } from "@/lib/supabase/client";
import { WatchAreaForm } from "./watch-area-form";

interface WatchAreaListProps {
  watchAreas: WatchArea[];
  maxWatchAreas: number;
  onRefresh: () => void;
  readOnly?: boolean;
}

export function WatchAreaList({
  watchAreas,
  maxWatchAreas,
  onRefresh,
  readOnly = false,
}: WatchAreaListProps) {
  const { messages } = useLocale();
  const [showForm, setShowForm] = useState(false);
  const [editingArea, setEditingArea] = useState<WatchArea | undefined>(undefined);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const atMax = watchAreas.length >= maxWatchAreas;

  const handleToggleActive = async (area: WatchArea) => {
    if (readOnly) {
      return;
    }
    const supabase = createClient();
    await supabase
      .from("watch_areas")
      .update({
        is_active: !area.isActive,
        updated_at: new Date().toISOString(),
      })
      .eq("id", area.id);
    onRefresh();
  };

  const handleDelete = async (id: string) => {
    if (readOnly) {
      return;
    }
    const supabase = createClient();
    await supabase.from("watch_areas").delete().eq("id", id);
    setConfirmDeleteId(null);
    onRefresh();
  };

  const handleFormSave = () => {
    setShowForm(false);
    setEditingArea(undefined);
    onRefresh();
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingArea(undefined);
  };

  const handleEdit = (area: WatchArea) => {
    setEditingArea(area);
    setShowForm(true);
  };

  const handleAdd = () => {
    if (readOnly) {
      return;
    }
    setEditingArea(undefined);
    setShowForm(true);
  };

  if (showForm) {
    return (
      <WatchAreaForm
        existing={editingArea}
        onSave={handleFormSave}
        onCancel={handleFormCancel}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="font-headline text-2xl font-bold text-ink">
            {messages.alerts.watchAreas}
          </h3>
          <p className="mt-2 font-body text-sm leading-relaxed text-ink/70">
            {messages.monitoring.alertsSubtitle}
          </p>
        </div>
        <button
          onClick={handleAdd}
          disabled={atMax || readOnly}
          className="bg-primary text-white px-6 py-3 font-label text-[0.6875rem] font-bold uppercase tracking-[0.2em] hover:bg-ink transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          title={atMax ? messages.alerts.maxReached : undefined}
        >
          {readOnly ? "Demo view" : messages.alerts.addWatchArea}
        </button>
      </div>

      {atMax && (
        <p className="font-label text-sm text-primary font-bold">
          {messages.alerts.maxReached}
        </p>
      )}

      {watchAreas.length === 0 ? (
        <div className="border border-ink border-dashed p-12 text-center">
          <p className="font-headline text-xl font-bold text-ink/60">
            {messages.alerts.empty}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {watchAreas.map((area) => (
            <div key={area.id} className="border border-ink bg-white p-6 space-y-4">
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div className="space-y-3 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="font-headline text-xl font-bold text-ink">
                      {area.label}
                    </h4>
                    <span className={`inline-block border px-3 py-1 font-label text-[0.625rem] font-bold uppercase tracking-[0.16em] ${
                      area.isActive
                        ? "border-ink bg-ink text-white"
                        : "border-ink text-ink/55"
                    }`}>
                      {messages.alerts.watchAreaActive}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {area.animalTypes.map((type) => (
                      <span
                        key={type}
                        className="inline-block border border-ink px-3 py-1 font-label text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-ink"
                      >
                        {messages.animals[type]}
                      </span>
                    ))}
                    <span className="inline-block border border-ink px-3 py-1 font-label text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-ink/70">
                      {messages.workspace.totalZones}: {area.regionIds.length}
                    </span>
                  </div>
                  {area.regionIds.length > 0 && (
                    <p className="font-body text-sm leading-relaxed text-ink/70">
                      <span className="font-label text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-ink/50">
                        {messages.alerts.watchAreaRegions}
                      </span>
                      {" "}
                      {area.regionIds.join(", ")}
                    </p>
                  )}
                </div>
                <div className="grid gap-2 sm:grid-cols-3 md:w-auto">
                  <button
                    onClick={() => handleToggleActive(area)}
                    disabled={readOnly}
                    className={`px-4 py-3 font-label text-[0.6875rem] font-bold uppercase tracking-[0.2em] border transition-colors ${
                      area.isActive
                        ? "bg-ink text-white border-ink"
                        : "border-ink text-ink/50 hover:bg-ink hover:text-white"
                    } disabled:opacity-40 disabled:cursor-not-allowed`}
                  >
                    {messages.alerts.watchAreaActive}
                  </button>
                  <button
                    onClick={() => handleEdit(area)}
                    disabled={readOnly}
                    className="border border-ink px-4 py-3 font-label text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-ink hover:bg-ink hover:text-white transition-colors"
                  >
                    {messages.alerts.editWatchArea}
                  </button>
                  {confirmDeleteId === area.id ? (
                    <button
                      onClick={() => handleDelete(area.id)}
                      disabled={readOnly}
                      className="bg-primary text-white px-4 py-3 font-label text-[0.6875rem] font-bold uppercase tracking-[0.2em] hover:bg-ink transition-colors"
                    >
                      {messages.alerts.confirmDelete}
                    </button>
                  ) : (
                    <button
                      onClick={() => setConfirmDeleteId(area.id)}
                      disabled={readOnly}
                      className="border border-primary px-4 py-3 font-label text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-primary hover:bg-primary hover:text-white transition-colors"
                    >
                      {messages.alerts.delete}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
