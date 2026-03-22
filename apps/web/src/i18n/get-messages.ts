import type { SupportedLocale } from "@querencia/core-domain";
import esMessages from "./messages/es.json";
import enMessages from "./messages/en.json";

export type Messages = typeof esMessages;

export function getMessages(locale: SupportedLocale): Messages {
  return locale === "en" ? (enMessages as Messages) : esMessages;
}
