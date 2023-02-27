import type { LatLngBounds, LatLngLiteral, LatLngTuple } from '@/lib/types/Map';

export const getRoundedLatLng = (latLng: LatLngLiteral): LatLngLiteral => {
  const { lat, lng } = latLng;
  return { lat: Number(lat.toFixed(5)), lng: Number(lng.toFixed(5)) };
};

export const boundsIntersect = (
  bounds: LatLngBounds,
  latLng: LatLngLiteral
) => {
  const { lat, lng } = latLng;
  const corner = [lat, lng] satisfies LatLngTuple;

  return bounds.intersects([corner, corner]);
};
