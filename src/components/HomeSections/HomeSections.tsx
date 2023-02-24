import { clsx } from 'clsx';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';

import styles from '@/layouts/Layout.module.css';
import { SL_CENTER, ZOOM } from '@/lib/constants/map';
import type { LeafletMap } from '@/lib/types/Map';
import { parseHash, stringifyHash } from '@/lib/utils/url-hash';

import { Filters } from './Filters';
import type { View } from './types';

const MapSkeleton = () => <div>loading map...</div>;

const HomeSections = () => {
  const BigMapWithNoSSR = useMemo(
    () =>
      dynamic(() => import('./BigMap').then(mod => mod.BigMap), {
        ssr: false,
        loading: MapSkeleton,
      }),
    []
  );

  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;
    const documentLocHash = document.location.hash;
    const parsedHash = parseHash(documentLocHash?.split('#')?.[1] ?? '');

    if (parsedHash.success) return;

    const newHash = stringifyHash(['all', [ZOOM, ...SL_CENTER], '']);
    let newPath = router.asPath;
    if (!documentLocHash) {
      newPath = `${router.asPath}${newHash}`;
      return void router.replace(newPath, newPath, {
        shallow: true,
        locale: router.locale,
      });
    }
    // ? notify user if hash is invalid
    newPath = router.asPath.replace(documentLocHash, newHash);
    void router.replace(newPath, newPath, {
      shallow: true,
      locale: router.locale,
    });
  }, [router]);

  const [layoutVisible, setLayoutVisible] = useState<View>('map');

  const [_, setMap] = useState<null | LeafletMap>(null);

  const onLayoutChange = () => {
    setLayoutVisible(prev => (prev === 'map' ? 'list' : 'map'));
  };

  const mapStyles = clsx(
    styles.MapSection,
    styles.Absolute,
    layoutVisible === 'map' && styles.Visible
  );

  const listStyles = clsx(
    styles.ListSection,
    styles.Absolute,
    layoutVisible === 'list' && styles.Visible
  );

  return (
    <>
      <section id="map" className={mapStyles}>
        <BigMapWithNoSSR setMap={setMap} />
      </section>
      <section id="list" className={listStyles}>
        <div style={{ height: '100%', width: '100%' }}>List</div>
      </section>
      <section id="filters" className={styles.FiltersSection}>
        <Filters onLayoutChange={onLayoutChange} view={layoutVisible} />
      </section>
    </>
  );
};

export default HomeSections;
