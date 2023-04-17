import type { StateCreator } from 'zustand';

import type { SearchSliceState, StoreState } from './types';

export const createSearchSlice: StateCreator<
  StoreState,
  [],
  [],
  SearchSliceState
> = (set, _get) => ({
  search: '',
  setSearch: (value: string) => set(() => ({ search: decodeURI(value) })),
});
