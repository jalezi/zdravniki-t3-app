import clsx from 'clsx';

import DrMarker from '@/components/Shared/Map/DrMarker';
import { BOUNDS } from '@/lib/constants/map';
import type { LatLngBounds } from '@/lib/types/Map';

import styles from './BigMap.module.css';

function getRandom(min: number, max: number, round = false) {
  if (round) {
    return Math.round((max - min) * Math.random() + min);
  }
  return (max - min) * Math.random() + min;
}

type RandomMarkersProps = {
  bounds: LatLngBounds | null;
  count: number;
};

const RandomMarkers = ({ bounds, count = 50 }: RandomMarkersProps) => {
  if (!bounds) {
    return null;
  }

  const swLat =
    bounds.getSouthWest().lat < BOUNDS.southWest.lat
      ? BOUNDS.southWest.lat
      : bounds.getSouthWest().lat;

  const swLng =
    bounds.getSouthWest().lng < BOUNDS.southWest.lng
      ? BOUNDS.southWest.lng
      : bounds?.getSouthWest().lng;

  const neLat =
    bounds.getNorthEast().lat > BOUNDS.northEast.lat
      ? BOUNDS.northEast.lat
      : bounds?.getNorthEast().lat;

  const neLng =
    bounds.getNorthEast().lng > BOUNDS.northEast.lng
      ? BOUNDS.northEast.lng
      : bounds?.getNorthEast().lng;

  const fakeMarkers = Array.from({ length: count }).map((_, i) => {
    const lat = getRandom(swLat, neLat);
    const lng = getRandom(swLng, neLng);

    const randomAccepts = getRandom(0, 1, true);

    return (
      <DrMarker
        key={i}
        center={{ lat, lng }}
        className={clsx(
          styles.DrCircle,
          randomAccepts ? styles.Accepts : styles.Rejects
        )}
        accepts={randomAccepts ? 'y' : 'n'}
      />
    );
  });

  return <>{fakeMarkers}</>;
};

export default RandomMarkers;
