import clsx from 'clsx';
import { useCallback, useRef, useState } from 'react';

import { Footer } from '@/components/Footer';
import { ScrollToTop } from '@/components/Shared/ScrollToTop';
import type { Doctor } from '@/server/api/routers/doctors';

import styles from './List.module.css';
import { DrCard } from '../DrInfo/DrCard';

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

const ITEMS_PER_PAGE = 10;

type InfiniteScrollProps = {
  data: Doctor[];
  isVisible: boolean;
};

const InfiniteScroll = ({ data, isVisible }: InfiniteScrollProps) => {
  const [pageNum, setPageNum] = useState(1);
  const observer = useRef<IntersectionObserver | null>(null);
  const list = data.slice(0, pageNum * ITEMS_PER_PAGE);
  const hasMore = data.length > list.length;
  const ref = useRef<HTMLDivElement>(null);

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
      <div role="presentation" key={letter}>
        <div role="presentation" className={styles.InfoLetter} translate="no">
          {letter}
        </div>
        {doctors.map((doctor, index, arr) => {
          return (
            <DrCard
              key={doctor.fakeId}
              ref={index === arr.length - 1 ? lastBookElementRef : undefined}
              accepts={doctor.accepts}
              availability={doctor.availability}
              clinic={doctor.clinic}
              drHref={doctor.href}
              drId={doctor.fakeId}
              email={doctor.email}
              fullAddress={doctor.location.address.fullAddress}
              geoLocation={doctor.location.geoLocation}
              href={doctor.href}
              load={doctor.load}
              name={doctor.name}
              override={doctor.override}
              phones={doctor.phones}
              provider={doctor.provider}
              websites={doctor.websites}
              role="listitem"
            />
          );
        })}
      </div>
    ));

  const innerContainerStyles = clsx(styles.ListInnerContainer);

  return (
    <>
      <div ref={ref} className={innerContainerStyles}>
        <div role="list">{infiniteList}</div>
        <ScrollToTop
          elementRef={ref}
          show={isVisible}
          className={styles.ScrollToTop}
        />
        <Footer position="list" />
      </div>
    </>
  );
};

export default InfiniteScroll;
