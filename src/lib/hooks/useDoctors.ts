import { useRouter } from 'next/router';

import { pageDrTypeSchema } from '@/lib/types/dr-type-page';
import { api } from '@/lib/utils/api';

const useDoctors = () => {
  const { query, isReady } = useRouter();
  const { type } = query;
  const drType = pageDrTypeSchema.parse(type);

  return api.doctors.getByTypePage.useQuery(
    { type: drType },
    { enabled: isReady }
  );
};

export default useDoctors;
