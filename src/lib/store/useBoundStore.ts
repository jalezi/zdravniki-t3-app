import { create } from 'zustand';

import type { AcceptsSliceState } from './slices/acceptsSlice';
import { createAcceptsSlice } from './slices/acceptsSlice';
import type { MapSliceState } from './slices/mapSlice';
import { createMapSlice } from './slices/mapSlice';
import type { SearchSliceState } from './slices/searchSlice';
import { createSearchSlice } from './slices/searchSlice';

const useBoundStore = create<
  AcceptsSliceState & SearchSliceState & MapSliceState
>()((...a) => ({
  ...createAcceptsSlice(...a),
  ...createSearchSlice(...a),
  ...createMapSlice(...a),
}));

export default useBoundStore;
