import Image from 'next/image';

import fakeMap from '@/assets/images/fake-map.png';

import styles from './BigMap.module.css';

const MapSkeleton = () => (
  <div className={styles.MapSkeletonContainer}>
    <Image
      src={fakeMap}
      fill
      alt="fake map"
      priority
      style={{ objectFit: 'cover' }}
    />
  </div>
);

export default MapSkeleton;
