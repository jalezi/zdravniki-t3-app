import { useRouter } from 'next/router';

import useDoctors from '@/lib/hooks/useDoctors';
import type { LeafletMap } from '@/lib/types/Map';
import { boundsIntersect } from '@/lib/utils/map';
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
      search === ''
        ? true
        : doctor.doctor.toLowerCase().includes(search.toLowerCase()); // this is a bad search, but it's just an example; todo include institution name, address, etc.

    const bounds = map?.getBounds();
    const doctorLatLng =
      doctor.location?.geoLocation ?? doctor.institution?.location.geoLocation;

    if (bounds && doctorLatLng) {
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
            <div>{doctor.doctor}</div>
            <div>{doctor.institution?.location.address?.city}</div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default List;
