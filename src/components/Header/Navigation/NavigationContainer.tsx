import { clsx } from 'clsx';
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';

import { IBMPlexSans } from '@/assets/fonts';

import styles from './NavigationContainer.module.css';

type NavigationContainerProps = {
  useShowNavigation: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  children: React.ReactNode;
};

const NavigationContainer = ({
  useShowNavigation,
  children,
}: NavigationContainerProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { asPath } = useRouter();
  const [showNavigation] = useShowNavigation;

  const navigationContainerStyles = clsx(
    styles.NavigationContainer,
    IBMPlexSans.className,
    showNavigation && styles.MenuOpen
  );

  // Prevent scrolling when navigation is open
  useEffect(() => {
    if (showNavigation) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [showNavigation]);

  return (
    <div ref={ref} key={asPath} className={navigationContainerStyles}>
      {children}
    </div>
  );
};

export default NavigationContainer;
