import { clsx } from 'clsx';
import Image from 'next/image';

import fakeMapLg from '@/assets/images/fake-map-lg.png';
import fakeMapSm from '@/assets/images/fake-map-sm.png';

import styles from './BigMap.module.css';

// i hope this is just temporary
type MapSkeletonProps = { size: 'sm' | 'lg' };

const MapSkeleton = ({ size = 'lg' }: MapSkeletonProps) => {
  const mapSkeletonStyles = clsx(
    styles.MapSkeletonContaine,
    size === 'sm' && styles.Sm
  );

  return (
    <div className={mapSkeletonStyles}>
      <Image
        src={size === 'lg' ? fakeMapLg : fakeMapSm}
        fill
        alt="fake map"
        priority
        sizes="(max-width: 768px) 100vw,
              (max-width: 896px) 62.5vw,
              (max-width: 1024px) 65vw,
              (max-width: 1112px) 66vw,
              (max-width: 1200px) 68.5vw,
              (max-width: 1400px) 69.5vw,
              70.5vw"
        style={{ objectFit: 'cover' }}
      />
    </div>
  );
};

export default MapSkeleton;
