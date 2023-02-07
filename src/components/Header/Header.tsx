import { clsx } from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import logo from '@/assets/svg/zdravniki-sledilnik-logo.svg?url';
import { IBMPlexSans } from '@/fonts';
import type { Locale } from '@/types/i18n';

import styles from './Header.module.css';
import { IconHamburger } from '../Shared/Icons';

function Header() {
  const router = useRouter();

  const locale = router.locale as Locale;

  const className = clsx(styles.container, IBMPlexSans.className);

  return (
    <header className={className}>
      <Link href={`/${locale}`}>
        <Image src={logo} width={148} height={40} alt="logo" />
      </Link>
      <IconHamburger />
    </header>
  );
}

export default Header;
