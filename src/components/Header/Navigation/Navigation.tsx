import { clsx } from 'clsx';

import { PageLinks, SocialLinks } from './Links';
import styles from './Navigation.module.css';

const Navigation = () => {
  const navStyles = clsx(styles.Navigation);
  const titleStyles = clsx(styles.title);
  const navLinksFirstStyles = clsx(styles.navLinks, styles.first);
  const navLinksLastStyles = clsx(styles.navLinks, styles.last);

  return (
    <nav className={navStyles}>
      <h2 className={titleStyles}>Meni</h2>
      <ul className={navLinksFirstStyles}>
        <PageLinks />
      </ul>
      <ul className={navLinksLastStyles}>
        <SocialLinks />
        <li>Lang Selector</li>
      </ul>
    </nav>
  );
};

export default Navigation;
