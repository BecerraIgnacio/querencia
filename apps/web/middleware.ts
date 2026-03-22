import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import type { SupportedLocale } from "@querencia/core-domain";

const SUPPORTED_LOCALES: SupportedLocale[] = ["en", "es"];
const DEFAULT_LOCALE: SupportedLocale = "es";

function detectLocale(request: NextRequest): SupportedLocale {
  const acceptLanguage = request.headers.get("accept-language") ?? "";
  const preferred = acceptLanguage
    .split(",")
    .map((lang) => lang.split(";")[0].trim().slice(0, 2))
    .find((lang): lang is SupportedLocale =>
      SUPPORTED_LOCALES.includes(lang as SupportedLocale),
    );
  return preferred ?? DEFAULT_LOCALE;
}

export function middleware(request: NextRequest): NextResponse {
  const { pathname } = request.nextUrl;

  // Skip static files and API routes
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/auth") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Check if pathname already has a locale prefix
  const hasLocale = SUPPORTED_LOCALES.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );

  if (!hasLocale) {
    const locale = detectLocale(request);
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}${pathname}`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
