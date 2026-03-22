"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale } from "@/i18n/locale-context";
import type { SupportedLocale } from "@querencia/core-domain";

export function LocaleSwitcher() {
  const pathname = usePathname();
  const { locale, messages } = useLocale();

  const otherLocale: SupportedLocale = locale === "es" ? "en" : "es";
  const newPath = pathname.replace(`/${locale}`, `/${otherLocale}`);

  return (
    <Link
      href={newPath}
      className="text-ink font-label uppercase tracking-[0.05em] text-[0.8125rem] font-bold border-b border-ink pb-0.5 hover:text-primary hover:border-primary transition-colors"
    >
      {messages.nav.switchLanguage}
    </Link>
  );
}
