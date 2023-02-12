import { clsx } from 'clsx';
import { useState } from 'react';

import * as Navigation from '@/components/Header/Navigation';
import * as Hamburger from '@/components/Shared/Hamburger';
import { IBMPlexSans } from '@/fonts';

import styles from './Header.module.css';
import { Logo } from './Logo';
import { Overlay } from '../Shared/Overlay';

function Header() {
  const [showNavigation, setShowNavigation] = useState<boolean>(false);
  const headerStyles = clsx(
    styles.Header,
    IBMPlexSans.className,
    showNavigation && styles.menuOpen
  );

  const onShowOrHideNavigation = () => setShowNavigation(prev => !prev);

  return (
    <header className={headerStyles}>
      <Logo />
      <Hamburger.Container>
        <Hamburger.Button
          onToggle={onShowOrHideNavigation}
          showNavigation={showNavigation}
        />
      </Hamburger.Container>
      <Navigation.Container showNavigation={showNavigation}>
        <Navigation.Navigation />
      </Navigation.Container>

      <Overlay show={showNavigation} />
    </header>
  );
}

export default Header;
