"use client";

import { useState } from "react";
import { useLocale } from "@/i18n/locale-context";
import { useExecutiveData } from "./use-executive-data";
import { useTrendData } from "./use-trend-data";
import { generateCsv, downloadCsv } from "@/lib/export/csv-generator";
import {
  getDiseaseRankingColumns,
  getCriticalZoneColumns,
  getExecutiveSummaryColumns,
  getTrendPointColumns,
} from "@/lib/export/export-columns";
import type { DiseaseRanking, CriticalZone } from "@/data/seed-executive";
import type { TrendPoint } from "@/data/seed-trends";

type ExportType =
  | "executive"
  | "diseaseRankings"
  | "criticalZones"
  | "trends";

function buildFilename(type: string, locale: string): string {
  const date = new Date().toISOString().slice(0, 10);
  return `querencia-${type}-${locale}-${date}.csv`;
}

export function ExportPanel() {
  const { locale, messages } = useLocale();
  const t = messages.exports;
  // Updated scope: export surfaces now follow the avian-first coordinator workflow.
  const snapshots = useExecutiveData("avian");
  const trendSeries = useTrendData({ animalType: "avian" });

  const [downloading, setDownloading] = useState<ExportType | null>(null);
  const [lastExport, setLastExport] = useState<{
    filename: string;
    records: number;
  } | null>(null);

  function handleExport(type: ExportType) {
    setDownloading(type);
    setLastExport(null);

    let content: string;
    let filename: string;
    let recordCount: number;

    switch (type) {
      case "executive": {
        const columns = getExecutiveSummaryColumns(locale);
        content = generateCsv(columns, snapshots);
        filename = buildFilename("executive-summary", locale);
        recordCount = snapshots.length;
        break;
      }
      case "diseaseRankings": {
        const allRankings: DiseaseRanking[] = snapshots.flatMap(
          (s) => s.topDiseases,
        );
        const columns = getDiseaseRankingColumns(locale);
        content = generateCsv(columns, allRankings);
        filename = buildFilename("disease-rankings", locale);
        recordCount = allRankings.length;
        break;
      }
      case "criticalZones": {
        const allZones: CriticalZone[] = snapshots.flatMap(
          (s) => s.criticalZones,
        );
        const columns = getCriticalZoneColumns(locale);
        content = generateCsv(columns, allZones);
        filename = buildFilename("critical-zones", locale);
        recordCount = allZones.length;
        break;
      }
      case "trends": {
        const allPoints: TrendPoint[] = trendSeries.flatMap((s) => s.points);
        const columns = getTrendPointColumns(locale);
        content = generateCsv(columns, allPoints);
        filename = buildFilename("trend-data", locale);
        recordCount = allPoints.length;
        break;
      }
    }

    downloadCsv(content, filename);
    setLastExport({ filename, records: recordCount });
    setDownloading(null);
  }

  const hasData = snapshots.length > 0 || trendSeries.length > 0;

  return (
    <div className="border border-ink p-4 sm:p-6 space-y-4">
      <h2 className="font-headline text-2xl font-bold">{t.title}</h2>
      <div className="h-px bg-ink" />

      {!hasData ? (
        <p className="font-label text-[0.6875rem] font-bold uppercase tracking-widest opacity-40">
          {t.noData}
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:flex md:flex-wrap gap-3">
          <ExportButton
            label={t.exportExecutive}
            isDownloading={downloading === "executive"}
            downloadingLabel={t.downloading}
            disabled={snapshots.length === 0}
            onClick={() => handleExport("executive")}
          />
          <ExportButton
            label={t.exportDiseaseRankings}
            isDownloading={downloading === "diseaseRankings"}
            downloadingLabel={t.downloading}
            disabled={snapshots.length === 0}
            onClick={() => handleExport("diseaseRankings")}
          />
          <ExportButton
            label={t.exportCriticalZones}
            isDownloading={downloading === "criticalZones"}
            downloadingLabel={t.downloading}
            disabled={snapshots.length === 0}
            onClick={() => handleExport("criticalZones")}
          />
          <ExportButton
            label={t.exportTrends}
            isDownloading={downloading === "trends"}
            downloadingLabel={t.downloading}
            disabled={trendSeries.length === 0}
            onClick={() => handleExport("trends")}
          />
        </div>
      )}

      {lastExport && (
        <div className="pt-2">
          <p className="font-label text-[0.6875rem] font-bold uppercase tracking-widest opacity-60">
            {t.fileName}: {lastExport.filename}
          </p>
          <p className="font-label text-[0.6875rem] font-bold uppercase tracking-widest opacity-60">
            {t.records}: {lastExport.records}
          </p>
        </div>
      )}
    </div>
  );
}

function ExportButton({
  label,
  isDownloading,
  downloadingLabel,
  disabled,
  onClick,
}: {
  label: string;
  isDownloading: boolean;
  downloadingLabel: string;
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || isDownloading}
      className={`border border-ink px-4 sm:px-6 py-3 font-label text-[0.6875rem] font-bold uppercase tracking-[0.2em] transition-colors min-h-[44px] ${
        isDownloading
          ? "opacity-50 cursor-wait"
          : disabled
            ? "opacity-30 cursor-not-allowed"
            : "hover:bg-ink hover:text-white"
      }`}
    >
      {isDownloading ? downloadingLabel : label}
    </button>
  );
}
