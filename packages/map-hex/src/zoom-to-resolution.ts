/**
 * Maps Leaflet zoom levels to H3 resolutions.
 * When zoomed out, use coarser (lower) resolutions so hexes remain visible.
 * Native pipeline data is resolution 7.
 */

const ZOOM_RESOLUTION_MAP: [maxZoom: number, resolution: number][] = [
  [3, 3],
  [4, 4],
  [6, 5],
  [8, 6],
  [Infinity, 7],
];

export const MIN_HEX_RESOLUTION = 3;
export const MAX_HEX_RESOLUTION = 7;

export function zoomToResolution(zoom: number): number {
  for (const [maxZoom, resolution] of ZOOM_RESOLUTION_MAP) {
    if (zoom <= maxZoom) return resolution;
  }
  return MAX_HEX_RESOLUTION;
}
