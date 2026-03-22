import type { AnimalType } from "@querencia/core-domain";

export interface WatchArea {
  id: string;
  userId: string;
  label: string;
  animalTypes: AnimalType[];
  regionIds: string[];
  portfolioId?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateWatchAreaRequest {
  label: string;
  animalTypes: AnimalType[];
  regionIds: string[];
  portfolioId?: string;
}

export interface UpdateWatchAreaRequest {
  label?: string;
  animalTypes?: AnimalType[];
  regionIds?: string[];
  portfolioId?: string;
  isActive?: boolean;
}

export interface DeleteWatchAreaRequest {
  id: string;
}

export interface WatchAreaListResponse {
  items: WatchArea[];
  total: number;
}
