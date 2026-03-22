import type { SupportedLocale } from "@querencia/core-domain";
import { redirect } from "next/navigation";

interface WorkspaceRouteProps {
  params: { locale: string };
}

export default async function WorkspaceRoute({ params }: WorkspaceRouteProps) {
  const locale = (params.locale === "en" ? "en" : "es") as SupportedLocale;
  redirect(`/${locale}/monitoring`);
}
