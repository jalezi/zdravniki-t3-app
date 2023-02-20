import { useRouter } from 'next/router';
import { useMapEvents } from 'react-leaflet';

import { getRoundedLatLng } from '@/lib/utils/map';
import { parseHash, stringifyHash } from '@/lib/utils/url-hash';

const BigMapEvents = () => {
  const { asPath, replace, locale } = useRouter();
  const map = useMapEvents({
    moveend: () => {
      const documentLocHash = document.location.hash;
      const { lat, lng } = getRoundedLatLng(map.getCenter());
      const zoom = map.getZoom();
      const parsedHash = parseHash(asPath.split('#')[1] ?? '');
      if (parsedHash.success) {
        const [accepts, _, search] = parsedHash.data;
        const newHash = stringifyHash([accepts, [zoom, lat, lng], search]);
        const newPath = asPath.replace(documentLocHash, newHash);

        return void replace(newPath, newPath, { shallow: true, locale });
      }

      const newHash = stringifyHash(['all', [zoom, lat, lng], '']);
      const newAsPath = asPath.replace(documentLocHash, newHash);
      return void replace(newAsPath, newAsPath, {
        shallow: true,
        locale,
      });
    },
  });

  return null;
};

export default BigMapEvents;
