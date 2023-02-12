import { clsx } from 'clsx';
import React from 'react';

import styles from './NavigationContainer.module.css';

type Props = { showNavigation: boolean; children: React.ReactNode };

const NavigationContainer = ({ showNavigation, children }: Props) => {
  const navigationContainerStyles = clsx(
    styles.NavigationContainer,
    showNavigation && styles.menuOpen
  );

  return <div className={navigationContainerStyles}>{children}</div>;
};

export default NavigationContainer;
