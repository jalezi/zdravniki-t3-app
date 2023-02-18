import { clsx } from 'clsx';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useEventListener, useWindowSize } from 'usehooks-ts';

import { IBMPlexSans } from '@/assets/fonts';
import * as Navigation from '@/components/Header/Navigation';
import useKeyboardNavigation from '@/hooks/useKeyboardNavigation';

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

const scrollMargin = 100;

function Header() {
  const { asPath, locale } = useRouter();
  const navRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [showNavigation, setShowNavigation] = useState<boolean>(false);
  const { width } = useWindowSize();
  const isMediumMediaQuery = width >= BREAKPOINTS.md;

  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const [isScrolled, setIsScrolled] = useState<boolean | null>(null);

  const handleScroll = (
    e: HTMLElementEventMap['scroll'] & { currentTarget: { scrollY: number } }
  ) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    const { currentTarget } = e;

    if (currentTarget) {
      if (currentTarget.scrollY > scrollMargin) {
        setIsScrolled(true);
        timeoutRef.current = setTimeout(() => setIsScrolled(false), 400);
      }

      if (currentTarget?.scrollY <= scrollMargin) {
        setIsScrolled(false);
      }
    }
  };

  useEventListener('scroll', handleScroll as () => void);

  // Prevent scrolling when navigation is open
  useEffect(() => {
    if (showNavigation && !isMediumMediaQuery) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [showNavigation, isMediumMediaQuery]);

  // Close navigation on route || locale change
  useEffect(() => {
    setShowNavigation(false);
  }, [asPath, locale]);

  const handleOverlayClick = useCallback(() => {
    setShowNavigation(false);
  }, []);

  useEventListener('click', handleOverlayClick, overlayRef);
  useKeyboardNavigation(showNavigation, handleOverlayClick, navRef);

  const onShowOrHideNavigation = useCallback(() => {
    setShowNavigation(prev => !prev);
  }, []);

  const nav = useMemo(
    () => (
      <Navigation.Container showNavigation={showNavigation}>
        <Navigation.Navigation ref={navRef} />
      </Navigation.Container>
    ),
    [showNavigation]
  );

  const headerStyles = clsx(
    styles.Header,
    IBMPlexSans.className,
    showNavigation && styles.MenuOpen,
    isScrolled && styles.Shrunk
  );

  if (isMediumMediaQuery) {
    showNavigation && setShowNavigation(false);

    if (navRef.current) {
      navRef.current.style.visibility = 'visible';
    }

    return (
      <header className={headerStyles}>
        <Logo />
        {nav}
      </header>
    );
  }

  return (
    <>
      <header className={headerStyles}>
        <Logo />
      </header>
      <Toggler.Container>
        <Toggler.Button
          onToggle={onShowOrHideNavigation}
          showNavigation={showNavigation}
        />
      </Toggler.Container>
      {nav}
      <Overlay ref={overlayRef} show={showNavigation} />
    </>
  );
}

export default Header;
