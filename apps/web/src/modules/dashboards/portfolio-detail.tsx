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

interface WatchAreaRow {
  id: string;
  label: string;
  animal_types: string[];
  region_ids?: string[];
  hex_cell_ids?: string[];
  portfolio_id: string | null;
  is_active: boolean;
}

interface PortfolioDetailProps {
  portfolio: PortfolioRow;
  assignedAreas: WatchAreaRow[];
  unassignedAreas: WatchAreaRow[];
  onRefresh: () => void;
  readOnly?: boolean;
}

export function PortfolioDetail({
  portfolio,
  assignedAreas,
  unassignedAreas,
  onRefresh,
  readOnly = false,
}: PortfolioDetailProps) {
  const { messages } = useLocale();
  const [showAssign, setShowAssign] = useState(false);

  /* Collect unique animal types and monitored regions from assigned areas */
  const animalTypeSet = new Set<string>();
  const regionSet = new Set<string>();
  assignedAreas.forEach((wa) => {
    wa.animal_types.forEach((t) => animalTypeSet.add(t));
    (wa.region_ids ?? wa.hex_cell_ids ?? []).forEach((regionId) =>
      regionSet.add(regionId),
    );
  });
  const animalTypes = Array.from(animalTypeSet);
  const totalZones = regionSet.size;

  const handleUnassign = async (watchAreaId: string) => {
    if (readOnly) return;
    const supabase = createClient();
    await supabase
      .from("watch_areas")
      .update({ portfolio_id: null, updated_at: new Date().toISOString() })
      .eq("id", watchAreaId);
    onRefresh();
  };

  const handleAssign = async (watchAreaId: string) => {
    if (readOnly) return;
    const supabase = createClient();
    await supabase
      .from("watch_areas")
      .update({
        portfolio_id: portfolio.id,
        updated_at: new Date().toISOString(),
      })
      .eq("id", watchAreaId);
    onRefresh();
  };

  return (
    <div className="space-y-6">
      {/* Portfolio header */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <h2 className="font-headline text-2xl font-bold text-ink">
            {portfolio.name}
          </h2>
          {portfolio.is_default && (
            <span className="inline-block border border-ink px-2 py-0.5 font-label text-[0.5625rem] font-bold uppercase tracking-[0.2em] text-ink">
              {messages.workspace.default}
            </span>
          )}
        </div>
        {portfolio.description && (
          <p className="font-label text-sm text-ink/60">
            {portfolio.description}
          </p>
        )}
      </div>

      {/* Summary row */}
      <div className="border border-ink p-5">
        <h3 className="font-label text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-ink mb-4">
          {messages.workspace.summary}
        </h3>
        <div className="flex flex-wrap gap-x-8 gap-y-3">
          <div>
            <span className="font-label text-[0.6875rem] text-ink/50 uppercase tracking-[0.1em] block">
              {messages.workspace.watchAreas}
            </span>
            <span className="font-headline text-xl font-bold text-ink">
              {assignedAreas.length}
            </span>
          </div>
          <div>
            <span className="font-label text-[0.6875rem] text-ink/50 uppercase tracking-[0.1em] block">
              {messages.workspace.totalZones}
            </span>
            <span className="font-headline text-xl font-bold text-ink">
              {totalZones}
            </span>
          </div>
          <div>
            <span className="font-label text-[0.6875rem] text-ink/50 uppercase tracking-[0.1em] block">
              {messages.workspace.animalTypes}
            </span>
            <div className="flex gap-2 mt-1">
              {animalTypes.length > 0 ? (
                animalTypes.map((type) => (
                  <span
                    key={type}
                    className="inline-block border border-ink px-3 py-1 font-label text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-ink"
                  >
                    {messages.animals[type as keyof typeof messages.animals] ?? type}
                  </span>
                ))
              ) : (
                <span className="font-label text-sm text-ink/40">&mdash;</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Assigned watch areas */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-label text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-ink">
            {messages.workspace.watchAreas}
          </h3>
          <button
            onClick={() => setShowAssign(!showAssign)}
            disabled={readOnly}
            className="border border-ink px-4 py-2 font-label text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-ink hover:bg-ink hover:text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {readOnly ? "Demo view" : messages.workspace.assignAreas}
          </button>
        </div>

        {assignedAreas.length === 0 ? (
          <div className="border border-ink border-dashed p-8 text-center">
            <p className="font-headline text-lg font-bold text-ink/60">
              {messages.workspace.noWatchAreas}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {assignedAreas.map((area) => (
              <div key={area.id} className="border border-ink p-4 flex items-start justify-between gap-4">
                <div className="space-y-2 flex-1 min-w-0">
                  <h4 className="font-headline text-lg font-bold text-ink">
                    {area.label}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {area.animal_types.map((type) => (
                      <span
                        key={type}
                        className="inline-block border border-ink px-3 py-1 font-label text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-ink"
                      >
                        {messages.animals[type as keyof typeof messages.animals] ?? type}
                      </span>
                    ))}
                  </div>
                  {(area.region_ids ?? area.hex_cell_ids ?? []).length > 0 && (
                    <p className="font-label text-[0.6875rem] text-ink/50 uppercase tracking-[0.1em]">
                      {messages.workspace.totalZones}: {(area.region_ids ?? area.hex_cell_ids ?? []).length}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => handleUnassign(area.id)}
                  disabled={readOnly}
                  className="shrink-0 border border-primary px-3 py-1.5 font-label text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-primary hover:bg-primary hover:text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Assign unassigned areas panel */}
      {showAssign && (
        <div className="space-y-4">
          <div className="h-px bg-ink w-full" />
          <h3 className="font-label text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-ink">
            {messages.workspace.assignAreas}
          </h3>
          {unassignedAreas.length === 0 ? (
            <p className="font-label text-sm text-ink/50">
              {messages.workspace.noWatchAreas}
            </p>
          ) : (
            <div className="space-y-3">
              {unassignedAreas.map((area) => (
                <div
                  key={area.id}
                  className="border border-ink border-dashed p-4 flex items-center justify-between gap-4"
                >
                  <div className="space-y-1 flex-1 min-w-0">
                    <h4 className="font-headline text-base font-bold text-ink">
                      {area.label}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {area.animal_types.map((type) => (
                        <span
                          key={type}
                          className="inline-block border border-ink px-2 py-0.5 font-label text-[0.5625rem] font-bold uppercase tracking-[0.2em] text-ink"
                        >
                          {messages.animals[type as keyof typeof messages.animals] ?? type}
                        </span>
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={() => handleAssign(area.id)}
                    className="shrink-0 bg-primary text-white px-4 py-2 font-label text-[0.6875rem] font-bold uppercase tracking-[0.2em] hover:bg-ink transition-colors"
                  >
                    +
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
