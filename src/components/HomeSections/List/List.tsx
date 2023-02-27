import { useRouter } from 'next/router';

import useDoctors from '@/lib/hooks/useDoctors';
import type { LeafletMap } from '@/lib/types/Map';
import { boundsIntersect, getDoctorLatLng } from '@/lib/utils/map';
import { fullMatch, partialMatch } from '@/lib/utils/search';
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

  const filteredDoctors = data?.doctors.filter(doctor => {
    const acceptsCondition =
      accepts === 'all' ? true : doctor.accepts === accepts;
    const searchCondition =
      fullMatch(doctor.name, search) || partialMatch([doctor.provider], search);

    const bounds = map?.getBounds();
    const doctorLatLng = getDoctorLatLng(doctor);

    if (bounds) {
      return (
        boundsIntersect(bounds, doctorLatLng) &&
        acceptsCondition &&
        searchCondition
      );
    }

    return acceptsCondition && searchCondition;
  });

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
