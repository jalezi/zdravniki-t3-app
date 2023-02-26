import type { LatLng } from '@/lib/types/Map';

export const getRoundedLatLng = (latLng: LatLng): LatLng => {
  const { lat, lng } = latLng;
  return { lat: Number(lat.toFixed(5)), lng: Number(lng.toFixed(5)) };
};
