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
  const { asPath, locale } = useRouter();
  const [showNavigation, setShowNavigation] = useShowNavigation;

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

  // Close navigation on route || locale change
  // todo - this is a hacky solution, find a better way to do this (pass a asPath as key)
  useEffect(() => {
    setShowNavigation(false);
  }, [asPath, locale, setShowNavigation]);

  return (
    <div ref={ref} key={asPath} className={navigationContainerStyles}>
      {children}
    </div>
  );
};

export default NavigationContainer;
