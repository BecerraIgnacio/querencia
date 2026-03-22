"use client";

import { useLocale } from "@/i18n/locale-context";
import { useExecutiveData } from "./use-executive-data";
import { ExecutiveSnapshotCard } from "./executive-snapshot-card";
import { DiseaseRankingTable } from "./disease-ranking-table";
import { CriticalZoneTable } from "./critical-zone-table";

export function ProDashboard() {
  const { messages } = useLocale();
  const t = messages.proDashboard;
  // Updated scope: coordinator reporting is intentionally narrowed to avian operations.
  const snapshots = useExecutiveData("avian");

  return (
    <div className="space-y-8 mb-12">
      <div className="space-y-3">
        <h2 className="font-headline text-3xl font-extrabold tracking-tighter">
          {t.title}
        </h2>
        <p className="max-w-3xl font-body text-sm leading-relaxed text-ink/75">
          {t.subtitle}
        </p>
      </div>

      {snapshots.length === 0 ? (
        <div className="border border-ink p-6">
          <p className="font-label text-[0.6875rem] font-bold uppercase tracking-widest opacity-40">
            {t.noData}
          </p>
        </div>
      ) : (
        snapshots.map((snapshot) => (
          <div key={snapshot.animalType} className="space-y-4">
            <ExecutiveSnapshotCard snapshot={snapshot} />
            <DiseaseRankingTable rankings={snapshot.topDiseases} />
            <CriticalZoneTable zones={snapshot.criticalZones} />
          </div>
        ))
      )}
    </div>
  );
}
