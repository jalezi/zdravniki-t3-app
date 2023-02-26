import { clsx } from 'clsx';
import dynamic from 'next/dynamic';
import { useMemo, useState } from 'react';

import styles from '@/layouts/Layout.module.css';
import {
  MAX_ZOOM,
  MIN_ZOOM,
  SL_CENTER,
  ZOOM,
  maxBounds,
} from '@/lib/constants/map';
import useDoctors from '@/lib/hooks/useDoctors';
import useHash from '@/lib/hooks/useHash';
import type { LeafletMap } from '@/lib/types/Map';

import { Filters } from './Filters';
import type { View } from './types';

const MapSkeleton = () => <div>loading map...</div>;

const List = () => {
  const { data, status } = useDoctors();

  if (status === 'loading') {
    return <div>loading...</div>;
  }

  if (status === 'error') {
    return <div>error</div>;
  }

  return (
    <ul>
      {data?.doctors.map(doctor => (
        <li key={doctor.fakeId}>{doctor.doctor}</li>
      ))}
    </ul>
  );
};

const HomeSections = () => {
  const BigMapWithNoSSR = useMemo(
    () =>
      dynamic(() => import('./BigMap').then(mod => mod.BigMap), {
        ssr: false,
        loading: MapSkeleton,
      }),
    []
  );

  useHash();

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
        <BigMapWithNoSSR
          center={SL_CENTER as [number, number]}
          maxBounds={maxBounds}
          setMap={setMap}
          zoom={ZOOM}
          maxZoom={MAX_ZOOM}
          minZoom={MIN_ZOOM}
        />
      </section>
      <section id="list" className={listStyles}>
        <List />
      </section>
      <section id="filters" className={styles.FiltersSection}>
        <Filters onLayoutChange={onLayoutChange} view={layoutVisible} />
      </section>
    </>
  );
};

export default HomeSections;
