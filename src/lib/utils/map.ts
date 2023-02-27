import type { LatLngBounds, LatLngLiteral, LatLngTuple } from '@/lib/types/Map';
import type { Doctor } from '@/server/api/routers/doctors';

import { SL_CENTER } from '../constants/map';

/**
 *
 * @param latLng
 * @returns rounded latLng to 5 decimal places
 */
export const getRoundedLatLng = (latLng: LatLngLiteral): LatLngLiteral => {
  const { lat, lng } = latLng;
  return { lat: Number(lat.toFixed(5)), lng: Number(lng.toFixed(5)) };
};

/**
 *
 * @param bounds
 * @param latLng
 * @returns true if latLng is within bounds
 */
export const boundsIntersect = (
  bounds: LatLngBounds,
  latLng: LatLngLiteral
) => {
  const { lat, lng } = latLng;
  const corner = [lat, lng] satisfies LatLngTuple;

  return bounds.intersects([corner, corner]);
};

/**
 *
 * @param doctor
 * @returns doctors's geo location or SL_CENTER if doctor has no location
 */
export const getDoctorLatLng = (doctor: Doctor) => {
  return (
    doctor.location.geoLocation ??
    doctor.institution?.location.geoLocation ?? {
      lat: SL_CENTER[0],
      lng: SL_CENTER[1],
    }
  );
};
