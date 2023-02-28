import { useMapEvents } from 'react-leaflet';

import useBoundStore from '@/lib/store/useBoundStore';
import { getRoundedLatLng } from '@/lib/utils/map';

const BigMapEvents = () => {
  const setBounds = useBoundStore(state => state.setBounds);
  const setZoom = useBoundStore(state => state.setZoom);
  const setCenter = useBoundStore(state => state.setCenter);
  const map = useMapEvents({
    moveend: () => {
      const { lat, lng } = getRoundedLatLng(map.getCenter());
      setBounds(map.getBounds());
      setZoom(map.getZoom());
      setCenter([lat, lng]);
    },
  });

  return null;
};

export default BigMapEvents;
