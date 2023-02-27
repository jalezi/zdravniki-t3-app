import { useRouter } from 'next/router';

import useDoctors from '@/lib/hooks/useDoctors';
import type { LeafletMap } from '@/lib/types/Map';
import { createDoctorFilter } from '@/lib/utils/search';
import { parseHash } from '@/lib/utils/url-hash';

type ListProps = {
  map: LeafletMap | null;
};

const List = ({ map }: ListProps) => {
  const { data, status } = useDoctors();
  const { asPath } = useRouter();

  if (status === 'loading') {
    return <div>loading...</div>;
  }

  if (status === 'error') {
    return <div>error</div>;
  }

  const parsedHash = parseHash(asPath);
  if (!parsedHash.success) {
    return <div>error</div>;
  }

  const [accepts, _, search] = parsedHash.data;

  const bounds = map?.getBounds();
  const doctorFilter =
    bounds && createDoctorFilter({ accepts, bounds, search });
  const filteredDoctors = doctorFilter
    ? data?.doctors.filter(doctorFilter)
    : [];

  return (
    <ul>
      {filteredDoctors.map(doctor => (
        <li key={doctor.fakeId}>
          <div>
            <div>{doctor.name}</div>
            <div>{doctor.institution?.location.address?.city}</div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default List;
