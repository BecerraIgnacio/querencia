"use client";

import { useState, useCallback } from "react";
import { useLocale } from "@/i18n/locale-context";
import { createClient } from "@/lib/supabase/client";
import { PortfolioList } from "./portfolio-list";
import { PortfolioDetail } from "./portfolio-detail";
import { PortfolioForm } from "./portfolio-form";

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
  user_id: string;
  label: string;
  animal_types: string[];
  region_ids?: string[];
  hex_cell_ids?: string[];
  portfolio_id: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

interface PortfolioWorkspaceProps {
  initialPortfolios: PortfolioRow[];
  initialWatchAreas: WatchAreaRow[];
  readOnly?: boolean;
}

export function PortfolioWorkspace({
  initialPortfolios,
  initialWatchAreas,
  readOnly = false,
}: PortfolioWorkspaceProps) {
  const { messages } = useLocale();
  const [portfolios, setPortfolios] = useState(initialPortfolios);
  const [watchAreas, setWatchAreas] = useState(initialWatchAreas);
  const [selectedId, setSelectedId] = useState<string | null>(
    initialPortfolios[0]?.id ?? null,
  );
  const [showForm, setShowForm] = useState(false);
  const [editingPortfolio, setEditingPortfolio] = useState<PortfolioRow | null>(
    null,
  );
  // Updated workspace framing: portfolios are presented as operational watch-region boards.
  const activeWatchAreas = watchAreas.filter((area) => area.is_active);

  const refresh = useCallback(async () => {
    if (readOnly) return;
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    const [pRes, wRes] = await Promise.all([
      supabase
        .from("monitoring_portfolios")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: true }),
      supabase
        .from("watch_areas")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: true }),
    ]);

    if (pRes.data) setPortfolios(pRes.data);
    if (wRes.data) setWatchAreas(wRes.data);
  }, []);

  const handleSelect = (id: string) => setSelectedId(id);

  const handleCreate = () => {
    if (readOnly) return;
    setEditingPortfolio(null);
    setShowForm(true);
  };

  const handleEdit = (portfolio: PortfolioRow) => {
    if (readOnly) return;
    setEditingPortfolio(portfolio);
    setShowForm(true);
  };

  const handleFormDone = async () => {
    setShowForm(false);
    setEditingPortfolio(null);
    await refresh();
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingPortfolio(null);
  };

  const handleDelete = async (id: string) => {
    if (readOnly) return;
    const supabase = createClient();
    /* Unassign watch areas first */
    await supabase
      .from("watch_areas")
      .update({ portfolio_id: null, updated_at: new Date().toISOString() })
      .eq("portfolio_id", id);
    await supabase.from("monitoring_portfolios").delete().eq("id", id);
    if (selectedId === id) setSelectedId(portfolios.find((p) => p.id !== id)?.id ?? null);
    await refresh();
  };

  const selected = portfolios.find((p) => p.id === selectedId) ?? null;
  const assignedAreas = watchAreas.filter(
    (wa) => wa.portfolio_id === selectedId,
  );
  const unassignedAreas = watchAreas.filter((wa) => !wa.portfolio_id);

  if (showForm) {
    return (
      <div className="space-y-8">
        <h1 className="font-headline text-3xl font-extrabold tracking-tighter">
          {messages.workspace.title}
        </h1>
        <div className="h-px bg-ink w-full" />
        <PortfolioForm
          existing={editingPortfolio}
          onSave={handleFormDone}
          onCancel={handleFormCancel}
        />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="font-headline text-3xl font-extrabold tracking-tighter">
          {messages.workspace.title}
        </h1>
        <p className="max-w-3xl font-body text-sm leading-relaxed text-ink/75">
          {messages.workspace.subtitle}
        </p>
        <div className="grid gap-3 md:grid-cols-3">
          <div className="border border-ink bg-white p-4">
            <p className="font-label text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-ink/50">
              {messages.workspace.portfolios}
            </p>
            <p className="mt-2 font-headline text-3xl font-bold text-ink">
              {portfolios.length}
            </p>
          </div>
          <div className="border border-ink bg-white p-4">
            <p className="font-label text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-ink/50">
              {messages.workspace.watchAreas}
            </p>
            <p className="mt-2 font-headline text-3xl font-bold text-ink">
              {activeWatchAreas.length}
            </p>
          </div>
          <div className="border border-ink bg-white p-4">
            <p className="font-label text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-ink/50">
              {messages.workspace.boardFocus}
            </p>
            <p className="mt-2 font-headline text-xl font-bold text-ink">
              {messages.workspace.boardFocusValue}
            </p>
          </div>
        </div>
      </div>
      <div className="h-px bg-ink w-full" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column: portfolio list */}
        <div className="lg:col-span-1">
          <PortfolioList
            portfolios={portfolios}
            watchAreas={watchAreas}
            selectedId={selectedId}
            onSelect={handleSelect}
            onCreate={handleCreate}
            onEdit={handleEdit}
            onDelete={handleDelete}
            readOnly={readOnly}
          />
        </div>

        {/* Right column: selected portfolio detail */}
        <div className="lg:col-span-2">
          {selected ? (
            <PortfolioDetail
              portfolio={selected}
              assignedAreas={assignedAreas}
              unassignedAreas={unassignedAreas}
              onRefresh={refresh}
              readOnly={readOnly}
            />
          ) : (
            <div className="border border-ink border-dashed p-12 text-center">
              <p className="font-headline text-xl font-bold text-ink/60">
                {messages.workspace.noPortfolios}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
