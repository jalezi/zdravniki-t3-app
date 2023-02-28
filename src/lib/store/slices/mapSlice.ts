import type { StateCreator } from 'zustand';

import { SL_CENTER, ZOOM } from '@/lib/constants/map';
import type { LatLngBounds, LatLngTuple } from '@/lib/types/Map';

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
  setZoom: (value: number) => set(() => ({ zoom: value })),
  setCenter: (value: LatLngTuple) => set(() => ({ center: value })),
});
