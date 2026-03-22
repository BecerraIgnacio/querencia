"use client";

import { useState } from "react";
import { useLocale } from "@/i18n/locale-context";

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

interface PortfolioListProps {
  portfolios: PortfolioRow[];
  watchAreas: WatchAreaRow[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onCreate: () => void;
  onEdit: (portfolio: PortfolioRow) => void;
  onDelete: (id: string) => void;
  readOnly?: boolean;
}

export function PortfolioList({
  portfolios,
  watchAreas,
  selectedId,
  onSelect,
  onCreate,
  onEdit,
  onDelete,
  readOnly = false,
}: PortfolioListProps) {
  const { messages } = useLocale();
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const getPortfolioAreas = (portfolioId: string) =>
    watchAreas.filter((wa) => wa.portfolio_id === portfolioId);

  const getAnimalTypes = (portfolioId: string): string[] => {
    const areas = getPortfolioAreas(portfolioId);
    const types = new Set<string>();
    areas.forEach((wa) => wa.animal_types.forEach((t) => types.add(t)));
    return Array.from(types);
  };

  const getTotalRegions = (portfolioId: string): number => {
    const areas = getPortfolioAreas(portfolioId);
    const regions = new Set<string>();
    areas.forEach((wa) =>
      (wa.region_ids ?? wa.hex_cell_ids ?? []).forEach((regionId) =>
        regions.add(regionId),
      ),
    );
    return regions.size;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-headline text-2xl font-bold text-ink">
          {messages.workspace.portfolios}
        </h2>
        <button
          onClick={onCreate}
          disabled={readOnly}
          className="bg-primary text-white px-6 py-3 font-label text-[0.6875rem] font-bold uppercase tracking-[0.2em] hover:bg-ink transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {readOnly ? "Demo view" : messages.workspace.createPortfolio}
        </button>
      </div>

      {portfolios.length === 0 ? (
        <div className="border border-ink border-dashed p-12 text-center">
          <p className="font-headline text-xl font-bold text-ink/60">
            {messages.workspace.noPortfolios}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {portfolios.map((portfolio) => {
            const areaCount = getPortfolioAreas(portfolio.id).length;
            const animalTypes = getAnimalTypes(portfolio.id);
            const totalRegions = getTotalRegions(portfolio.id);
            const isSelected = selectedId === portfolio.id;

            return (
              <div
                key={portfolio.id}
                role="button"
                tabIndex={0}
                onClick={() => onSelect(portfolio.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") onSelect(portfolio.id);
                }}
                className={`border p-5 space-y-3 cursor-pointer transition-colors ${
                  isSelected
                    ? "border-ink bg-ink/5"
                    : "border-ink hover:bg-ink/[0.02]"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1 flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-headline text-lg font-bold text-ink truncate">
                        {portfolio.name}
                      </h3>
                      {portfolio.is_default && (
                        <span className="shrink-0 inline-block border border-ink px-2 py-0.5 font-label text-[0.5625rem] font-bold uppercase tracking-[0.2em] text-ink">
                          {messages.workspace.default}
                        </span>
                      )}
                    </div>
                    {portfolio.description && (
                      <p className="font-label text-sm text-ink/60 truncate">
                        {portfolio.description}
                      </p>
                    )}
                  </div>
                </div>

                {/* Summary stats */}
                <div className="flex flex-wrap gap-x-4 gap-y-1">
                  <span className="font-label text-[0.6875rem] text-ink/50 uppercase tracking-[0.1em]">
                    {messages.workspace.watchAreas}: {areaCount}
                  </span>
                  <span className="font-label text-[0.6875rem] text-ink/50 uppercase tracking-[0.1em]">
                    {messages.workspace.totalZones}: {totalRegions}
                  </span>
                </div>

                {/* Animal type badges */}
                {animalTypes.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {animalTypes.map((type) => (
                      <span
                        key={type}
                        className="inline-block border border-ink px-3 py-1 font-label text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-ink"
                      >
                        {messages.animals[type as keyof typeof messages.animals] ?? type}
                      </span>
                    ))}
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-2 pt-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit(portfolio);
                    }}
                    disabled={readOnly}
                    className="border border-ink px-3 py-1.5 font-label text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-ink hover:bg-ink hover:text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {messages.workspace.editPortfolio}
                  </button>
                  {confirmDeleteId === portfolio.id ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete(portfolio.id);
                        setConfirmDeleteId(null);
                      }}
                      disabled={readOnly}
                      className="bg-primary text-white px-3 py-1.5 font-label text-[0.6875rem] font-bold uppercase tracking-[0.2em] hover:bg-ink transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      {messages.workspace.confirmDelete}
                    </button>
                  ) : (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setConfirmDeleteId(portfolio.id);
                      }}
                      disabled={readOnly}
                      className="border border-primary px-3 py-1.5 font-label text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-primary hover:bg-primary hover:text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      {messages.workspace.deletePortfolio}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
