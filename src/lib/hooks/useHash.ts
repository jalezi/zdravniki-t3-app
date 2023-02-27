import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { SL_CENTER, ZOOM } from '@/lib/constants/map';
import { parseHash, stringifyHash } from '@/lib/utils/url-hash';

const useHash = () => {
  const router = useRouter();
  useEffect(() => {
    if (!router.isReady) return;
    const documentLocHash = document.location.hash;

    const parsedHash = parseHash(documentLocHash?.split('#')?.[1] ?? '');

    if (parsedHash.success) return;

    const newHash = stringifyHash(['all', [ZOOM, ...SL_CENTER], '']);
    let newPath = router.asPath;
    if (!documentLocHash) {
      newPath = `${router.asPath}${newHash}`;
      return void router.replace(newPath, newPath, {
        shallow: true,
        locale: router.locale,
      });
    }
    // ? notify user if hash is invalid
    newPath = router.asPath.replace(documentLocHash, newHash);
    return void router.replace(newPath, newPath, {
      shallow: true,
      locale: router.locale,
    });
  }, [router]);
};

export default useHash;
