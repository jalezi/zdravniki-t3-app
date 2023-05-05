import { clsx } from 'clsx';
import Image from 'next/image';

import fakeMapLg from '@/assets/images/fake-map-lg.png';
import fakeMapSm from '@/assets/images/fake-map-sm.png';

import styles from './BigMap.module.css';

// i hope this is just temporary
type MapSkeletonProps = { size: 'sm' | 'lg' };

const MapSkeleton = ({ size = 'lg' }: MapSkeletonProps) => {
  const mapSkeletonStyles = clsx(
    styles.MapSkeletonContainer,
    size === 'sm' && styles.Sm
  );

  return (
    <div className={mapSkeletonStyles}>
      <Image
        src={size === 'lg' ? fakeMapLg : fakeMapSm}
        alt="fake map"
        priority
        sizes="(max-width: 48em) 100vw,
              (max-width: 56em) 62.5vw,
              (max-width: 64em) 65vw,
              (max-width: 69.5em) 66vw,
              (max-width: 75em) 68.5vw,
              (max-width: 87.5em) 69.5vw,
              70.5vw"
        className={styles.MapSkeleton}
      />
    </div>
  );
};

export default MapSkeleton;

// 48em 768px
// 56em 896px
// 64em 1024px
// 69.5em 1112px
// 75em 1200px
// 87.5em 1400px
