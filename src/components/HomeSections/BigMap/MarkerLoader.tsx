import clsx from 'clsx';

import DrMarker from '@/components/Shared/Map/DrMarker';
import type { LatLngBounds } from '@/lib/types/Map';

import styles from './BigMap.module.css';

type MarkerLoaderProps = {
  bounds: LatLngBounds | null;
};

const MarkerLoader = ({ bounds }: MarkerLoaderProps) => {
  if (!bounds) {
    return null;
  }

  return (
    <>
      <DrMarker
        center={bounds.getCenter()}
        className={clsx(styles.DrCircle, styles.Loader, styles.Big)}
        accepts="y"
        radius={16}
      />
      <DrMarker
        center={bounds.getCenter()}
        className={clsx(styles.DrCircle, styles.Loader, styles.Small)}
        accepts="y"
        radius={12}
      />
    </>
  );
};

export default MarkerLoader;
