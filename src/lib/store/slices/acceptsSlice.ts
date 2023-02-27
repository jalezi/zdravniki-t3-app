import { z } from 'zod';
import type { StateCreator } from 'zustand';

import type { MapSliceState } from './mapSlice';
import type { SearchSliceState } from './searchSlice';

export const acceptsStateSchema = z.enum(['all', 'y', 'n']);

export type AcceptsState = z.infer<typeof acceptsStateSchema>;

export type AcceptsSliceState = {
  accepts: AcceptsState;
  setAccepts: (value: AcceptsState) => void;
};

export const createAcceptsSlice: StateCreator<
  AcceptsSliceState & SearchSliceState & MapSliceState,
  [],
  [],
  AcceptsSliceState
> = (set, _get) => ({
  accepts: 'all',
  setAccepts: (value: AcceptsState) => set(() => ({ accepts: value })),
});
