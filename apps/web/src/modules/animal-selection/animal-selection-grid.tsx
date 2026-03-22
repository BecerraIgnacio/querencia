"use client";

import { ANIMAL_TYPES } from "@querencia/core-domain";
import { AnimalCard } from "./animal-card";
import { useLocale } from "@/i18n/locale-context";

export function AnimalSelectionGrid() {
  const { messages } = useLocale();

  return (
    <section>
      <div className="border-t border-ink pt-4 mb-14">
        <h1 className="font-headline text-3xl sm:text-5xl md:text-7xl font-extrabold tracking-tighter leading-none mb-4">
          {messages.landing.title}
        </h1>
        <p className="max-w-xl font-body text-sm leading-relaxed text-ink opacity-80">
          {messages.landing.subtitle}
        </p>
      </div>
      <div className="flex justify-between items-end border-b border-ink pb-2 mb-8">
        <h2 className="font-label text-xl font-bold uppercase tracking-tighter">
          {messages.landing.selectAnimal}
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-7">
        {ANIMAL_TYPES.map((animalType) => (
          <AnimalCard key={animalType} animalType={animalType} />
        ))}
      </div>
    </section>
  );
}
