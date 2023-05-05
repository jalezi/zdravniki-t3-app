import { clsx } from 'clsx';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { SkeletonTheme } from 'react-loading-skeleton';
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
import { drTypeCoerceSchema } from '@/lib/types/doctors';
import type { LeafletMap } from '@/lib/types/Map';
import { getDefaultFontSize } from '@/lib/utils/common';

import type { View } from './types';

const Filters = dynamic(() => import('./Filters').then(mod => mod.Filters));
const List = dynamic(() => import('./List').then(mod => mod.List));
const MapSkeleton = dynamic(() => import('./BigMap/MapSkeleton'));

const BigSkeleton = () => <MapSkeleton size="lg" />;

const HomeSections = () => {
  const { query } = useRouter();

  const [layoutVisible, setLayoutVisible] = useState<View>('map');
  const [map, setMap] = useState<null | LeafletMap>(null);
  const zoom = useBoundStore(state => state.zoom);
  const center = useBoundStore(state => state.center);
  const storeSetMap = useBoundStore(state => state.setMap);

  const fontSize = getDefaultFontSize() ?? 16;
  const { width } = useWindowSize();
  const isMediumMediaQuery = width >= (BREAKPOINTS.md * fontSize) / 16;

  const BigMapWithNoSSR = useMemo(
    () =>
      dynamic(() => import('./BigMap').then(mod => mod.BigMap), {
        ssr: false,
        loading: BigSkeleton,
      }),
    []
  );

  useHash();

  useEffect(() => {
    if (map) {
      storeSetMap(map);
    }
  }, [map, storeSetMap]);

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
    !isMediumMediaQuery && styles.Absolute,
    layoutVisible === 'map' && styles.Visible
  );

  const listStyles = clsx(
    styles.ListSection,
    !isMediumMediaQuery && styles.Absolute,
    !isMediumMediaQuery && layoutVisible === 'list' && styles.Visible
  );

  const filtersStyles = clsx(
    styles.FiltersSection,
    !isMediumMediaQuery && styles.Absolute
  );

  // skeleton theme colors are --color-blue-100 and --color-blue-200

  const drTypeParsed = drTypeCoerceSchema.safeParse(query.type);

  return (
    <>
      <section id="filters" className={filtersStyles}>
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
          drType={drTypeParsed.success ? drTypeParsed.data : undefined}
        />
      </section>
      <section id="list" className={listStyles}>
        <SkeletonTheme baseColor="#dae5e7" highlightColor="#c4d4d7">
          <List isVisible={layoutVisible === 'list' || isMediumMediaQuery} />
        </SkeletonTheme>
      </section>
    </>
  );
};

export default HomeSections;
