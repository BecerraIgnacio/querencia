"use client";

import { useState, useMemo } from "react";
import { MapContainer, TileLayer, Polygon, Tooltip, useMapEvents } from "react-leaflet";
import type { AggregatedHexCell } from "@querencia/contracts";
import {
  hexesToPolygons,
  zoomToResolution,
  reaggregateCells,
} from "@querencia/map-hex";
import "leaflet/dist/leaflet.css";
import {
  SATELLITE_TILE_ATTRIBUTION,
  SATELLITE_TILE_URL,
} from "./map-basemap";

interface HexMapInnerProps {
  centerLat: number;
  centerLng: number;
  cells: AggregatedHexCell[];
}

function ZoomTracker({ onZoom }: { onZoom: (z: number) => void }) {
  useMapEvents({
    zoomend(e) {
      onZoom(e.target.getZoom());
    },
  });
  return null;
}

export function HexMapInner({
  centerLat,
  centerLng,
  cells,
}: HexMapInnerProps) {
  const initialZoom = 9;
  const [zoom, setZoom] = useState(initialZoom);
  const targetResolution = zoomToResolution(zoom);

  const visibleCells = useMemo(
    () => reaggregateCells(cells, targetResolution),
    [cells, targetResolution],
  );

  const polygons = useMemo(
    () => hexesToPolygons(visibleCells.map((c) => c.id)),
    [visibleCells],
  );

  const cellMap = new Map(visibleCells.map((c) => [c.id, c]));

  return (
    <MapContainer
      center={[centerLat, centerLng]}
      zoom={initialZoom}
      className="leaflet-satellite-map h-full min-h-80 w-full border border-ink"
      attributionControl={false}
    >
      <TileLayer
        url={SATELLITE_TILE_URL}
        attribution={SATELLITE_TILE_ATTRIBUTION}
        maxZoom={17}
      />
      <ZoomTracker onZoom={setZoom} />
      {polygons.map((polygon) => {
        const cell = cellMap.get(polygon.hexId as AggregatedHexCell["id"]);
        if (!cell) return null;

        return (
          <Polygon
            key={polygon.hexId}
            positions={polygon.coordinates}
            pathOptions={{
              fillColor: "#D72626",
              fillOpacity: 0.3 + cell.intensity * 0.6,
              color: "#D72626",
              weight: 1,
              opacity: 0.6,
            }}
          >
            <Tooltip>{cell.caseCount} casos</Tooltip>
          </Polygon>
        );
      })}
    </MapContainer>
  );
}
