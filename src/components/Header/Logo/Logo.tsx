import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import logo from '@/assets/svg/zdravniki-sledilnik-logo.svg?url';
import type { Locale } from '@/types/i18n';

import styles from './Logo.module.css';

const Logo = () => {
  const router = useRouter();
  const locale = router.locale as Locale;
  return (
    <span className={styles.Logo}>
      <Link href={`/${locale}`}>
        {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
        <Image src={logo as string} fill alt="logo" />
      </Link>
    </span>
  );
};

export default Logo;
