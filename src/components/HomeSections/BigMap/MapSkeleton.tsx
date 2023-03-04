import Image from 'next/image';

import fakeMap from '@/assets/images/fake-map-lg.png';

import styles from './BigMap.module.css';

const MapSkeleton = () => (
  <div className={styles.MapSkeletonContainer}>
    <Image
      src={fakeMap}
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

export default MapSkeleton;
