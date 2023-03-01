import { clsx } from 'clsx';
import dynamic from 'next/dynamic';
import { useEffect, useMemo, useState } from 'react';
import { useWindowSize } from 'usehooks-ts';

import styles from '@/layouts/Layout.module.css';
import { BREAKPOINTS } from '@/lib/constants';
import {
  MAX_ZOOM,
  MIN_ZOOM,
  SL_CENTER,
  ZOOM,
  maxBounds,
} from '@/lib/constants/map';
import useHash from '@/lib/hooks/useHash';
import useBoundStore from '@/lib/store/useBoundStore';
import type { LeafletMap } from '@/lib/types/Map';

import { Filters } from './Filters';
import { List } from './List';
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

  const [layoutVisible, setLayoutVisible] = useState<View>('map');
  const [map, setMap] = useState<null | LeafletMap>(null);
  const zoom = useBoundStore(state => state.zoom);
  const center = useBoundStore(state => state.center);
  const bounds = useBoundStore(state => state.bounds);
  const setBounds = useBoundStore(state => state.setBounds);

  const { width } = useWindowSize();
  const isMediumMediaQuery = width >= BREAKPOINTS.md;

  useHash();
  useEffect(() => {
    if (map && !bounds) {
      setBounds(map.getBounds());
    }
  }, [map, bounds, setBounds]);

  const lat = center[0];
  const lng = center[1];

  useEffect(() => {
    if (map) {
      map.flyTo({ lat, lng }, zoom, { noMoveStart: true });
    }
  }, [lat, lng, map, zoom]);

  useEffect(() => {
    if (isMediumMediaQuery) {
      setLayoutVisible('map');
    }
  }, [isMediumMediaQuery]);

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
    !isMediumMediaQuery && layoutVisible === 'list' && styles.Visible
  );

  return (
    <>
      <section id="filters" className={styles.FiltersSection}>
        <Filters onLayoutChange={onLayoutChange} view={layoutVisible} />
      </section>
      <section id="map" className={mapStyles}>
        <BigMapWithNoSSR
          center={center ?? (SL_CENTER as [number, number])}
          maxBounds={maxBounds}
          setMap={setMap}
          zoom={zoom || ZOOM}
          maxZoom={MAX_ZOOM}
          minZoom={MIN_ZOOM}
        />
      </section>
      <section id="list" className={listStyles}>
        <List />
      </section>
    </>
  );
};

export default HomeSections;
