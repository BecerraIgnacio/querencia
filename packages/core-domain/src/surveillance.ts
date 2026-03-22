export type ReportSource =
  | "official_confirmed"
  | "verified_veterinarian"
  | "public_intelligence";

export type ReportConfidenceStatus =
  | "submitted"
  | "screened"
  | "probable"
  | "confirmed"
  | "rejected"
  | "duplicate";

export type TimeBucket = "day" | "week" | "month" | "quarter" | "year";

// Legacy alias retained for transitional modules that still depend on hex utils.
export type HexCellId = string & { readonly __hexCellIdBrand: void };

export function makeHexCellId(id: string): HexCellId {
  return id as HexCellId;
}

export type AggregationKey = string & { readonly __aggregationKeyBrand: void };

export function makeAggregationKey(
  diseaseId: string,
  territoryKey: string,
  timeBucket: TimeBucket,
): AggregationKey {
  return `${diseaseId}:${territoryKey}:${timeBucket}` as AggregationKey;
}
