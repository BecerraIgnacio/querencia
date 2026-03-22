import { cellToBoundary } from "h3-js";
import type { HexPolygon } from "./types";

/**
 * Converts an H3 hex cell ID to a closed polygon suitable for map rendering.
 * Returns coordinates as [lat, lng] pairs (Leaflet convention).
 */
export function hexToPolygon(hexId: string): HexPolygon {
  const boundary = cellToBoundary(hexId);
  // cellToBoundary returns [lat, lng] pairs; close the ring
  const coordinates: [number, number][] = [
    ...boundary,
    boundary[0],
  ] as [number, number][];

  return { hexId, coordinates };
}

export function hexesToPolygons(hexIds: string[]): HexPolygon[] {
  return hexIds.map(hexToPolygon);
}
