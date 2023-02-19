import { clsx } from 'clsx';
import dynamic from 'next/dynamic';
import { useMemo, useState } from 'react';

import styles from '@/layouts/Layout.module.css';
import type { LeafletMap } from '@/lib/types/Map';

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

  const [layoutVisible, setLayoutVisible] = useState<
    'loading' | 'map' | 'list'
  >('loading');

  const [_, setMap] = useState<null | LeafletMap>(null);

  const onLayoutChange = () => {
    setLayoutVisible(prev => (prev === 'map' ? 'list' : 'map'));
  };

  const whenReady = () => {
    layoutVisible === 'loading' && setLayoutVisible('map');
  };

  const loadingStyles = clsx(
    styles.Loading,
    styles.Absolute,
    layoutVisible !== 'loading' && styles.Hidden
  );

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
      <div id="loading" className={loadingStyles}>
        Loading
      </div>
      <section id="map" className={mapStyles}>
        <BigMapWithNoSSR setMap={setMap} whenReady={whenReady} />
      </section>
      <section id="list" className={listStyles}>
        <div style={{ height: '100%', width: '100%' }}>List</div>
      </section>
      <section id="filters" className={styles.FiltersSection}>
        <button type="button" onClick={onLayoutChange}>
          show hide
        </button>
      </section>
    </>
  );
};

export default HomeSections;
