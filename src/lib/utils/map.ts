import type { LatLngLiteral } from 'leaflet';

export const getRoundedLatLng = (latLng: LatLngLiteral): LatLngLiteral => {
  const { lat, lng } = latLng;
  return { lat: Number(lat.toFixed(5)), lng: Number(lng.toFixed(5)) };
};
