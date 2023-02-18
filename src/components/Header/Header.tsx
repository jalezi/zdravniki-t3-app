import { clsx } from 'clsx';
import { useCallback, useMemo, useRef, useState } from 'react';
import { useEventListener, useWindowSize } from 'usehooks-ts';

import { IBMPlexSans } from '@/assets/fonts';
import * as Navigation from '@/components/Header/Navigation';
import { BREAKPOINTS } from '@/lib/constants';
import useKeyboardNavigation from '@/lib/hooks/useKeyboardNavigation';
import useScroll from '@/lib/hooks/useScroll';

import styles from './Header.module.css';
import { Logo } from './Logo';
import * as Toggler from './Toggler';
import { Overlay } from '../Shared/Overlay';

function Header() {
  const navRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [showNavigation, setShowNavigation] = useState<boolean>(false);
  const { width } = useWindowSize();
  const isMediumMediaQuery = width >= BREAKPOINTS.md;

  const { isScrolled } = useScroll(100, 500);

  const handleOverlayClick = useCallback(() => {
    setShowNavigation(false);
  }, []);
  useEventListener('click', handleOverlayClick, overlayRef);
  useKeyboardNavigation(showNavigation, handleOverlayClick, navRef);

  const onShowOrHideNavigation = useCallback(() => {
    setShowNavigation(prev => !prev);
  }, []);

  // container handles body overflow and closing navigation on route change, including locale
  const nav = useMemo(
    () => (
      <Navigation.Container
        useShowNavigation={[showNavigation, setShowNavigation]}
      >
        <Navigation.Navigation ref={navRef} />
      </Navigation.Container>
    ),
    [showNavigation]
  );

  const headerStyles = clsx(
    styles.Header,
    IBMPlexSans.className,
    isScrolled && styles.Shrunk
  );

  if (isMediumMediaQuery) {
    showNavigation && setShowNavigation(false);

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
