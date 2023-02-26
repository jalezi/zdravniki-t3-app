import type {
  LatLngBoundsExpression,
  LatLngLiteral,
  LatLngTuple,
} from '@/lib/types/Map';

export const ZOOM = 8 as const;
export const MIN_ZOOM = 6 as const;
export const MAX_ZOOM = 16 as const;

export const LATITUDE = 46.16 as const;
export const LONGITUDE = 14.82762 as const;
export const SL_CENTER: LatLngTuple = [LATITUDE, LONGITUDE];

export const BOUNDS: {
  southWest: LatLngLiteral;
  northEast: LatLngLiteral;
} = {
  southWest: {
    lat: 45.421,
    lng: 13.355,
  },
  northEast: {
    lat: 46.894,
    lng: 16.637,
  },
};

export const maxBounds: LatLngBoundsExpression = [
  [BOUNDS.southWest.lat, BOUNDS.southWest.lng],
  [BOUNDS.northEast.lat, BOUNDS.northEast.lng],
];
