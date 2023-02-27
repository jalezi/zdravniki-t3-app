import { useMapEvents } from 'react-leaflet';

import useBoundStore from '@/lib/store/useBoundStore';

const BigMapEvents = () => {
  const setBounds = useBoundStore(state => state.setBounds);
  const map = useMapEvents({
    moveend: () => {
      setBounds(map.getBounds());
    },
  });

  return null;
};

export default BigMapEvents;
