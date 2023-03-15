import { clsx } from 'clsx';
import { memo } from 'react';
import { Popup as ReactLeafletPopup } from 'react-leaflet';
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
import { DrActions } from '../DrInfo/DrActions';
import { DrAvailabilityInfo } from '../DrInfo/DrAvailabilityInfo';
import { DrBasicInfo } from '../DrInfo/DrBasicInfo';

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
          >
            <ReactLeafletPopup>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1em',
                  justifyContent: 'space-between',
                }}
              >
                <DrBasicInfo
                  drId={doctor.fakeId}
                  name={doctor.name}
                  href={doctor.href}
                  isExtra={doctor.isExtra}
                  address={doctor.location.address.fullAddress}
                  provider={doctor.provider}
                  variant="popup"
                />
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '1em',
                    justifyContent: 'space-between',
                  }}
                >
                  <DrAvailabilityInfo
                    accepts={doctor.accepts}
                    availability={doctor.availability}
                    override={doctor.override}
                    load={doctor.load}
                    drId={doctor.fakeId}
                    variant="popup"
                  />
                  <DrActions
                    drId={doctor.fakeId}
                    phone={doctor.phone}
                    variant="popup"
                  />
                </div>
              </div>
            </ReactLeafletPopup>
          </DrMarker>
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
