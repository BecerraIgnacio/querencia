import type { AnimalType, DiseaseId, SupportedLocale } from "@querencia/core-domain";
import { ANIMAL_TYPES, makeDiseaseId } from "@querencia/core-domain";
import { DiseaseDetailShell } from "@/modules/disease-view/disease-detail-shell";
import { InfographicPage } from "@/modules/disease-view/infographic/infographic-page";
import { INFOGRAPHIC_DATA } from "@/data/infographic-diseases";
import { SEED_DISEASES } from "@/data/seed-diseases";
import Link from "next/link";
import { getMessages } from "@/i18n/get-messages";
import { notFound } from "next/navigation";

interface DiseaseDetailPageProps {
  params: { locale: string; animalType: string; diseaseId: string };
}

export function generateStaticParams() {
  const locales: SupportedLocale[] = ["en", "es"];
  return locales.flatMap((locale) =>
    SEED_DISEASES.flatMap((d) =>
      d.animalTypes.map((animalType) => ({
        locale,
        animalType,
        diseaseId: d.id,
      })),
    ),
  );
}

export default function DiseaseDetailPage({
  params,
}: DiseaseDetailPageProps) {
  const locale = (params.locale === "en" ? "en" : "es") as SupportedLocale;
  const animalType = params.animalType as AnimalType;
  const diseaseId = makeDiseaseId(params.diseaseId);
  const messages = getMessages(locale);

  const disease = SEED_DISEASES.find(
    (d) => d.id === diseaseId && d.animalTypes.includes(animalType),
  );

  if (!disease) {
    notFound();
  }

  const infographic = INFOGRAPHIC_DATA.get(disease.id);

  if (infographic) {
    return (
      <InfographicPage disease={disease} infographic={infographic} animalType={animalType} />
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-7 md:px-14 py-14">
      <Link
        href={`/${locale}/${animalType}`}
        className="text-[0.6875rem] font-bold tracking-widest uppercase text-ink opacity-50 hover:opacity-100 hover:text-primary transition-all mb-8 inline-block"
      >
        {messages.diseases.backToAnimals}
      </Link>
      <DiseaseDetailShell disease={disease} animalType={animalType} />
    </div>
  );
}
