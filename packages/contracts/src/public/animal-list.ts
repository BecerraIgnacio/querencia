import type { AnimalType, SupportedLocale } from "@querencia/core-domain";

export interface AnimalListRequest {
  locale: SupportedLocale;
}

export interface AnimalListItem {
  type: AnimalType;
  label: string;
  description: string;
}

export interface AnimalListResponse {
  locale: SupportedLocale;
  animals: AnimalListItem[];
}
