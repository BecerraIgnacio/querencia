export type TerritoryId = string & { readonly __territoryIdBrand: void };

export function makeTerritoryId(id: string): TerritoryId {
  return id as TerritoryId;
}

export type RegionId = string & { readonly __regionIdBrand: void };

export function makeRegionId(id: string): RegionId {
  return id as RegionId;
}

export type VeterinaryNetworkId = string & {
  readonly __veterinaryNetworkIdBrand: void;
};

export function makeVeterinaryNetworkId(id: string): VeterinaryNetworkId {
  return id as VeterinaryNetworkId;
}
