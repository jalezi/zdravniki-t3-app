import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

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
    if (!parsedHash.success && asPath) {
      const newHash = stringifyHash([accepts, [zoom, lat, lng], search]);
      setNewPath(`${asPath.replace(documentLocHash, '')}${newHash}`);
    }
  }, [accepts, asPath, lat, lng, search, zoom]);

  useEffect(() => {
    const documentLocHash = document.location.hash;

    const newHash = stringifyHash([accepts, [zoom, lat, lng], search]);
    if (documentLocHash !== newHash && asPath) {
      setNewPath(`${asPath.replace(documentLocHash, '')}${newHash}`);
    }
  }, [accepts, search, lat, lng, zoom, setNewPath, asPath]);

  useEffect(() => {
    if (newPath) {
      void router.replace(newPath, undefined, { shallow: true });
      setNewPath(null);
    }
  }, [newPath, router]);
};

export default useHash;
