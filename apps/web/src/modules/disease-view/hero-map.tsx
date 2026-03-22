"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useLocale } from "@/i18n/locale-context";
import { SEED_PUBLIC_REGION_OVERVIEW } from "@/data/seed-map-data";

const RegionMapInner = dynamic(
  () => import("./region-map-inner").then((mod) => mod.RegionMapInner),
  {
    ssr: false,
    loading: () => (
      <div className="h-full min-h-[24rem] w-full animate-pulse bg-surface-high" />
    ),
  },
);

const SECTION_CLASSNAME = "border-b border-ink bg-surface";
const HERO_SECTION_STYLE = {
  minHeight: "calc(100svh - var(--app-header-height))",
  scrollMarginTop: "calc(var(--app-header-height) + 1rem)",
};
const CONTENT_SECTION_STYLE = {
  scrollMarginTop: "calc(var(--app-header-height) + 1rem)",
};

export function HeroMap() {
  const { locale, messages } = useLocale();
  const regions = SEED_PUBLIC_REGION_OVERVIEW.slice(0, 6);
  const featuredRegions = regions.slice(0, 4);
  const challenges = [
    {
      title: messages.landing.challengeOneTitle,
      body: messages.landing.challengeOneBody,
    },
    {
      title: messages.landing.challengeTwoTitle,
      body: messages.landing.challengeTwoBody,
    },
    {
      title: messages.landing.challengeThreeTitle,
      body: messages.landing.challengeThreeBody,
    },
  ];
  const workflow = [
    messages.landing.workflowStepOne,
    messages.landing.workflowStepTwo,
    messages.landing.workflowStepThree,
    messages.landing.workflowStepFour,
  ];
  const scienceCards = [
    {
      title: messages.landing.scienceOneTitle,
      body: messages.landing.scienceOneBody,
    },
    {
      title: messages.landing.scienceTwoTitle,
      body: messages.landing.scienceTwoBody,
    },
    {
      title: messages.landing.scienceThreeTitle,
      body: messages.landing.scienceThreeBody,
    },
    {
      title: messages.landing.scienceFourTitle,
      body: messages.landing.scienceFourBody,
    },
  ];
  const demoCards = [
    {
      title: messages.landing.demoReportTitle,
      body: messages.landing.demoReportBody,
      href: `/${locale}/report`,
      cta: messages.landing.demoReportCta,
    },
    {
      title: messages.landing.demoIntelTitle,
      body: messages.landing.demoIntelBody,
      href: `/${locale}/avian`,
      cta: messages.landing.demoIntelCta,
    },
    {
      title: messages.landing.demoConsoleTitle,
      body: messages.landing.demoConsoleBody,
      href: `/${locale}/dashboard`,
      cta: messages.landing.demoConsoleCta,
    },
  ];
  const impactCards = [
    {
      title: messages.landing.impactOneTitle,
      body: messages.landing.impactOneBody,
    },
    {
      title: messages.landing.impactTwoTitle,
      body: messages.landing.impactTwoBody,
    },
    {
      title: messages.landing.impactThreeTitle,
      body: messages.landing.impactThreeBody,
    },
  ];

  return (
    <>
      <section id="for-vets" className={SECTION_CLASSNAME} style={HERO_SECTION_STYLE}>
        <div className="grid min-h-full gap-8 px-7 py-10 md:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] md:px-14 md:py-14">
          <div className="flex flex-col justify-center space-y-6">
            <span className="font-label text-[0.8125rem] font-bold uppercase tracking-[0.2em] text-primary">
              {messages.landing.liveSurveillance}
            </span>
            <h1 className="font-headline text-5xl font-extrabold leading-none tracking-tight md:text-7xl">
              QUERENCIA
            </h1>
            <p className="max-w-3xl font-headline text-3xl font-bold leading-tight tracking-tight text-ink md:text-5xl">
              {messages.landing.title}
            </p>
            <p className="max-w-2xl font-body text-lg leading-8 text-ink/80 md:text-[1.125rem]">
              {messages.landing.subtitle}
            </p>
            <p className="max-w-2xl font-body text-lg leading-8 text-ink/80 md:text-[1.125rem]">
              {messages.landing.heroDescription}
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                href={`/${locale}/report`}
                className="bg-primary px-6 py-3 font-label text-[0.8125rem] font-bold uppercase tracking-[0.2em] text-white transition-colors hover:bg-ink"
              >
                {messages.landing.primaryCta}
              </Link>
              <Link
                href={`/${locale}/avian`}
                className="border border-ink px-6 py-3 font-label text-[0.8125rem] font-bold uppercase tracking-[0.2em] text-ink transition-colors hover:bg-ink hover:text-white"
              >
                {messages.landing.secondaryCta}
              </Link>
              <Link
                href={`/${locale}/dashboard`}
                className="border border-ink px-6 py-3 font-label text-[0.8125rem] font-bold uppercase tracking-[0.2em] text-ink transition-colors hover:bg-ink hover:text-white"
              >
                {messages.landing.tertiaryCta}
              </Link>
            </div>
          </div>

          <div className="grid min-h-[32rem] grid-rows-[auto_minmax(0,1fr)] overflow-hidden border border-ink bg-white">
            <div className="border-b border-ink p-6">
              <div className="font-label text-[0.8125rem] font-bold uppercase tracking-[0.2em] text-primary">
                {messages.landing.publicContextTitle}
              </div>
              <p className="mt-4 font-body text-base leading-7 text-ink/75">
                {messages.landing.publicContextDescription}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="border border-ink px-3 py-1 font-label text-[0.75rem] font-bold uppercase tracking-[0.16em] text-ink/70">
                  {messages.landing.operationalPilot}
                </span>
                <span className="border border-ink px-3 py-1 font-label text-[0.75rem] font-bold uppercase tracking-[0.16em] text-ink/70">
                  {messages.landing.publicPoints}
                </span>
                <span className="border border-ink px-3 py-1 font-label text-[0.75rem] font-bold uppercase tracking-[0.16em] text-ink/70">
                  {messages.landing.trustedInputs}
                </span>
              </div>
            </div>
            <div className="grid min-h-0 grid-rows-[minmax(0,1fr)_auto]">
              <div className="min-h-[22rem]">
                <RegionMapInner regions={regions} />
              </div>
              <div className="border-t border-ink p-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <Link
                    href={`/${locale}/avian`}
                    className="inline-block border border-ink px-4 py-2 font-label text-[0.8125rem] font-bold uppercase tracking-[0.2em] text-ink transition-colors hover:bg-ink hover:text-white"
                  >
                    {messages.landing.publicContextCta}
                  </Link>
                  <p className="max-w-md font-label text-[0.75rem] font-bold uppercase tracking-[0.16em] text-ink/45">
                    {messages.landing.publicContextNote}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className={SECTION_CLASSNAME} style={CONTENT_SECTION_STYLE}>
        <div className="grid gap-8 px-7 py-10 md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] md:px-14 md:py-14">
          <div className="border border-ink bg-white">
            <div className="border-b border-ink px-6 py-6 md:px-8 md:py-8">
              <div className="font-label text-[0.8125rem] font-bold uppercase tracking-[0.2em] text-primary">
                {messages.landing.whyTitle}
              </div>
              <p className="mt-4 max-w-2xl font-body text-lg leading-8 text-ink/80">
                {messages.landing.whyDescription}
              </p>
            </div>
            <div className="grid gap-4 px-6 py-6 md:px-8 md:py-8">
              {challenges.map((challenge, index) => (
                <div key={challenge.title} className="border border-ink bg-surface px-5 py-5">
                  <div className="grid gap-4 md:grid-cols-[2rem_minmax(0,1fr)] md:items-start">
                    <span className="inline-flex h-8 w-8 items-center justify-center border border-ink font-label text-[0.75rem] font-bold uppercase tracking-[0.12em] text-primary">
                      {index + 1}
                    </span>
                    <div>
                      <div className="font-label text-[0.75rem] font-bold uppercase tracking-[0.16em] text-ink/70">
                        {challenge.title}
                      </div>
                      <p className="mt-3 font-body text-base leading-7 text-ink/75">
                        {challenge.body}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border border-ink bg-white">
            <div className="grid gap-8 px-6 py-6 md:grid-cols-[minmax(0,0.7fr)_minmax(0,1fr)] md:px-8 md:py-8">
              <div className="space-y-4 border-b border-ink pb-6 md:border-b-0 md:border-r md:pb-0 md:pr-8">
                <div className="font-label text-[0.8125rem] font-bold uppercase tracking-[0.2em] text-primary">
                  {messages.landing.workflowTitle}
                </div>
                <p className="max-w-xl font-body text-lg leading-8 text-ink/80">
                  {messages.landing.workflowDescription}
                </p>
              </div>
              <div className="space-y-4">
                <div className="font-label text-[0.8125rem] font-bold uppercase tracking-[0.2em] text-ink/60">
                  {messages.landing.workflowLabel}
                </div>
                <ol className="space-y-3">
                  {workflow.map((step, index) => (
                    <li key={step} className="grid grid-cols-[2rem_minmax(0,1fr)] items-start gap-4 border-b border-ink/10 pb-3 last:border-b-0 last:pb-0">
                      <span className="inline-flex h-8 w-8 items-center justify-center border border-ink font-label text-[0.75rem] font-bold uppercase tracking-[0.16em] text-primary">
                        {index + 1}
                      </span>
                      <span className="font-body text-base leading-7 text-ink/80">
                        {step}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="disease-intel" className={SECTION_CLASSNAME} style={CONTENT_SECTION_STYLE}>
        <div className="grid gap-8 px-7 py-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:px-14 md:py-14">
          <div className="space-y-5 border border-ink bg-white p-6">
            <div className="font-label text-[0.8125rem] font-bold uppercase tracking-[0.2em] text-primary">
              {messages.landing.scienceTitle}
            </div>
            <p className="mt-4 font-body text-base leading-7 text-ink/75">
              {messages.landing.scienceDescription}
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {scienceCards.map((card) => (
                <div key={card.title} className="border border-ink p-5">
                  <div className="font-label text-[0.75rem] font-bold uppercase tracking-[0.16em] text-ink/55">
                    {card.title}
                  </div>
                  <p className="mt-3 font-body text-base leading-7 text-ink/75">
                    {card.body}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div id="live-demo" className="space-y-5 border border-ink bg-white p-6">
            <div className="space-y-2">
              <div className="font-label text-[0.8125rem] font-bold uppercase tracking-[0.2em] text-primary">
                {messages.landing.demoTitle}
              </div>
              <p className="font-body text-base leading-7 text-ink/75">
                {messages.landing.demoDescription}
              </p>
            </div>
            <div className="grid gap-4">
              {demoCards.map((card) => (
                <div key={card.title} className="border border-ink p-5">
                  <div className="font-headline text-2xl font-bold">{card.title}</div>
                  <p className="mt-3 font-body text-base leading-7 text-ink/75">
                    {card.body}
                  </p>
                  <Link
                    href={card.href}
                    className="mt-4 inline-block border border-ink px-4 py-2 font-label text-[0.75rem] font-bold uppercase tracking-[0.16em] text-ink transition-colors hover:bg-ink hover:text-white"
                  >
                    {card.cta}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="impact" className={SECTION_CLASSNAME} style={CONTENT_SECTION_STYLE}>
        <div className="grid gap-4 px-7 py-10 md:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] md:px-14 md:py-14">
          <div className="flex flex-col justify-center border border-ink bg-white p-6">
            <div className="font-label text-[0.8125rem] font-bold uppercase tracking-[0.2em] text-primary">
              {messages.landing.impactTitle}
            </div>
            <p className="mt-4 font-body text-base leading-7 text-ink/75">
              {messages.landing.impactDescription}
            </p>
            <div className="mt-6 grid gap-4">
              {impactCards.map((card) => (
                <div key={card.title} className="border border-ink p-5">
                  <div className="font-label text-[0.75rem] font-bold uppercase tracking-[0.16em] text-ink/55">
                    {card.title}
                  </div>
                  <p className="mt-3 font-body text-base leading-7 text-ink/75">
                    {card.body}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid content-center gap-3 md:grid-cols-2">
            {featuredRegions.map((region) => (
              <div key={region.id} className="border border-ink bg-white px-5 py-4">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="font-headline text-2xl font-bold">
                    {region.label}
                  </h2>
                  <span className="font-label text-[0.75rem] uppercase tracking-[0.16em] text-ink/60">
                    {region.confidence}
                  </span>
                </div>
                <div className="mt-3 h-2 bg-ink/10">
                  <div
                    className="h-full bg-primary"
                    style={{ width: `${Math.max(10, region.intensity * 100)}%` }}
                  />
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="border border-ink px-2 py-1 font-label text-[0.75rem] uppercase tracking-[0.16em] text-ink/70">
                    {locale === "en" ? "Official" : "Oficial"}: {region.sourceMix.officialConfirmed}
                  </span>
                  <span className="border border-ink px-2 py-1 font-label text-[0.75rem] uppercase tracking-[0.16em] text-ink/70">
                    {locale === "en" ? "Vet" : "Vet"}: {region.sourceMix.verifiedVeterinarian}
                  </span>
                </div>
                <div className="mt-4 font-headline text-3xl font-bold">
                  {region.caseCount}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
