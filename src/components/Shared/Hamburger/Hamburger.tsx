import { clsx } from 'clsx';
import { memo, useEffect, useRef } from 'react';

import styles from './Hamburger.module.css';

type HamburgerProps = {
  open: boolean;
};

const Hamburger = ({ open }: HamburgerProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const hamburgerStyles = clsx(
    styles.Hamburger,
    open ? styles.Bars : styles.Cross
  );

  useEffect(() => {
    const linesSpan = ref.current;

    if (linesSpan && open) {
      linesSpan.setAttribute('data-state', 'transition');
    }
  }, [open]);

  const hamburgerLineStyles = clsx(styles.HamburgerLine);

  return (
    <span ref={ref} className={hamburgerStyles}>
      <span className={hamburgerLineStyles} />
      <span className={hamburgerLineStyles} />
      <span className={hamburgerLineStyles} />
    </span>
  );
};

export default memo(Hamburger);
