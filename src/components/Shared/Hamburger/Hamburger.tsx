import { clsx } from 'clsx';
import { useRef } from 'react';

import styles from './Hamburger.module.css';
import { IconButton } from '../IconButton';

type HamburgerProps = {
  onToggle: () => void;
  showNavigation: boolean;
};

const Hamburger = ({ onToggle, showNavigation }: HamburgerProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const hasButtonBeenClickedYet = buttonRef.current?.getAttribute(
    'data-not-clicked-yet'
  );
  const canApplyMenuClosedAnimation = hasButtonBeenClickedYet === 'false';

  if (!canApplyMenuClosedAnimation && showNavigation) {
    buttonRef.current?.setAttribute('data-not-clicked-yet', 'false');
  }

  const hamburgerStyles = clsx(
    styles.Hamburger,
    showNavigation
      ? styles.menuOpen
      : canApplyMenuClosedAnimation && styles.menuClosed
  );

  return (
    <IconButton
      ref={buttonRef}
      type="button"
      className={hamburgerStyles}
      onClick={onToggle}
      aria-controls="navigation"
      aria-expanded={showNavigation}
      aria-label={showNavigation ? 'Close menu' : 'Open menu'}
      data-not-clicked-yet="true"
    >
      <span className={styles.lines}>
        <span className={styles.line} />
        <span className={styles.line} />
        <span className={styles.line} />
      </span>
    </IconButton>
  );
};

export default Hamburger;
