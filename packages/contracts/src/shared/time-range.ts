import type { TimeBucket } from "@querencia/core-domain";

export interface TimeRange {
  from: string; // ISO 8601 date string
  to: string;   // ISO 8601 date string
  bucket: TimeBucket;
}
