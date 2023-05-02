import { clsx } from 'clsx';
import type { RefObject } from 'react';
import { memo, useRef, useState } from 'react';
import { useEventListener } from 'usehooks-ts';

import { IconButton } from '@/components/Shared/Buttons';
import { CaretUpSvg } from '@/components/Shared/Icons';

import styles from './ScrollToTop.module.css';

type ScrollToTopProps = {
  show?: boolean;
  elementRef: RefObject<HTMLElement> | undefined;
  className?: string;
  top?: number;
  behavior?: 'auto' | 'smooth';
};

const ScrollToTop = ({
  elementRef,
  className,
  show,
  top = 0,
  behavior = 'smooth',
}: ScrollToTopProps) => {
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const fakeRef = useRef<HTMLElement>(null);

  useEventListener(
    'scroll',
    () => {
      const scrollElement = elementRef?.current ?? document.scrollingElement;

      if (scrollElement && scrollElement?.scrollTop > 200) {
        setShowScrollToTop(true);
        return;
      }
      setShowScrollToTop(false);
    },
    elementRef ?? fakeRef
  );

  if (elementRef === null) return null;

  const _show =
    typeof show === 'boolean' ? show && showScrollToTop : showScrollToTop;

  const scrollToTopStyles = clsx(
    styles.ScrollToTop,
    _show && styles.Show,
    className
  );

  const onClick = () => {
    const scrollElement = elementRef?.current || document.scrollingElement;
    scrollElement?.scrollTo({ top, behavior });
  };

  return (
    <IconButton
      type="button"
      className={scrollToTopStyles}
      onClick={onClick}
      aria-label="Scroll to top"
    >
      <CaretUpSvg />
    </IconButton>
  );
};

export default memo(ScrollToTop);
