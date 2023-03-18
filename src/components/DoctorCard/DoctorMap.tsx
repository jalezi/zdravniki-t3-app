import { Marker } from 'react-leaflet';

import Map from '@/components/Shared/Map/Map';
import { MAX_ZOOM } from '@/lib/constants/map';
import type { LatLngExpression } from '@/lib/types/Map';

type DoctorMapProps = {
  position: LatLngExpression;
};

const DoctorMap = ({ position }: DoctorMapProps) => {
  return (
    <Map center={position} zoom={MAX_ZOOM}>
      <Marker position={position} />
    </Map>
  );
};

export default DoctorMap;
