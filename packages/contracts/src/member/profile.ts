import type {
  NetworkRole,
  PlanName,
  SupportedLocale,
  VeterinaryNetworkId,
} from "@querencia/core-domain";

export interface MemberProfile {
  id: string;
  displayName: string | null;
  preferredLocale: SupportedLocale;
  planName: PlanName;
  networkRole: NetworkRole;
  isVerifiedVeterinarian: boolean;
  veterinaryNetworkId: VeterinaryNetworkId | null;
  veterinaryNetworkName: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateProfileRequest {
  displayName?: string;
  preferredLocale?: SupportedLocale;
}
