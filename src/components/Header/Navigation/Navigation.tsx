import { clsx } from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { Button, IconButton } from '@/components/Shared/Buttons';
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
          <Button as={Link} href="/" locale={locale} data-keep-focus="true">
            Home
          </Button>
        </li>
        <li>
          <Button as={Link} href="/faq" locale={locale} data-keep-focus="true">
            FAQ
          </Button>
        </li>
        <li>
          <Button
            as={Link}
            href="/about"
            locale={locale}
            data-keep-focus="true"
          >
            About
          </Button>
        </li>
        <li>
          <Button
            as="a"
            href="/covid-19.sledilnik.org/sl/donate"
            target="_blank"
            rel="noreferrer noopener"
            data-keep-focus="true"
          >
            Support
          </Button>
        </li>
        <li>
          <Button
            as="a"
            href="/covid-19.sledilnik.org"
            target="_blank"
            rel="noreferrer noopener"
            data-keep-focus="true"
          >
            Sledilnik.org
          </Button>
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
            data-keep-focus="true"
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
            data-keep-focus="true"
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
