import { AttributionControl, MapContainer, TileLayer } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';

import { MAP } from '@/lib/constants';

const { ZOOM, SL_CENTER } = MAP;

type MapProps = {
  children?: React.ReactNode;
};

const Map = ({ children }: MapProps) => {
  return (
    <MapContainer
      zoom={ZOOM}
      center={SL_CENTER as [number, number]}
      attributionControl={false}
    >
      <AttributionControl prefix="" />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {children}
    </MapContainer>
  );
};

export default Map;
