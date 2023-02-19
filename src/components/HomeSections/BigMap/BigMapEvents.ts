import { useRouter } from 'next/router';
import { useMapEvents } from 'react-leaflet';

const BigMapEvents = () => {
  const { asPath, push, locale } = useRouter();
  const map = useMapEvents({
    moveend: () => {
      const { lat, lng } = map.getCenter();
      const zoom = map.getZoom();
      const hash = document.location.hash;
      const newHash = `#map=${zoom}/${lat}/${lng}`;
      const newAsPath = asPath.replace(hash, newHash);

      void push(newAsPath, newAsPath, { shallow: true, locale });
    },
  });

  return null;
};

export default BigMapEvents;
