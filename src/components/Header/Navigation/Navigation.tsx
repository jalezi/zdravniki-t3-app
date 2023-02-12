import { clsx } from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { IconButton } from '@/components/Shared/IconButton';
import { FbSvg, TwSvg } from '@/components/Shared/Icons';

import styles from './Navigation.module.css';

const Navigation = () => {
  const { locale } = useRouter();

  const navStyles = clsx(styles.Navigation);
  const titleStyles = clsx(styles.title);
  const navLinksFirstStyles = clsx(styles.navLinks, styles.first);
  const navLinksLastStyles = clsx(styles.navLinks, styles.last);

  return (
    <nav className={navStyles}>
      <h2 className={titleStyles}>Meni</h2>
      <ul className={navLinksFirstStyles}>
        <li>
          <Link href="/" locale={locale}>
            Home
          </Link>
        </li>
        <li>
          <Link href="/faq" locale={locale}>
            FAQ
          </Link>
        </li>
        <li>
          <Link href="/about" locale={locale}>
            About
          </Link>
        </li>
        <li>
          <a
            href="/covid-19.sledilnik.org/sl/donate"
            target="_blank"
            rel="noreferrer noopener"
          >
            Support
          </a>
        </li>
        <li>
          <a
            href="/covid-19.sledilnik.org"
            target="_blank"
            rel="noreferrer noopener"
          >
            Sledilnik.org
          </a>
        </li>
      </ul>
      <ul className={navLinksLastStyles}>
        <li>
          <IconButton
            as="a"
            href="https://facebook.com/SledilnikOrg"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
          >
            <FbSvg />
          </IconButton>
        </li>
        <li>
          <IconButton
            as="a"
            href="https://twitter.com/sledilnik"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
          >
            <TwSvg />
          </IconButton>
        </li>
        <li>Lang Selector</li>
      </ul>
    </nav>
  );
};

export default Navigation;
