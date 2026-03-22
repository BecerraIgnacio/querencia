import type { LatLngTuple } from "leaflet";

export interface RegionGeometry {
  id: string;
  label: string;
  polygons: LatLngTuple[][];
}

export const REGION_GEOMETRY: Record<string, RegionGeometry> = {
  "ar-buenos-aires": {
    id: "ar-buenos-aires",
    label: "Buenos Aires",
    polygons: [[
      [-33.9, -63.6],
      [-33.8, -60.7],
      [-34.6, -58.4],
      [-36.5, -56.2],
      [-39.1, -57.8],
      [-39.0, -62.1],
      [-37.3, -64.5],
      [-35.2, -64.7],
    ]],
  },
  "ar-santa-fe": {
    id: "ar-santa-fe",
    label: "Santa Fe",
    polygons: [[
      [-28.0, -61.9],
      [-28.0, -59.1],
      [-30.1, -58.9],
      [-33.2, -60.5],
      [-32.8, -62.2],
      [-29.8, -62.0],
    ]],
  },
  "ar-cordoba": {
    id: "ar-cordoba",
    label: "Cordoba",
    polygons: [[
      [-29.1, -65.4],
      [-29.1, -62.2],
      [-31.0, -61.9],
      [-34.0, -62.3],
      [-34.0, -65.1],
      [-31.8, -65.5],
    ]],
  },
  "ar-entre-rios": {
    id: "ar-entre-rios",
    label: "Entre Rios",
    polygons: [[
      [-30.2, -60.9],
      [-30.1, -58.0],
      [-31.4, -57.7],
      [-33.4, -58.1],
      [-33.1, -60.8],
    ]],
  },
  "ar-chaco": {
    id: "ar-chaco",
    label: "Chaco",
    polygons: [[
      [-24.0, -62.9],
      [-24.0, -58.7],
      [-26.4, -58.4],
      [-28.2, -59.4],
      [-28.2, -62.0],
      [-26.8, -62.9],
    ]],
  },
  "ar-formosa": {
    id: "ar-formosa",
    label: "Formosa",
    polygons: [[
      [-22.0, -62.5],
      [-22.0, -57.8],
      [-24.7, -57.6],
      [-26.4, -58.4],
      [-26.8, -61.7],
      [-24.8, -62.5],
    ]],
  },
  "ar-misiones": {
    id: "ar-misiones",
    label: "Misiones",
    polygons: [[
      [-25.4, -56.2],
      [-25.4, -53.6],
      [-27.9, -53.6],
      [-27.9, -55.9],
      [-26.5, -56.3],
    ]],
  },
  "ar-corrientes": {
    id: "ar-corrientes",
    label: "Corrientes",
    polygons: [[
      [-27.2, -59.8],
      [-27.0, -56.0],
      [-30.0, -56.0],
      [-30.0, -59.7],
      [-28.4, -60.0],
    ]],
  },
};
