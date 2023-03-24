import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { SL_CENTER, ZOOM } from '@/lib/constants/map';
import useBoundStore from '@/lib/store/useBoundStore';
import { parseHash, stringifyHash } from '@/lib/utils/url-hash';

const useHash = () => {
  const [newPath, setNewPath] = useState<string | null>(null);
  const router = useRouter();
  const search = useBoundStore(state => state.search);
  const accepts = useBoundStore(state => state.accepts);
  const zoom = useBoundStore(state => state.zoom);
  const center = useBoundStore(state => state.center);

  const asPath = router.isReady ? router.asPath : null;

  const [lat, lng] = center;

  useEffect(() => {
    const documentLocHash = document.location.hash;
    const parsedHash = parseHash(documentLocHash?.split('#')?.[1] ?? '');
    if (parsedHash.success) {
      const [accepts, [zoom, lat, lng], search] = parsedHash.data;
      useBoundStore.setState({
        accepts,
        zoom,
        center: [lat, lng],
        search: decodeURI(search),
      });
    }
  }, []);

  useEffect(() => {
    const documentLocHash = document.location.hash;
    const parsedHash = parseHash(documentLocHash?.split('#')?.[1] ?? '');
    if (!parsedHash.success && asPath) {
      const newHash = stringifyHash(['all', [ZOOM, ...SL_CENTER], '']);
      setNewPath(`${asPath.replace(documentLocHash, '')}${newHash}`);
    }
  }, [accepts, asPath, search]);

  useEffect(() => {
    const documentLocHash = document.location.hash;

    const newHash = stringifyHash([accepts, [zoom, lat, lng], search]);
    if (documentLocHash !== newHash && asPath) {
      setNewPath(`${asPath.replace(documentLocHash, '')}${newHash}`);
    }
  }, [accepts, search, lat, lng, zoom, setNewPath, asPath]);

  if (newPath) {
    const newHash = stringifyHash([accepts, [zoom, lat, lng], search]);
    document.location.hash = newHash;
  }
};

export default useHash;
