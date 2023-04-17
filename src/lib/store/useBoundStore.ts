import { create } from 'zustand';

import { createAcceptsSlice } from './slices/acceptsSlice';
import { createMapSlice } from './slices/mapSlice';
import { createSearchSlice } from './slices/searchSlice';
import type { StoreState } from './slices/types';

export type UseBoundStore = StoreState;

const useBoundStore = create<StoreState>()((...a) => ({
  ...createAcceptsSlice(...a),
  ...createSearchSlice(...a),
  ...createMapSlice(...a),
}));

export default useBoundStore;
