import { memo } from 'react';
import { useDebounce } from 'usehooks-ts';

import { Map, TotalHits } from '@/components/Shared/Map';
import DataSource from '@/components/Shared/Map/DataSource';
import type { MapProps } from '@/components/Shared/Map/Map';
import CustomMarkerClusterGroup, {
  createClusterCustomIcon,
} from '@/components/Shared/Map/MarkerClusterGroup';
import useDoctors from '@/lib/hooks/useDoctors';
import useBoundStore from '@/lib/store/useBoundStore';
import { createDoctorFilter } from '@/lib/utils/search';

import styles from './BigMap.module.css';
import BigMapEvents from './BigMapEvents';
import RandomMarkers from './RandomMarkers';
import RealMarkers from './RealMarkers';

export type BigMapProps = MapProps;

function withMap(Component: typeof Map) {
  // eslint-disable-next-line sonarjs/cognitive-complexity
  function BigMap(props: BigMapProps) {
    const { setMap, ...rest } = props;
    const { data, status } = useDoctors();
    const accepts = useBoundStore(state => state.accepts);
    const bounds = useBoundStore(state => state.bounds);
    const search = useBoundStore(state => state.search);
    const debouncedSearch = useDebounce(search, 500);

    // todo handle error and loading status
    if (status === 'error') {
      return <div>error</div>;
    }

    const doctorFilter =
      bounds &&
      createDoctorFilter({ accepts, bounds, search: debouncedSearch });
    const filteredDoctors = doctorFilter
      ? data?.doctors.filter(doctorFilter)
      : [];

    return (
      <Component setMap={setMap} {...rest} className={styles.BigMap}>
        {status === 'loading' && <RandomMarkers bounds={bounds} count={20} />}
        <BigMapEvents />
        <CustomMarkerClusterGroup
          iconCreateFunction={createClusterCustomIcon}
          maxClusterRadius={40}
        >
          <RealMarkers doctors={filteredDoctors ?? []} />
        </CustomMarkerClusterGroup>
        <TotalHits count={filteredDoctors?.length ?? 0} />
        <DataSource />
      </Component>
    );
  }

  return memo(BigMap);
}

export default withMap(Map);
