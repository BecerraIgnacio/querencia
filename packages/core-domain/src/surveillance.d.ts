export type ReportSource = "official_confirmed" | "verified_veterinarian" | "public_intelligence";
export type ReportConfidenceStatus = "submitted" | "screened" | "probable" | "confirmed" | "rejected" | "duplicate";
export type TimeBucket = "day" | "week" | "month" | "quarter" | "year";
export type HexCellId = string & {
    readonly __hexCellIdBrand: void;
};
export declare function makeHexCellId(id: string): HexCellId;
export type AggregationKey = string & {
    readonly __aggregationKeyBrand: void;
};
export declare function makeAggregationKey(diseaseId: string, territoryKey: string, timeBucket: TimeBucket): AggregationKey;
//# sourceMappingURL=surveillance.d.ts.map
