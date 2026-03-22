"use client";

import Link from "next/link";
import { useLocale } from "@/i18n/locale-context";
import { Map, ClipboardPlus, BarChart3, Bell, Search } from "lucide-react";

export function MobileNav() {
  const { locale, messages } = useLocale();

  const items = [
    { href: `/${locale}`, icon: Map, label: messages.nav.home, accent: false },
    { href: `/${locale}/avian`, icon: Search, label: messages.nav.intel, accent: false },
    { href: `/${locale}/report`, icon: ClipboardPlus, label: messages.nav.report, accent: true },
    { href: `/${locale}/dashboard`, icon: BarChart3, label: messages.nav.dashboard, accent: true },
    { href: `/${locale}/monitoring`, icon: Bell, label: messages.nav.monitoring, accent: true },
  ];

  return (
    <nav
      className="fixed bottom-0 z-50 w-full overflow-x-auto border-t border-ink bg-surface/95 backdrop-blur-sm md:hidden"
      style={{
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 50,
        minHeight: "var(--app-mobile-nav-height)",
        backdropFilter: "blur(4px)",
        backgroundColor: "rgba(246, 241, 232, 0.95)",
      }}
    >
      <div className="flex min-w-max">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex min-h-[var(--app-mobile-nav-height)] flex-shrink-0 flex-col items-center justify-center gap-0.5 px-4 py-3 transition-colors ${
              item.accent
                ? "text-primary hover:text-ink"
                : "text-ink opacity-70 hover:opacity-100 hover:text-primary"
            }`}
          >
            <item.icon size={18} strokeWidth={1.5} />
            <span className="text-[0.625rem] font-bold uppercase tracking-[0.12em] whitespace-nowrap">
              {item.label}
            </span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
