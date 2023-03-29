import clsx from 'clsx';
import { useCallback, useRef, useState } from 'react';
import { useEventListener } from 'usehooks-ts';

import { Footer } from '@/components/Footer';
import { IconButton } from '@/components/Shared/Buttons';
import { CaretUpSvg } from '@/components/Shared/Icons';
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
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEventListener(
    'scroll',
    () => {
      if (ref.current && ref.current.scrollTop > 200) {
        setShowScrollToTop(true);
        return;
      }
      setShowScrollToTop(false);
    },
    ref
  );

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
        <h2 role="presentation" className={styles.InfoLetter} translate="no">
          {letter}
        </h2>
        {doctors.map((doctor, index, arr) => {
          return (
            <DrCard
              key={doctor.fakeId}
              ref={index === arr.length - 1 ? lastBookElementRef : undefined}
              accepts={doctor.accepts}
              availability={doctor.availability}
              drHref={doctor.href}
              drId={doctor.fakeId}
              fullAddress={doctor.location.address.fullAddress}
              geoLocation={doctor.location.geoLocation}
              href={doctor.href}
              isExtra={doctor.isExtra}
              isFloating={doctor.isFloating}
              load={doctor.load}
              name={doctor.name}
              override={doctor.override}
              phones={doctor.phones}
              provider={doctor.provider}
              role="listitem"
            />
          );
        })}
      </div>
    ));

  const innerContainerStyles = clsx(styles.ListInnerContainer);

  const scrollToTopStyles = clsx(
    styles.ScrollToTop,
    isVisible && showScrollToTop && styles.Show
  );

  return (
    <>
      <div ref={ref} className={innerContainerStyles}>
        <div role="list">{infiniteList}</div>
        <IconButton
          type="button"
          className={scrollToTopStyles}
          onClick={() => ref.current?.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Scroll to top"
        >
          <CaretUpSvg />
        </IconButton>
        <Footer position="list" />
      </div>
    </>
  );
};

export default InfiniteScroll;
