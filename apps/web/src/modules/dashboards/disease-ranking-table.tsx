"use client";

import { useLocale } from "@/i18n/locale-context";
import type { DiseaseRanking } from "@/data/seed-executive";

interface DiseaseRankingTableProps {
  rankings: DiseaseRanking[];
}

function velocityArrow(velocity: number): { symbol: string; className: string } {
  if (velocity > 0) return { symbol: "\u2191", className: "text-primary" };
  if (velocity < 0) return { symbol: "\u2193", className: "text-ink" };
  return { symbol: "\u2192", className: "text-ink opacity-60" };
}

function formatDiseaseKey(value: string): string {
  return value
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function DiseaseRankingTable({ rankings }: DiseaseRankingTableProps) {
  const { messages } = useLocale();
  const t = messages.proDashboard;

  if (rankings.length === 0) return null;

  return (
    <div className="border border-ink">
      <div className="border-b border-ink px-4 sm:px-6 py-3">
        <h4 className="font-headline text-lg font-bold">{t.topDiseases}</h4>
      </div>
      <div className="grid gap-3 p-4 md:hidden">
        {rankings.map((ranking) => {
          const arrow = velocityArrow(ranking.velocity);
          return (
            <article key={ranking.diseaseKey} className="border border-ink/15 bg-surface px-4 py-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="font-label text-[0.625rem] font-bold uppercase tracking-[0.16em] text-ink/50">
                    {t.rank} {ranking.rank}
                  </div>
                  <h5 className="mt-2 font-headline text-xl font-bold leading-tight">
                    {formatDiseaseKey(ranking.diseaseKey)}
                  </h5>
                </div>
                <div className="border border-ink px-2 py-1 font-label text-[0.625rem] font-bold uppercase tracking-[0.14em] text-ink/65">
                  {t.severity} {(ranking.severityScore * 100).toFixed(0)}%
                </div>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-3">
                <div>
                  <div className="font-label text-[0.5625rem] uppercase tracking-[0.14em] text-ink/45">
                    {messages.dashboard.cases}
                  </div>
                  <div className="mt-1 font-headline text-2xl font-bold">{ranking.totalCases}</div>
                </div>
                <div>
                  <div className="font-label text-[0.5625rem] uppercase tracking-[0.14em] text-ink/45">
                    {t.affectedZones}
                  </div>
                  <div className="mt-1 font-headline text-2xl font-bold">
                    {ranking.affectedRegionCount}
                  </div>
                </div>
                <div>
                  <div className="font-label text-[0.5625rem] uppercase tracking-[0.14em] text-ink/45">
                    {t.velocity}
                  </div>
                  <div className="mt-1 font-headline text-2xl font-bold">
                    <span className={arrow.className}>{arrow.symbol}</span>{" "}
                    {Math.abs(ranking.velocity).toFixed(1)}
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <div className="mb-2 flex items-center justify-between gap-3">
                  <span className="font-label text-[0.5625rem] uppercase tracking-[0.14em] text-ink/45">
                    {t.severity}
                  </span>
                  <span className="font-label text-[0.625rem] font-bold uppercase tracking-[0.14em] text-ink/55">
                    {(ranking.severityScore * 100).toFixed(0)}%
                  </span>
                </div>
                <div className="h-2 border border-ink">
                  <div
                    className="h-full bg-primary"
                    style={{ width: `${ranking.severityScore * 100}%` }}
                  />
                </div>
              </div>
            </article>
          );
        })}
      </div>
      <div className="hidden overflow-x-auto md:block [-webkit-overflow-scrolling:touch]">
        <table className="w-full min-w-[600px]">
          <thead>
            <tr className="border-b border-ink bg-surface">
              <th className="text-left font-label text-[0.6875rem] font-bold uppercase tracking-widest px-6 py-3">
                {t.rank}
              </th>
              <th className="text-left font-label text-[0.6875rem] font-bold uppercase tracking-widest px-6 py-3">
                {t.diseaseName}
              </th>
              <th className="text-right font-label text-[0.6875rem] font-bold uppercase tracking-widest px-6 py-3">
                {messages.dashboard.cases}
              </th>
              <th className="text-right font-label text-[0.6875rem] font-bold uppercase tracking-widest px-6 py-3">
                {t.affectedZones}
              </th>
              <th className="text-right font-label text-[0.6875rem] font-bold uppercase tracking-widest px-6 py-3">
                {t.velocity}
              </th>
              <th className="text-left font-label text-[0.6875rem] font-bold uppercase tracking-widest px-6 py-3">
                {t.severity}
              </th>
            </tr>
          </thead>
          <tbody>
            {rankings.map((r) => {
              const arrow = velocityArrow(r.velocity);
              return (
                <tr
                  key={r.diseaseKey}
                  className="border-b border-ink/15 last:border-b-0 hover:bg-surface-container"
                >
                  <td className="px-6 py-4 font-headline text-lg font-bold">
                    {r.rank}
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-headline text-lg font-bold leading-tight">
                      {formatDiseaseKey(r.diseaseKey)}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right font-label text-sm tabular-nums">
                    {r.totalCases}
                  </td>
                  <td className="px-6 py-4 text-right font-label text-sm tabular-nums">
                    {r.affectedRegionCount}
                  </td>
                  <td className="px-6 py-4 text-right font-label text-sm tabular-nums">
                    <span className={arrow.className}>{arrow.symbol}</span>{" "}
                    {Math.abs(r.velocity).toFixed(1)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-24 flex-shrink-0 border border-ink">
                        <div
                          className="h-full bg-primary"
                          style={{ width: `${r.severityScore * 100}%` }}
                        />
                      </div>
                      <span className="font-label text-[0.6875rem] tabular-nums">
                        {(r.severityScore * 100).toFixed(0)}%
                      </span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
