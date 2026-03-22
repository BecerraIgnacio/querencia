import type {
  AnimalType,
  DiseaseId,
  ReportConfidenceStatus,
  ReportSource,
  SupportedLocale,
} from "@querencia/core-domain";

export type AlertSeverity = "low" | "medium" | "high" | "critical";

export interface Alert {
  id: string;
  userId: string;
  watchAreaId: string;
  diseaseId: DiseaseId;
  animalType: AnimalType;
  severity: AlertSeverity;
  source: ReportSource;
  confidenceStatus: ReportConfidenceStatus;
  titleEn: string;
  titleEs: string;
  messageEn: string;
  messageEs: string;
  regionId: string | null;
  triggeredAt: string;
  read: boolean;
  createdAt: string;
}

/** Locale-resolved alert for UI rendering */
export interface LocalizedAlert {
  id: string;
  diseaseId: DiseaseId;
  animalType: AnimalType;
  severity: AlertSeverity;
  source: ReportSource;
  confidenceStatus: ReportConfidenceStatus;
  title: string;
  message: string;
  regionId: string | null;
  triggeredAt: string;
  read: boolean;
}

export function localizeAlert(
  alert: Alert,
  locale: SupportedLocale,
): LocalizedAlert {
  return {
    id: alert.id,
    diseaseId: alert.diseaseId,
    animalType: alert.animalType,
    severity: alert.severity,
    source: alert.source,
    confidenceStatus: alert.confidenceStatus,
    title: locale === "en" ? alert.titleEn : alert.titleEs,
    message: locale === "en" ? alert.messageEn : alert.messageEs,
    regionId: alert.regionId,
    triggeredAt: alert.triggeredAt,
    read: alert.read,
  };
}

/** Severity thresholds for alert evaluation */
export interface AlertThresholds {
  lowIntensity: number;
  mediumIntensity: number;
  highIntensity: number;
  criticalIntensity: number;
}

export const DEFAULT_ALERT_THRESHOLDS: AlertThresholds = {
  lowIntensity: 0.1,
  mediumIntensity: 0.3,
  highIntensity: 0.6,
  criticalIntensity: 0.85,
};
