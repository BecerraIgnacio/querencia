import { cellToParent, cellToLatLng } from "h3-js";
import type { AggregatedHexCell } from "@querencia/contracts";

/**
 * Re-aggregates fine-grained hex cells into coarser parent cells.
 * If targetResolution matches the cells' native resolution, returns them unchanged.
 */
export function reaggregateCells(
  cells: AggregatedHexCell[],
  targetResolution: number,
): AggregatedHexCell[] {
  if (cells.length === 0) return cells;

  // If target is the native resolution (or finer), return as-is
  if (targetResolution >= cells[0].resolution) return cells;

  const parentMap = new Map<
    string,
    { caseCount: number; maxIntensity: number; worstPrivacy: AggregatedHexCell["privacyLevel"] }
  >();

  for (const cell of cells) {
    const parentId = cellToParent(cell.id, targetResolution);
    const existing = parentMap.get(parentId);
    if (existing) {
      existing.caseCount += cell.caseCount;
      existing.maxIntensity = Math.max(existing.maxIntensity, cell.intensity);
      existing.worstPrivacy =
        cell.privacyLevel === "suppressed"
          ? existing.worstPrivacy
          : cell.privacyLevel;
    } else {
      parentMap.set(parentId, {
        caseCount: cell.caseCount,
        maxIntensity: cell.intensity,
        worstPrivacy: cell.privacyLevel,
      });
    }
  }

  // Find max case count for re-normalization
  let maxCount = 0;
  for (const v of parentMap.values()) {
    if (v.caseCount > maxCount) maxCount = v.caseCount;
  }

  const result: AggregatedHexCell[] = [];
  for (const [parentId, data] of parentMap) {
    const [lat, lng] = cellToLatLng(parentId);
    result.push({
      id: parentId as AggregatedHexCell["id"],
      centerLat: lat,
      centerLng: lng,
      resolution: targetResolution,
      caseCount: data.caseCount,
      intensity: maxCount > 0 ? data.caseCount / maxCount : 0,
      privacyLevel: data.worstPrivacy,
    });
  }

  return result;
}
