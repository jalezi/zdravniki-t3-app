import type {
  LatLngBoundsExpression,
  LatLngLiteral,
  LatLngTuple,
} from '@/lib/types/Map';

export const ZOOM = 8 as const;
export const MIN_ZOOM = 6 as const;
export const MAX_ZOOM = 16 as const;

// lat and lng intentionality with five decimal places; otherwise, the map will slightly jump on logo click
export const LATITUDE = 46.16081 as const;
export const LONGITUDE = 14.99634 as const;
export const SL_CENTER: LatLngTuple = [LATITUDE, LONGITUDE];

// slovenia bounds
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

// correction for map bounds; prevents marker's popup to jump up and down when marker is near the edge of the map(bounds)
// todo - calculate based on zoom or add minimap so that user can not get lost
export const BOUNDS_CORRECTION = 1 as const;

export const maxBounds: LatLngBoundsExpression = [
  [
    BOUNDS.southWest.lat - BOUNDS_CORRECTION,
    BOUNDS.southWest.lng - BOUNDS_CORRECTION,
  ],
  [
    BOUNDS.northEast.lat + BOUNDS_CORRECTION,
    BOUNDS.northEast.lng + BOUNDS_CORRECTION,
  ],
];
