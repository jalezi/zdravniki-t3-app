import { clsx } from 'clsx';
import type { Ref } from 'react';
import { forwardRef } from 'react';

import { PageLinks, SocialLinks } from './Links';
import styles from './Navigation.module.css';
import containerStyles from './NavigationContainer.module.css';
import { LanguageSelector } from '../LanguageSelector';

const Navigation = (_: unknown, ref: Ref<HTMLDivElement>) => {
  const navStyles = clsx(styles.Navigation, containerStyles.Opacity);
  const titleStyles = clsx(styles.title);
  const navLinksFirstStyles = clsx(styles.navLinks, styles.first);
  const navLinksLastStyles = clsx(styles.navLinks, styles.last);

  return (
    <nav ref={ref} className={navStyles}>
      <h2 className={titleStyles}>Meni</h2>
      <ul className={navLinksFirstStyles}>
        <PageLinks />
      </ul>
      <ul className={navLinksLastStyles}>
        <SocialLinks />
        <li>
          <LanguageSelector />
        </li>
      </ul>
    </nav>
  );
};

export default forwardRef(Navigation);
