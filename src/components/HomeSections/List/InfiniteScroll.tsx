import clsx from 'clsx';
import { useCallback, useRef, useState } from 'react';

import type { Doctor } from '@/server/api/routers/doctors';

import styles from './List.module.css';
import { DrActions } from '../DrInfo/DrActions';
import { DrAvailabilityInfo } from '../DrInfo/DrAvailabilityInfo';
import { DrBasicInfo } from '../DrInfo/DrBasicInfo';

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
          const infoCardStyles = clsx(
            styles.InfoCard,
            doctor.accepts === 'y' && styles.Accepts,
            doctor.accepts === 'n' && styles.Rejects
          );

          return (
            <div
              role="listitem"
              key={doctor.fakeId}
              ref={index === arr.length - 1 ? lastBookElementRef : undefined}
              className={infoCardStyles}
            >
              <DrBasicInfo
                address={doctor.location.address.fullAddress}
                drId={doctor.fakeId}
                href={doctor.href}
                isExtra={doctor.isExtra}
                name={doctor.name}
                provider={doctor.provider}
                className={styles.BasicInfo}
              />
              <DrAvailabilityInfo
                availability={doctor.availability}
                accepts={doctor.accepts}
                drId={doctor.fakeId}
                load={doctor.load}
                override={doctor.override}
                className={styles.Availability}
              />
              <DrActions
                drId={doctor.fakeId}
                phone={doctor.phone}
                className={styles.Actions}
              />
            </div>
          );
        })}
      </div>
    ));

  const innerContainerStyles = clsx(styles.ListInnerContainer);

  return (
    <>
      <div role="list" className={innerContainerStyles}>
        {infiniteList}
      </div>
    </>
  );
};

export default InfiniteScroll;
