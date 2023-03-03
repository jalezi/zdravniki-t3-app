import { clsx } from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDebounce } from 'usehooks-ts';

import { Footer } from '@/components/Footer';
import useDoctors from '@/lib/hooks/useDoctors';
import useBoundStore from '@/lib/store/useBoundStore';
import { createDoctorFilter, normalize } from '@/lib/utils/search';
import type { Doctor } from '@/server/api/routers/doctors';

import styles from './List.module.css';

const getGroupsByAlphabet = (doctors: Doctor[]) => {
  const drByAlphabet = new Map<string, Doctor[]>();

  // create a map by alphabet
  doctors.forEach(doctor => {
    const firstLetter = doctor.name[0]?.toUpperCase() ?? '';
    if (!firstLetter) return;
    if (drByAlphabet.has(firstLetter)) {
      const existing = drByAlphabet.get(firstLetter) as Doctor[];
      drByAlphabet.set(firstLetter, [...existing, doctor]);
    } else {
      drByAlphabet.set(firstLetter, [doctor]);
    }
  });

  return drByAlphabet;
};

const useInfiniteScroll = (doctors: Doctor[], pageNum: number, limit = 20) => {
  const [list, setList] = useState<Doctor[]>([]);
  const hasMore = doctors.length > list.length;

  useEffect(() => {
    setList(doctors.slice(0, pageNum * limit));
  }, [doctors, pageNum, limit]);

  return { list, hasMore };
};

const InfiniteScroll = ({ data }: { data: Doctor[] }) => {
  const [pageNum, setPageNum] = useState(1);
  const observer = useRef<IntersectionObserver | null>(null);
  const { list, hasMore } = useInfiniteScroll(data ?? [], pageNum);
  const router = useRouter();

  const lastBookElementRef = useCallback(
    (node: Element | null) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(entries => {
        if (entries?.[0]?.isIntersecting && hasMore) {
          setPageNum(prev => prev + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [hasMore]
  );

  const drByAlphabet = getGroupsByAlphabet(list ?? []);

  const infiniteList = Array.from(drByAlphabet.entries())
    .sort((a, b) => {
      return a[0].localeCompare(b[0]);
    })
    .map(([letter, doctors]) => (
      <li key={letter}>
        <header className={styles.InfoLetter}>{letter}</header>
        <ul>
          {doctors.map((doctor, index, arr) => (
            <li
              key={doctor.fakeId}
              ref={index === arr.length - 1 ? lastBookElementRef : undefined}
              className={styles.InfoCard}
            >
              <div>
                {doctor.href ? (
                  <Link
                    href={doctor.href}
                    passHref
                    locale={router.locale}
                    hrefLang={router.locale}
                  >
                    {doctor.name}
                  </Link>
                ) : (
                  <span>{doctor.name}</span>
                )}
                <div>{doctor.institution?.location.address?.fullAddress}</div>
              </div>
            </li>
          ))}
        </ul>
      </li>
    ));

  const innerContainerStyles = clsx(styles.ListInnerContainer);

  return <ul className={innerContainerStyles}>{infiniteList}</ul>;
};

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
      {filteredDoctors?.length === 0 ? <div>Refine your search</div> : null}
      <Footer position="list" />
    </>
  );
};

export default List;
