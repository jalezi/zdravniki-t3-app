import { clsx } from 'clsx';
import { useCallback, useEffect, useRef, useState } from 'react';

import * as Navigation from '@/components/Header/Navigation';
import { IBMPlexSans } from '@/fonts';

import styles from './Header.module.css';
import { Logo } from './Logo';
import * as Toggler from './Toggler';
import { Overlay } from '../Shared/Overlay';

// should match breakpoints in src/styles/variables.css
const BREAKPOINTS = {
  xxs: 0,
  xs: 375,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1400,
} as const;

function Header() {
  const headerRef = useRef<HTMLDivElement>(null);
  const [navigationState, setNavigationState] = useState<boolean>(false);
  const headerStyles = clsx(
    styles.Header,
    IBMPlexSans.className,
    navigationState && styles.menuOpen
  );

  // Close navigation on resize
  useEffect(() => {
    if (window) {
      const handleResize = () => {
        if (window.innerWidth >= BREAKPOINTS.md) {
          setNavigationState(false);
        }
      };

      window.addEventListener('resize', handleResize);

      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  // Close navigation on escape
  useEffect(() => {
    if (headerRef.current) {
      const header = headerRef.current;

      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          setNavigationState(false);
        }
      };

      header.addEventListener('keydown', handleKeyDown);

      return () => header.removeEventListener('keydown', handleKeyDown);
    }
  }, []);

  const onShowOrHideNavigation = useCallback(
    () => setNavigationState(prev => !prev),
    []
  );

  return (
    <header ref={headerRef} className={headerStyles}>
      <Logo />
      <Toggler.Container>
        <Toggler.Button
          onToggle={onShowOrHideNavigation}
          showNavigation={navigationState}
        />
      </Toggler.Container>
      <Navigation.Container showNavigation={navigationState}>
        <Navigation.Navigation />
      </Navigation.Container>

      <Overlay show={navigationState} />
    </header>
  );
}

export default Header;
