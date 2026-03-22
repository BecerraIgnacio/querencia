"use client";

import type { AnimalType } from "@querencia/core-domain";
import { DiseaseCard } from "./disease-card";
import { useDiseaseList } from "./use-disease-list";
import { useLocale } from "@/i18n/locale-context";

interface DiseaseListProps {
  animalType: AnimalType;
}

export function DiseaseList({ animalType }: DiseaseListProps) {
  const { locale, messages } = useLocale();
  const diseases = useDiseaseList(animalType, locale);

  return (
    <div>
      <div className="grid">
        {diseases.map((disease) => (
          <DiseaseCard key={disease.id} disease={disease} />
        ))}
      </div>
    </div>
  );
}
