import { clsx } from 'clsx';
import { memo } from 'react';
import { useDebounce } from 'usehooks-ts';

import { Map, TotalHits } from '@/components/Shared/Map';
import DrMarker from '@/components/Shared/Map/DrMarker';
import type { MapProps } from '@/components/Shared/Map/Map';
import CustomMarkerClusterGroup, {
  createClusterCustomIcon,
} from '@/components/Shared/Map/MarkerClusterGroup';
import useDoctors from '@/lib/hooks/useDoctors';
import useBoundStore from '@/lib/store/useBoundStore';
import { createDoctorFilter } from '@/lib/utils/search';

import styles from './BigMap.module.css';
import BigMapEvents from './BigMapEvents';

export type BigMapProps = MapProps;

function withMap(Component: typeof Map) {
  function BigMap(props: BigMapProps) {
    const { setMap, ...rest } = props;
    const { data } = useDoctors();
    const accepts = useBoundStore(state => state.accepts);
    const bounds = useBoundStore(state => state.bounds);
    const search = useBoundStore(state => state.search);
    const debouncedSearch = useDebounce(search, 500);

    // todo handle error and loading status

    const doctorFilter =
      bounds &&
      createDoctorFilter({ accepts, bounds, search: debouncedSearch });
    const filteredDoctors = doctorFilter
      ? data?.doctors.filter(doctorFilter)
      : [];
    const markers =
      filteredDoctors?.map(doctor => {
        const center = doctor.location.geoLocation ??
          doctor.institution?.location.geoLocation ?? { lat: 0, lng: 0 };

        const markerStyles = clsx(
          styles.DrCircle,
          doctor.accepts === 'y' ? styles.Accepts : styles.Rejects
        );

        return (
          <DrMarker
            key={doctor.fakeId}
            center={center}
            className={markerStyles}
            accepts={doctor.accepts}
          />
        );
      }) ?? null;

    return (
      <Component setMap={setMap} {...rest} className={styles.BigMap}>
        <BigMapEvents />
        <CustomMarkerClusterGroup
          iconCreateFunction={createClusterCustomIcon}
          maxClusterRadius={40}
        >
          {markers}
        </CustomMarkerClusterGroup>
        <TotalHits count={markers?.length ?? 0} />
      </Component>
    );
  }

  return memo(BigMap);
}

export default withMap(Map);
