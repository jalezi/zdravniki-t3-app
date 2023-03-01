import { clsx } from 'clsx';
import { useTranslation } from 'next-i18next';
import { useDebounce } from 'usehooks-ts';

import { Footer } from '@/components/Footer';
import useDoctors from '@/lib/hooks/useDoctors';
import useBoundStore from '@/lib/store/useBoundStore';
import { createDoctorFilter, normalize } from '@/lib/utils/search';
import type { Doctor } from '@/server/api/routers/doctors';

import styles from './List.module.css';

const List = () => {
  const { data, status } = useDoctors();
  const accepts = useBoundStore(state => state.accepts);
  const bounds = useBoundStore(state => state.bounds);
  const search = useBoundStore(state => state.search);
  const debouncedSearch = useDebounce(search, 500);

  const { t } = useTranslation('map');

  if (status === 'loading') {
    return <div>loading...</div>;
  }

  if (status === 'error') {
    return <div>error</div>;
  }

  const doctorFilter = bounds
    ? createDoctorFilter({ accepts, bounds, search: debouncedSearch })
    : () => true;
  const filteredDoctors = doctorFilter
    ? data?.doctors
        .filter(doctorFilter)
        .sort((a, b) => normalize(a.name).localeCompare(normalize(b.name)))
    : [];

  const drByAlphabet = new Map<string, Doctor[]>();

  // create a map by alphabet
  filteredDoctors?.forEach(doctor => {
    const firstLetter = doctor.name[0]?.toUpperCase() ?? '';
    if (!firstLetter) return;
    if (drByAlphabet.has(firstLetter)) {
      const existing = drByAlphabet.get(firstLetter) as Doctor[];
      drByAlphabet.set(firstLetter, [...existing, doctor]);
    } else {
      drByAlphabet.set(firstLetter, [doctor]);
    }
  });

  const list = Array.from(drByAlphabet.entries())
    .sort((a, b) => {
      return a[0].localeCompare(b[0]);
    })
    .map(([letter, doctors]) => (
      <li key={letter}>
        <div>{letter}</div>
        <ul>
          {doctors.map(doctor => (
            <li key={doctor.fakeId}>
              <div>
                <div>{doctor.name}</div>
                <div>{doctor.institution?.location.address?.city}</div>
              </div>
            </li>
          ))}
        </ul>
      </li>
    ));

  const headerStyles = clsx(styles.ListHeader);
  const innerContainerStyles = clsx(styles.ListInnerContainer);
  const listStyles = clsx(styles.ListList);

  const totalHits = t('totalHits', { count: filteredDoctors?.length ?? 0 });

  return (
    <>
      <header className={headerStyles}>{totalHits}</header>
      <div className={innerContainerStyles}>
        <ul className={listStyles}>{list}</ul>
        <Footer position="list" />
      </div>
    </>
  );
};

export default List;
