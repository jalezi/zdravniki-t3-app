import { clsx } from 'clsx';

import styles from './NavigationContainer.module.css';

type NavigationContainerProps = {
  showNavigation: boolean;
  children: React.ReactNode;
};

const NavigationContainer = ({
  showNavigation,
  children,
}: NavigationContainerProps) => {
  const navigationContainerStyles = clsx(
    styles.NavigationContainer,
    showNavigation && styles.MenuOpen
  );

  return <div className={navigationContainerStyles}>{children}</div>;
};

export default NavigationContainer;
