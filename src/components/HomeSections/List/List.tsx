import { useDebounce } from 'usehooks-ts';

import useDoctors from '@/lib/hooks/useDoctors';
import useBoundStore from '@/lib/store/useBoundStore';
import { createDoctorFilter } from '@/lib/utils/search';

const List = () => {
  const { data, status } = useDoctors();
  const accepts = useBoundStore(state => state.accepts);
  const bounds = useBoundStore(state => state.bounds);
  const search = useBoundStore(state => state.search);
  const debouncedSearch = useDebounce(search, 500);

  if (status === 'loading') {
    return <div>loading...</div>;
  }

  if (status === 'error') {
    return <div>error</div>;
  }

  const doctorFilter =
    bounds && createDoctorFilter({ accepts, bounds, search: debouncedSearch });
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
