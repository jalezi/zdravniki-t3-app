import type { LatLngBounds, LatLngTuple } from 'leaflet';
import { useEffect, useState } from 'react';
import { useMapEvents } from 'react-leaflet';
import { useDebounce } from 'usehooks-ts';

import useBoundStore from '@/lib/store/useBoundStore';
import { getRoundedLatLng } from '@/lib/utils/map';

const BigMapEvents = () => {
  const [bounds, zoom, center] = useBoundStore(state => [
    state.bounds,
    state.zoom,
    state.center,
  ]);

  const [state, setState] = useState<{
    bounds: LatLngBounds | null;
    zoom: number;
    center: LatLngTuple;
  }>({
    bounds,
    zoom,
    center,
  });

  const debouncedState = useDebounce(state, 500);

  const map = useMapEvents({
    moveend: () => {
      const { lat, lng } = getRoundedLatLng(map.getCenter());
      setState({
        bounds: map.getBounds(),
        zoom: map.getZoom(),
        center: [lat, lng],
      });
    },
  });

  useEffect(() => {
    useBoundStore.setState({
      bounds: debouncedState.bounds,
      zoom: debouncedState.zoom,
      center: debouncedState.center,
    });
  }, [debouncedState]);

  return null;
};

export default BigMapEvents;
