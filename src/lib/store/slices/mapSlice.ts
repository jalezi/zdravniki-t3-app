import type { StateCreator } from 'zustand';

import {
  BOUNDS,
  MAX_ZOOM,
  MIN_ZOOM,
  SL_CENTER,
  ZOOM,
} from '@/lib/constants/map';
import type { LatLngBounds, LatLngTuple } from '@/lib/types/Map';

const { southWest, northEast } = BOUNDS;

import type { AcceptsSliceState } from './acceptsSlice';
import type { SearchSliceState } from './searchSlice';

export type MapSliceState = {
  bounds: LatLngBounds | null;
  center: LatLngTuple;
  zoom: number;

  setBounds: (bounds: LatLngBounds | null) => void;
  setZoom: (zoom: number) => void;
  setCenter: (center: LatLngTuple) => void;
};

export const createMapSlice: StateCreator<
  MapSliceState & AcceptsSliceState & SearchSliceState,
  [],
  [],
  MapSliceState
> = (set, _get) => ({
  bounds: null,
  zoom: ZOOM,
  center: SL_CENTER,
  setBounds: (value: LatLngBounds | null) => set(() => ({ bounds: value })),
  setZoom: (value: number) =>
    set(() => {
      if (value < MIN_ZOOM || value > MAX_ZOOM) return { zoom: ZOOM };
      return { zoom: value };
    }),
  setCenter: (value: LatLngTuple) =>
    set(() => {
      const [lat, lng] = value;
      const newLat =
        lat < southWest.lat || lat > northEast.lat ? SL_CENTER[0] : lat;
      const newLng =
        lng < southWest.lng || lng > northEast.lng ? SL_CENTER[1] : lng;

      return { center: [newLat, newLng] };
    }),
});
