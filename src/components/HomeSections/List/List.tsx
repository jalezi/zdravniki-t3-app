import { clsx } from 'clsx';
import { useTranslation } from 'next-i18next';
import { useDebounce } from 'usehooks-ts';

import { Footer } from '@/components/Footer';
import useDoctors from '@/lib/hooks/useDoctors';
import useBoundStore from '@/lib/store/useBoundStore';
import { createDoctorFilter, normalize } from '@/lib/utils/search';

import InfiniteScroll from './InfiniteScroll';
import styles from './List.module.css';
import { NoResult } from './NoResults';

const List = () => {
  const { data, status } = useDoctors();
  const accepts = useBoundStore(state => state.accepts);
  const bounds = useBoundStore(state => state.bounds);
  const search = useBoundStore(state => state.search);
  const debouncedSearch = useDebounce(search, 500);
  const { t } = useTranslation('map');

  const doctorFilter = bounds
    ? createDoctorFilter({ accepts, bounds, search: debouncedSearch })
    : () => true;
  const filteredDoctors = doctorFilter
    ? data?.doctors
        .filter(doctorFilter)
        .sort((a, b) => normalize(a.name).localeCompare(normalize(b.name)))
    : [];

  if (status === 'loading') {
    return <div>loading...</div>;
  }

  if (status === 'error') {
    return <div>error</div>;
  }

  const headerStyles = clsx(styles.ListHeader);

  const totalHits = t('totalHits', { count: filteredDoctors?.length ?? 0 });

  return (
    <>
      <header className={headerStyles}>{totalHits}</header>
      <InfiniteScroll data={filteredDoctors ?? []} />
      {filteredDoctors?.length === 0 ? <NoResult /> : null}

      <Footer position="list" />
    </>
  );
};

export default List;
