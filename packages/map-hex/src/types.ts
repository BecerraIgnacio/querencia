export type { AggregatedHexCell, HexCell } from "@querencia/contracts";

export interface HexPolygon {
  hexId: string;
  coordinates: [number, number][]; // [lat, lng] pairs forming closed ring
}

export type IntensityLevel = "none" | "low" | "medium" | "high" | "critical";
