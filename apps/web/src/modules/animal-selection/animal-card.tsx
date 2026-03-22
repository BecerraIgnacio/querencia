"use client";

import Link from "next/link";
import type { AnimalType } from "@querencia/core-domain";
import { useLocale } from "@/i18n/locale-context";

interface AnimalCardProps {
  animalType: AnimalType;
}

const SPECIES_COLORS: Record<AnimalType, string> = {
  bovine: "bg-cattle",
  porcine: "bg-pig",
  avian: "bg-poultry",
};

export function AnimalCard({ animalType }: AnimalCardProps) {
  const { locale, messages } = useLocale();
  const m = messages.animals;

  const labelKey = animalType as keyof typeof m;
  const descKey = `${animalType}Description` as keyof typeof m;

  return (
    <Link
      href={`/${locale}/${animalType}`}
      className="block border border-ink p-10 hover:bg-surface-container transition-colors group relative overflow-hidden"
    >
      <div className="flex justify-between items-start mb-10">
        <span className="font-label text-[0.6875rem] font-black tracking-widest uppercase">
          {m[labelKey]}
        </span>
        <div className={`w-6 h-6 ${SPECIES_COLORS[animalType]}`} />
      </div>
      <h3 className="font-headline text-3xl font-bold leading-tight mb-4">
        {m[labelKey]}
      </h3>
      <p className="font-body text-[0.6875rem] uppercase tracking-widest opacity-50">
        {m[descKey]}
      </p>
    </Link>
  );
}
