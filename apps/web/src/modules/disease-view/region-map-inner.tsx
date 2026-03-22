"use client";

import { useEffect, useMemo, useState } from "react";
import type { LatLngTuple } from "leaflet";
import { latLngBounds } from "leaflet";
import {
  MapContainer,
  Polygon,
  TileLayer,
  Tooltip,
  useMap,
  ZoomControl,
} from "react-leaflet";
import type { RegionAggregation } from "@querencia/contracts";
import "leaflet/dist/leaflet.css";
import {
  SATELLITE_TILE_ATTRIBUTION,
  SATELLITE_TILE_URL,
} from "./map-basemap";

type Position = [number, number];

interface ProvinceFeature {
  type: "Feature";
  properties: {
    id: string;
    nombre: string;
  };
  geometry: {
    type: "Polygon" | "MultiPolygon";
    coordinates: Position[][] | Position[][][];
  };
}

interface ProvinceCollection {
  type: "FeatureCollection";
  features: ProvinceFeature[];
}

interface RegionMapInnerProps {
  regions: RegionAggregation[];
}

function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function regionSlug(regionId: string) {
  return regionId.replace(/^ar-/, "");
}

function toLatLngRing(ring: Position[]) {
  return ring.map(([lng, lat]) => [lat, lng] as LatLngTuple);
}

function toLeafletPolygons(feature: ProvinceFeature) {
  if (feature.geometry.type === "Polygon") {
    return [(feature.geometry.coordinates as Position[][]).map(toLatLngRing)];
  }

  return (feature.geometry.coordinates as Position[][][]).map((polygon) =>
    polygon.map(toLatLngRing),
  );
}

function flattenPolygons(polygons: LatLngTuple[][][]) {
  return polygons.flatMap((polygon) => polygon.flat());
}

function FitBounds({ coordinates }: { coordinates: LatLngTuple[] }) {
  const map = useMap();

  useEffect(() => {
    if (coordinates.length === 0) {
      return;
    }

    map.fitBounds(latLngBounds(coordinates), {
      padding: [18, 18],
      maxZoom: 6,
    });
  }, [coordinates, map]);

  return null;
}

function getFillColor(intensity: number) {
  if (intensity >= 0.85) return "#B20011";
  if (intensity >= 0.6) return "#D72626";
  if (intensity >= 0.35) return "#DD6B20";
  return "#C9A200";
}

export function RegionMapInner({ regions }: RegionMapInnerProps) {
  const [provinceData, setProvinceData] = useState<ProvinceCollection | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetch("/data/ar-provincias.geojson")
      .then((response) => response.json())
      .then((data: ProvinceCollection) => {
        if (!cancelled) {
          setProvinceData(data);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setProvinceData({ type: "FeatureCollection", features: [] });
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const regionMap = useMemo(
    () =>
      new Map(regions.map((region) => [regionSlug(region.id), region] as const)),
    [regions],
  );

  const provinceFeatures = provinceData?.features ?? [];

  const renderedFeatures = useMemo(
    () =>
      provinceFeatures.map((feature) => {
        const slug = slugify(feature.properties.nombre);
        return {
          feature,
          slug,
          match: regionMap.get(slug),
          polygons: toLeafletPolygons(feature),
        };
      }),
    [provinceFeatures, regionMap],
  );

  const highlighted = renderedFeatures.filter((item) => item.match);

  const boundsCoordinates = useMemo(() => {
    const source = highlighted.length > 0 ? highlighted : renderedFeatures;
    return source.flatMap((item) => flattenPolygons(item.polygons));
  }, [highlighted, renderedFeatures]);

  return (
    <MapContainer
      center={[-35, -64]}
      zoom={5}
      className="leaflet-satellite-map h-full min-h-[20rem] w-full"
      zoomControl={false}
      attributionControl={false}
      scrollWheelZoom={false}
      style={{ background: "#aeb3b8" }}
    >
      <TileLayer
        url={SATELLITE_TILE_URL}
        attribution={SATELLITE_TILE_ATTRIBUTION}
        maxZoom={17}
      />
      <ZoomControl position="bottomright" />
      <FitBounds coordinates={boundsCoordinates} />

      {renderedFeatures.map(({ feature, polygons, match }) =>
        polygons.map((polygon, index) => (
          <Polygon
            key={`${feature.properties.id}-${index}`}
            positions={polygon}
            pathOptions={{
              color: match ? "#1a1212" : "#000000",
              weight: match ? 1.2 : 0.6,
              opacity: match ? 0.75 : 0,
              fillColor: match ? getFillColor(match.intensity) : "#000000",
              fillOpacity: match ? 0.22 + match.intensity * 0.24 : 0,
            }}
          >
            {match ? (
              <Tooltip sticky className="province-tooltip">
                <div className="space-y-1">
                  <div className="font-bold">{match.label}</div>
                  <div>{match.caseCount} cases</div>
                  <div>Intensity: {(match.intensity * 100).toFixed(0)}%</div>
                </div>
              </Tooltip>
            ) : null}
          </Polygon>
        )),
      )}
    </MapContainer>
  );
}
