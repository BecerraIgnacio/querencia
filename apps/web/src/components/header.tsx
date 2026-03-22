"use client";

import Link from "next/link";
import { useLocale } from "@/i18n/locale-context";
import { LocaleSwitcher } from "./locale-switcher";

export function Header() {
  const { locale, messages } = useLocale();

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 flex h-[var(--app-header-height)] w-full items-center justify-between border-b border-ink bg-surface/95 px-7 backdrop-blur-sm md:px-14"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        height: "var(--app-header-height)",
        backdropFilter: "blur(4px)",
        backgroundColor: "rgba(246, 241, 232, 0.95)",
      }}
    >
      <div className="flex items-center gap-8">
        <Link
          href={`/${locale}`}
          className="text-2xl font-black text-ink uppercase tracking-widest font-headline"
        >
          QUERENCIA
        </Link>
        <nav className="hidden md:flex items-center gap-5">
          <Link
            href={`/${locale}#for-vets`}
            className="text-ink font-medium hover:text-primary transition-colors font-label uppercase tracking-[0.05em] text-[0.8125rem]"
          >
            {messages.nav.forVets}
          </Link>
          <Link
            href={`/${locale}#how-it-works`}
            className="text-ink font-medium hover:text-primary transition-colors font-label uppercase tracking-[0.05em] text-[0.8125rem]"
          >
            {messages.nav.workflow}
          </Link>
          <Link
            href={`/${locale}/avian`}
            className="text-ink font-medium hover:text-primary transition-colors font-label uppercase tracking-[0.05em] text-[0.8125rem]"
          >
            {messages.nav.intel}
          </Link>
          <Link
            href={`/${locale}/dashboard`}
            className="text-ink font-medium hover:text-primary transition-colors font-label uppercase tracking-[0.05em] text-[0.8125rem]"
          >
            {messages.nav.dashboard}
          </Link>
          <Link
            href={`/${locale}#impact`}
            className="text-ink font-medium hover:text-primary transition-colors font-label uppercase tracking-[0.05em] text-[0.8125rem]"
          >
            {messages.nav.impact}
          </Link>
          <Link
            href={`/${locale}/report`}
            className="border border-ink px-3 py-2 text-primary font-medium hover:bg-ink hover:text-white transition-colors font-label uppercase tracking-[0.05em] text-[0.75rem]"
          >
            {messages.nav.report}
          </Link>
        </nav>
      </div>
      <div className="flex items-center gap-4">
        <LocaleSwitcher />
      </div>
    </header>
  );
}
