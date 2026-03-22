import type {
  AnimalType,
  DiseaseId,
  RegionId,
  ReportConfidenceStatus,
  ReportSource,
  SupportedLocale,
  VeterinaryNetworkId,
} from "@querencia/core-domain";

export type ReportStatus = ReportConfidenceStatus;

export interface ReportSubmissionRequest {
  diseaseId: DiseaseId;
  animalType: AnimalType;
  reportedAt: string;
  source: ReportSource;
  regionId: RegionId;
  caseCountEstimate?: number | null;
  evidenceSummary?: string;
  notes?: string;
  notesLocale?: SupportedLocale;
  veterinaryNetworkId?: VeterinaryNetworkId | null;
}

export interface ReportSubmissionResponse {
  reportId: string;
  status: ReportStatus;
  submittedAt: string;
}

export interface StoredReport {
  id: string;
  diseaseId: DiseaseId;
  animalType: AnimalType;
  source: ReportSource;
  status: ReportStatus;
  reportedAt: string;
  regionId: RegionId;
  caseCountEstimate: number | null;
  evidenceSummary: string | null;
  notes: string | null;
  notesLocale: SupportedLocale | null;
  territoryId: string | null;
  veterinaryNetworkId: VeterinaryNetworkId | null;
  createdAt: string;
  updatedAt: string;
}
