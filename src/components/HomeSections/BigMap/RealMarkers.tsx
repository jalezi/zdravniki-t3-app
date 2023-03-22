import { clsx } from 'clsx';
import { Popup as ReactLeafletPopup } from 'react-leaflet';

import DrMarker from '@/components/Shared/Map/DrMarker';
import type { Doctor } from '@/server/api/routers/doctors';

import styles from './BigMap.module.css';
import { DrActions } from '../DrInfo/DrActions';
import { DrAvailabilityInfo } from '../DrInfo/DrAvailabilityInfo';
import { DrBasicInfo } from '../DrInfo/DrBasicInfo';

type RealMarkersProps = {
  doctors: Doctor[];
};

const RealMarkers = ({ doctors }: RealMarkersProps) => {
  if (!doctors) {
    return null;
  }

  const markers = doctors.map(doctor => {
    const center = doctor.location.geoLocation ??
      doctor.institution?.location.geoLocation ?? { lat: 0, lng: 0 };

    const markerStyles = clsx(
      styles.DrCircle,
      doctor.accepts === 'y' ? styles.Accepts : styles.Rejects
    );

    const actionsPopupStyles = clsx(styles.Popup, styles.Row);

    return (
      <DrMarker
        key={doctor.fakeId}
        center={center}
        className={markerStyles}
        accepts={doctor.accepts}
      >
        <ReactLeafletPopup>
          <div className={styles.Popup}>
            <DrBasicInfo
              drId={doctor.fakeId}
              name={doctor.name}
              href={doctor.href}
              isExtra={doctor.isExtra}
              address={doctor.location.address.fullAddress}
              provider={doctor.provider}
              variant="popup"
            />
            <div className={actionsPopupStyles}>
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
  });
  return <>{markers}</>;
};

export default RealMarkers;
