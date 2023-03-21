import { clsx } from 'clsx';
import { useTranslation } from 'next-i18next';
import Skeleton from 'react-loading-skeleton';
import { useDebounce } from 'usehooks-ts';

import { Fallback } from '@/components/Shared/Errors';
import useDoctors from '@/lib/hooks/useDoctors';
import useBoundStore from '@/lib/store/useBoundStore';
import { createDoctorFilter, normalize } from '@/lib/utils/search';

import InfiniteScroll from './InfiniteScroll';
import styles from './List.module.css';
import { NoResult } from './NoResults';

const List = ({ isVisible }: { isVisible: boolean }) => {
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
    const skeletonStyles = clsx(styles.Skeleton, styles.Child);
    const skeletons = Array.from({ length: 7 }, (_, i) => (
      <div key={i} className={skeletonStyles}>
        <Skeleton count={1} />
        <Skeleton count={3} />
      </div>
    ));
    return <div className={styles.Skeleton}>{skeletons}</div>;
  }

  if (status === 'error') {
    return <Fallback />;
  }

  const headerStyles = clsx(styles.ListHeader);

  const totalHits = t('totalHits', { count: filteredDoctors?.length ?? 0 });

  return (
    <>
      <header className={headerStyles}>{totalHits}</header>
      {filteredDoctors?.length === 0 ? <NoResult /> : null}
      <InfiniteScroll data={filteredDoctors ?? []} isVisible={isVisible} />
    </>
  );
};

export default List;
