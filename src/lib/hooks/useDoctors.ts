import { useRouter } from 'next/router';

import { SL_CENTER, ZOOM } from '@/lib/constants/map';
import { drTypePageSchema } from '@/lib/types/dr-type-page';
import { api } from '@/lib/utils/api';
import type { HashSchema } from '@/lib/utils/url-hash';
import { parseHash } from '@/lib/utils/url-hash';

// pass drType parameter as drPageType.parse(type); it will throw an error if type is not valid
const useDoctors = () => {
  const { query, isReady, asPath } = useRouter();
  const { type } = query;
  const drType = drTypePageSchema.parse(type);

  const drOptionsAsZod = parseHash(asPath);

  const shouldFetch = drOptionsAsZod.success && isReady;

  const [accepts, _, search] = drOptionsAsZod.success
    ? drOptionsAsZod.data
    : (['all', [ZOOM, ...SL_CENTER], ''] satisfies HashSchema);

  return api.doctors.get.useQuery(
    { type: drType, accepts, search },
    { enabled: shouldFetch }
  );
};

export default useDoctors;
