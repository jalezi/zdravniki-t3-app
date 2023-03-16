import clsx from 'clsx';
import { useCallback, useRef, useState } from 'react';

import { Footer } from '@/components/Footer';
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

const InfiniteScroll = ({ data }: { data: Doctor[] }) => {
  const [pageNum, setPageNum] = useState(1);
  const observer = useRef<IntersectionObserver | null>(null);
  const list = data.slice(0, pageNum * ITEMS_PER_PAGE);
  const hasMore = data.length > list.length;

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
        <h2 className={styles.InfoLetter} translate="no">
          {letter}
        </h2>
        {doctors.map((doctor, index, arr) => {
          return (
            <DrCard
              key={doctor.fakeId}
              ref={index === arr.length - 1 ? lastBookElementRef : undefined}
              accepts={doctor.accepts}
              availability={doctor.availability}
              drId={doctor.fakeId}
              fullAddress={doctor.location.address.fullAddress}
              href={doctor.href}
              isExtra={doctor.isExtra}
              load={doctor.load}
              name={doctor.name}
              override={doctor.override}
              phone={doctor.phone}
              provider={doctor.provider}
              role="listitem"
            />
          );
        })}
      </div>
    ));

  const innerContainerStyles = clsx(styles.ListInnerContainer);

  return (
    <>
      <div role="list" className={innerContainerStyles}>
        {infiniteList}
        <Footer position="list" />
      </div>
    </>
  );
};

export default InfiniteScroll;
