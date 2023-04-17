import { z } from 'zod';

import type { LatLngBounds, LatLngTuple, LeafletMap } from '@/lib/types/Map';

export const acceptsStateSchema = z.enum(['all', 'y', 'n']);
export type AcceptsState = z.infer<typeof acceptsStateSchema>;
export type AcceptsSliceState = {
  accepts: AcceptsState;
  setAccepts: (value: AcceptsState) => void;
};

export type MapSliceState = {
  bounds: LatLngBounds | null;
  center: LatLngTuple;
  zoom: number;
  map: LeafletMap | null;

  setBounds: (bounds: LatLngBounds | null) => void;
  setZoom: (zoom: number) => void;
  setCenter: (center: LatLngTuple) => void;
  setMap: (map: LeafletMap | null) => void;
};

export type SearchSliceState = {
  search: string;
  setSearch: (search: string) => void;
};

export type StoreState = AcceptsSliceState & MapSliceState & SearchSliceState;
