import { clsx } from 'clsx';
import { forwardRef } from 'react';

import { Hamburger } from '@/components/Shared/Hamburger';
import { IconButton } from '@/components/Shared/IconButton';

import styles from './Toggler.module.css';

type TogglerProps = {
  onToggle: () => void;
  showNavigation: boolean;
};

const Toggler = (
  { onToggle, showNavigation }: TogglerProps,
  ref: React.Ref<HTMLButtonElement>
) => {
  const togglerStyles = clsx(styles.Toggler);

  return (
    <IconButton
      ref={ref}
      type="button"
      className={togglerStyles}
      onClick={onToggle}
      aria-controls="navigation"
      aria-expanded={showNavigation}
      aria-label={showNavigation ? 'Close menu' : 'Open menu'}
    >
      <Hamburger open={showNavigation} />
    </IconButton>
  );
};

export default forwardRef(Toggler);
