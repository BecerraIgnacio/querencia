"use client";

import Link from "next/link";
import type { DiseaseSummary } from "@querencia/contracts";
import { useLocale } from "@/i18n/locale-context";
import { ArrowRight } from "lucide-react";

interface DiseaseCardProps {
  disease: DiseaseSummary;
}

export function DiseaseCard({ disease }: DiseaseCardProps) {
  const { locale, messages } = useLocale();
  const workflowLabel =
    disease.animalType === "avian"
      ? messages.diseases.operationalPilotBadge
      : messages.diseases.referenceOnlyBadge;

  return (
    <Link
      href={`/${locale}/${disease.animalType}/${disease.id}`}
      className="group block border-b border-ink bg-white/70 px-5 py-5 transition-colors hover:bg-surface-container"
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="border border-ink px-3 py-0.5 text-[0.6rem] font-bold uppercase tracking-widest text-ink/70">
              {workflowLabel}
            </span>
            <span className="bg-ink px-3 py-0.5 text-[0.6rem] font-bold uppercase tracking-widest text-white">
              {disease.severityLevel}
            </span>
          </div>
          <h3 className="font-headline text-2xl font-bold">{disease.name}</h3>
          <p className="mt-2 max-w-2xl font-body text-sm leading-relaxed text-ink/65 line-clamp-2">
            {disease.summary}
          </p>
        </div>
        <div className="flex items-center gap-3 self-start">
          <span className="font-label text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-primary opacity-80 transition-opacity group-hover:opacity-100">
            {messages.diseases.viewDetail}
          </span>
          <ArrowRight size={18} className="opacity-30 transition-opacity group-hover:opacity-100" />
        </div>
      </div>
    </Link>
  );
}
