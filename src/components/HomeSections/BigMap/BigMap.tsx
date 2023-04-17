import { memo } from 'react';
import { useDebounce } from 'usehooks-ts';

import { Fallback } from '@/components/Shared/Errors';
import { Map, TotalHits } from '@/components/Shared/Map';
import DataSource from '@/components/Shared/Map/DataSource';
import LocateControl from '@/components/Shared/Map/LocateControl';
import type { MapProps } from '@/components/Shared/Map/Map';
import CustomMarkerClusterGroup, {
  createClusterCustomIcon,
} from '@/components/Shared/Map/MarkerClusterGroup';
import useDoctors from '@/lib/hooks/useDoctors';
import useBoundStore from '@/lib/store/useBoundStore';
import { createDoctorFilter } from '@/lib/utils/search';
import type { Doctor } from '@/server/api/routers/doctors';

import styles from './BigMap.module.css';
import BigMapEvents from './BigMapEvents';
import RandomMarkers from './RandomMarkers';
import RealMarkers from './RealMarkers';

export type BigMapProps = MapProps & { drType: Doctor['type'] | undefined };

function withMap(Component: typeof Map) {
  function BigMap(props: BigMapProps) {
    const { setMap, drType, ...rest } = props;
    const { data, status } = useDoctors();
    const accepts = useBoundStore(state => state.accepts);
    const bounds = useBoundStore(state => state.bounds);
    const search = useBoundStore(state => state.search);
    const debouncedSearch = useDebounce(search, 500);

    // todo handle error and loading status
    if (status === 'error') {
      return <Fallback />;
    }

    const doctorFilter =
      bounds &&
      createDoctorFilter({ accepts, bounds, search: debouncedSearch });
    const filteredDoctors = doctorFilter
      ? data?.doctors.filter(doctorFilter)
      : [];

    const c = createClusterCustomIcon(drType ? { drType } : undefined);

    return (
      <Component setMap={setMap} {...rest} className={styles.BigMap}>
        {status === 'loading' && <RandomMarkers bounds={bounds} count={20} />}
        <BigMapEvents />
        <CustomMarkerClusterGroup
          key={drType}
          iconCreateFunction={c}
          maxClusterRadius={40}
        >
          <RealMarkers doctors={filteredDoctors ?? []} />
        </CustomMarkerClusterGroup>
        <TotalHits count={filteredDoctors?.length ?? 0} />
        <LocateControl flyTo initialZoomLevel={13} returnToPrevBounds />
        <DataSource />
      </Component>
    );
  }

  return BigMap;
}

export default memo(withMap(Map));
