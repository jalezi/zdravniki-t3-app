import useDoctors from '@/lib/hooks/useDoctors';
import type { LeafletMap } from '@/lib/types/Map';
import { createDoctorFilter } from '@/lib/utils/search';

type ListProps = {
  map: LeafletMap | null;
};

const List = ({ map }: ListProps) => {
  const { data, status } = useDoctors();

  if (status === 'loading') {
    return <div>loading...</div>;
  }

  if (status === 'error') {
    return <div>error</div>;
  }

  const bounds = map?.getBounds();
  const doctorFilter =
    bounds && createDoctorFilter({ accepts: 'all', bounds, search: '' });
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
