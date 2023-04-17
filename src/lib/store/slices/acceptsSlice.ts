import type { StateCreator } from 'zustand';

import type { AcceptsSliceState, AcceptsState, StoreState } from './types';

export const createAcceptsSlice: StateCreator<
  StoreState,
  [],
  [],
  AcceptsSliceState
> = (set, _get) => ({
  accepts: 'all',
  setAccepts: (value: AcceptsState) => set(() => ({ accepts: value })),
});
