import type { StateCreator } from 'zustand';

import type { LatLngBounds } from '@/lib/types/Map';

import type { AcceptsSliceState } from './acceptsSlice';
import type { SearchSliceState } from './searchSlice';

export type MapSliceState = {
  bounds: LatLngBounds | null;
  setBounds: (bounds: LatLngBounds | null) => void;
};

export const createMapSlice: StateCreator<
  MapSliceState & AcceptsSliceState & SearchSliceState,
  [],
  [],
  MapSliceState
> = (set, _get) => ({
  bounds: null,
  setBounds: (value: LatLngBounds | null) => set(() => ({ bounds: value })),
});
