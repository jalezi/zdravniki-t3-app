import type { StateCreator } from 'zustand';

import type { AcceptsSliceState } from './acceptsSlice';
import type { MapSliceState } from './mapSlice';

export type SearchSliceState = {
  search: string;
  setSearch: (search: string) => void;
};

export const createSearchSlice: StateCreator<
  SearchSliceState & AcceptsSliceState & MapSliceState,
  [],
  [],
  SearchSliceState
> = (set, _get) => ({
  search: '',
  setSearch: (value: string) => set(() => ({ search: value })),
});
