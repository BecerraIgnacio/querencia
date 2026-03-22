import type { SupportedLocale } from "@querencia/core-domain";
import { getMessages } from "@/i18n/get-messages";
import { LocaleProvider } from "@/i18n/locale-context";
import { Header } from "@/components/header";
import { MobileNav } from "@/components/mobile-nav";

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}

export default function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const locale = (params.locale === "en" ? "en" : "es") as SupportedLocale;
  const messages = getMessages(locale);

  return (
    <LocaleProvider locale={locale} messages={messages}>
      <script
        dangerouslySetInnerHTML={{
          __html: `document.documentElement.lang="${locale}"`,
        }}
      />
      <Header />
      <main
        className="min-h-screen pb-[var(--app-mobile-nav-height)] pt-[var(--app-header-height)] md:pb-0"
        style={{
          paddingTop: "var(--app-header-height)",
          paddingBottom: "var(--app-mobile-nav-height)",
        }}
      >
        {children}
      </main>
      <MobileNav />
    </LocaleProvider>
  );
}
