import { clsx } from 'clsx';
import { forwardRef } from 'react';

import { IconButton } from '@/components/Shared/Buttons/IconButton';
import { Hamburger } from '@/components/Shared/Hamburger';

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
      id="menu-toggler"
      type="button"
      className={togglerStyles}
      onClick={onToggle}
      aria-controls="navigation"
      aria-expanded={showNavigation}
      aria-label={showNavigation ? 'Close menu' : 'Open menu'}
      data-keep-focus="true"
    >
      <Hamburger open={showNavigation} />
    </IconButton>
  );
};

export default forwardRef(Toggler);
