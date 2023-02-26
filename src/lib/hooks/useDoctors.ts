import { useRouter } from 'next/router';

import { drTypePageSchema } from '@/lib/types/dr-type-page';
import { api } from '@/lib/utils/api';

const useDoctors = () => {
  const { query, isReady } = useRouter();
  const { type } = query;
  const drType = drTypePageSchema.parse(type);

  return api.doctors.get.useQuery({ type: drType }, { enabled: isReady });
};

export default useDoctors;
