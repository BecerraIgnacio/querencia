import type { AnimalType } from "@querencia/core-domain";

export interface MonitoringPortfolio {
  id: string;
  userId: string;
  name: string;
  description: string | null;
  isDefault: boolean;
  watchAreaIds: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CreatePortfolioRequest {
  name: string;
  description?: string;
}

export interface UpdatePortfolioRequest {
  name?: string;
  description?: string;
  isDefault?: boolean;
}

export interface DeletePortfolioRequest {
  id: string;
}

export interface PortfolioListResponse {
  items: MonitoringPortfolio[];
  total: number;
}

export interface AssignWatchAreasRequest {
  portfolioId: string;
  watchAreaIds: string[];
}

export interface PortfolioSummary {
  id: string;
  name: string;
  watchAreaCount: number;
  animalTypes: AnimalType[];
  totalRegions: number;
  isDefault: boolean;
}
