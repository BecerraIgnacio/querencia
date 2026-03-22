"use client";

import { useLocale } from "@/i18n/locale-context";
import type { CriticalZone } from "@/data/seed-executive";

interface CriticalZoneTableProps {
  zones: CriticalZone[];
}

function formatDiseaseKey(value: string): string {
  return value
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function CriticalZoneTable({ zones }: CriticalZoneTableProps) {
  const { messages } = useLocale();
  const t = messages.proDashboard;

  if (zones.length === 0) return null;

  return (
    <div className="border border-ink">
      <div className="border-b border-ink px-4 sm:px-6 py-3">
        <h4 className="font-headline text-lg font-bold">{t.criticalZones}</h4>
      </div>
      <div className="grid gap-3 p-4 md:hidden">
        {zones.map((zone) => (
          <article key={`${zone.regionName}-${zone.diseaseKey}`} className="border border-ink/15 bg-surface px-4 py-4">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <div className="font-label text-[0.625rem] font-bold uppercase tracking-[0.16em] text-ink/50">
                  {t.rank} {zone.rank}
                </div>
                <h5 className="mt-2 font-headline text-xl font-bold leading-tight">
                  {zone.regionName}
                </h5>
                <p className="mt-1 font-body text-sm text-ink/65">
                  {formatDiseaseKey(zone.diseaseKey)}
                </p>
              </div>
              {zone.isHotspot ? (
                <span className="inline-flex border border-primary bg-primary px-2 py-1 font-label text-[0.625rem] font-bold uppercase tracking-[0.14em] text-white">
                  {t.hotspot}
                </span>
              ) : null}
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <div>
                <div className="font-label text-[0.5625rem] uppercase tracking-[0.14em] text-ink/45">
                  {messages.dashboard.cases}
                </div>
                <div className="mt-1 font-headline text-2xl font-bold">{zone.caseCount}</div>
              </div>
              <div>
                <div className="font-label text-[0.5625rem] uppercase tracking-[0.14em] text-ink/45">
                  {t.intensity}
                </div>
                <div className="mt-1 font-headline text-2xl font-bold">
                  {(zone.intensity * 100).toFixed(0)}%
                </div>
              </div>
            </div>

            <div className="mt-4">
              <div className="mb-2 flex items-center justify-between gap-3">
                <span className="font-label text-[0.5625rem] uppercase tracking-[0.14em] text-ink/45">
                  {t.intensity}
                </span>
                <span className="font-label text-[0.625rem] font-bold uppercase tracking-[0.14em] text-ink/55">
                  {(zone.intensity * 100).toFixed(0)}%
                </span>
              </div>
              <div className="h-2 border border-ink">
                <div
                  className="h-full bg-primary"
                  style={{ width: `${Math.max(6, zone.intensity * 100)}%` }}
                />
              </div>
            </div>
          </article>
        ))}
      </div>
      <div className="hidden overflow-x-auto md:block [-webkit-overflow-scrolling:touch]">
        <table className="w-full min-w-[600px]">
          <thead>
            <tr className="border-b border-ink bg-surface">
              <th className="text-left font-label text-[0.6875rem] font-bold uppercase tracking-widest px-6 py-3">
                {t.rank}
              </th>
              <th className="text-left font-label text-[0.6875rem] font-bold uppercase tracking-widest px-6 py-3">
                {t.hexId}
              </th>
              <th className="text-left font-label text-[0.6875rem] font-bold uppercase tracking-widest px-6 py-3">
                {t.diseaseName}
              </th>
              <th className="text-right font-label text-[0.6875rem] font-bold uppercase tracking-widest px-6 py-3">
                {messages.dashboard.cases}
              </th>
              <th className="text-right font-label text-[0.6875rem] font-bold uppercase tracking-widest px-6 py-3">
                {t.intensity}
              </th>
              <th className="text-center font-label text-[0.6875rem] font-bold uppercase tracking-widest px-6 py-3">
                {t.hotspot}
              </th>
            </tr>
          </thead>
          <tbody>
            {zones.map((z) => (
              <tr
                key={`${z.regionName}-${z.diseaseKey}`}
                className="border-b border-ink/15 last:border-b-0 hover:bg-surface-container"
              >
                <td className="px-6 py-4 font-headline text-lg font-bold">
                  {z.rank}
                </td>
                <td className="px-6 py-4 font-label text-sm font-mono">
                  {z.regionName}
                </td>
                <td className="px-6 py-4">
                  <div className="font-headline text-lg font-bold leading-tight">
                    {formatDiseaseKey(z.diseaseKey)}
                  </div>
                </td>
                <td className="px-6 py-4 text-right font-label text-sm tabular-nums">
                  {z.caseCount}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-3">
                    <div className="h-2 w-24 flex-shrink-0 border border-ink">
                      <div
                        className="h-full bg-primary"
                        style={{ width: `${Math.max(6, z.intensity * 100)}%` }}
                      />
                    </div>
                    <span className="font-label text-sm tabular-nums">
                      {(z.intensity * 100).toFixed(0)}%
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-center">
                  {z.isHotspot ? (
                    <span className="inline-block bg-primary text-white px-2 py-1 font-label text-[0.6875rem] font-bold uppercase tracking-widest">
                      {t.hotspot}
                    </span>
                  ) : (
                    <span className="font-label text-[0.6875rem] opacity-30">-</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
