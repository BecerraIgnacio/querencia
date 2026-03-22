import type { AnimalType, SupportedLocale } from "@querencia/core-domain";
import { ANIMAL_TYPES } from "@querencia/core-domain";
import { DiseaseList } from "@/modules/disease-catalog/disease-list";
import Link from "next/link";
import { getMessages } from "@/i18n/get-messages";
import { SEED_DISEASES } from "@/data/seed-diseases";

interface AnimalPageProps {
  params: { locale: string; animalType: string };
}

export function generateStaticParams() {
  const locales: SupportedLocale[] = ["en", "es"];
  return locales.flatMap((locale) =>
    ANIMAL_TYPES.map((animalType) => ({ locale, animalType })),
  );
}

export default function AnimalPage({ params }: AnimalPageProps) {
  const locale = (params.locale === "en" ? "en" : "es") as SupportedLocale;
  const animalType = params.animalType as AnimalType;
  const messages = getMessages(locale);

  if (!ANIMAL_TYPES.includes(animalType)) {
    return <div>Animal type not found.</div>;
  }

  const animalLabel = messages.animals[animalType as keyof typeof messages.animals] ?? animalType;
  const isOperationalAnimal = animalType === "avian";
  const diseaseCount = SEED_DISEASES.filter((disease) => disease.animalTypes.includes(animalType)).length;

  return (
    <div className="max-w-6xl mx-auto px-7 md:px-14 py-8">
      <Link
        href={`/${locale}`}
        className="text-[0.6875rem] font-bold tracking-widest uppercase text-ink opacity-50 hover:opacity-100 hover:text-primary transition-all mb-4 inline-block"
      >
        {messages.diseases.backToAnimals}
      </Link>

      <div className="border-t border-ink pt-4 mb-6">
        <h1 className="font-headline text-5xl md:text-7xl font-extrabold tracking-tighter leading-none mb-2 uppercase">
          {animalLabel}
        </h1>
        <p className="max-w-xl font-body text-sm leading-relaxed text-ink opacity-80">
          {messages.animals[`${animalType}Description` as keyof typeof messages.animals] ?? ""}
        </p>
      </div>

      <div className="mb-8 border border-ink bg-white p-6">
        <div className="font-label text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-primary">
          {isOperationalAnimal
            ? messages.diseases.operationalBannerTitle
            : messages.diseases.referenceBannerTitle}
        </div>
        <p className="mt-3 max-w-3xl font-body text-sm leading-relaxed text-ink/80">
          {isOperationalAnimal
            ? messages.diseases.operationalBannerBody
            : messages.diseases.referenceBannerBody}
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          {isOperationalAnimal ? (
            <>
              <Link
                href={`/${locale}/report`}
                className="bg-primary px-5 py-3 font-label text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-white transition-colors hover:bg-ink"
              >
                {messages.diseases.openReporting}
              </Link>
              <Link
                href={`/${locale}/alerts`}
                className="border border-ink px-5 py-3 font-label text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-ink transition-colors hover:bg-ink hover:text-white"
              >
                {messages.diseases.openAlerts}
              </Link>
            </>
          ) : (
            <Link
              href={`/${locale}/avian`}
              className="border border-ink px-5 py-3 font-label text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-ink transition-colors hover:bg-ink hover:text-white"
            >
              {messages.diseases.openAvianPilot}
            </Link>
          )}
        </div>
      </div>

      <div className="mb-8 grid gap-3 sm:grid-cols-3">
        <div className="border border-ink bg-white px-5 py-5">
          <p className="font-label text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-ink/55">
            {messages.diseases.listTitle}
          </p>
          <p className="mt-2 font-headline text-3xl font-bold text-ink">
            {diseaseCount}
          </p>
        </div>
        <div className="border border-ink bg-white px-5 py-5">
          <p className="font-label text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-ink/55">
            {messages.diseases.operationalPilotBadge}
          </p>
          <p className="mt-2 font-headline text-2xl font-bold text-ink">
            {isOperationalAnimal
              ? messages.diseases.operationalBannerTitle
              : messages.diseases.referenceBannerTitle}
          </p>
        </div>
        <div className="border border-ink bg-white px-5 py-5">
          <p className="font-label text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-ink/55">
            {messages.dashboard.quickActions}
          </p>
          <p className="mt-2 font-body text-sm leading-relaxed text-ink/75">
            {isOperationalAnimal
              ? messages.diseases.operationalBannerBody
              : messages.diseases.referenceBannerBody}
          </p>
        </div>
      </div>

      <div className="flex justify-between items-end border-b border-ink pb-2">
        <h2 className="font-label text-xl font-bold uppercase tracking-tighter">
          {messages.diseases.listTitle}
        </h2>
      </div>

      <DiseaseList animalType={animalType} />
    </div>
  );
}
