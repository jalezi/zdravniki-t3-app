import type { Dispatch, SetStateAction } from 'react';
import type { MapContainerProps } from 'react-leaflet';
import { AttributionControl, MapContainer, TileLayer } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';

import { MAX_ZOOM, MIN_ZOOM, SL_CENTER, ZOOM } from '@/lib/constants/map';
import type { LeafletMap } from '@/lib/types/Map';

export type MapProps = MapContainerProps & {
  setMap?: Dispatch<SetStateAction<LeafletMap | null>>;
};

const Map = ({
  center = SL_CENTER as [number, number],
  children,
  maxZoom = MAX_ZOOM,
  minZoom = MIN_ZOOM,
  zoom = ZOOM,
  setMap = () => null,
  ...props
}: MapProps) => {
  const { attributionControl } = props;
  return (
    <MapContainer
      ref={setMap}
      attributionControl={attributionControl}
      center={center}
      maxZoom={maxZoom}
      minZoom={minZoom}
      zoom={zoom}
      {...props}
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
