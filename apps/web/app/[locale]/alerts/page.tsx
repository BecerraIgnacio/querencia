import type { SupportedLocale } from "@querencia/core-domain";
import { redirect } from "next/navigation";

interface AlertsRouteProps {
  params: { locale: string };
}

export default async function AlertsRoute({ params }: AlertsRouteProps) {
  const locale = (params.locale === "en" ? "en" : "es") as SupportedLocale;
  redirect(`/${locale}/monitoring`);
}
