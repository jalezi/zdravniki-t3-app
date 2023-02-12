import Link from 'next/link';
import { useRouter } from 'next/router';

import { LogoSvg } from '@/components/Shared/Icons';
import type { Locale } from '@/types/i18n';

import styles from './Logo.module.css';

const Logo = () => {
  const router = useRouter();
  const locale = router.locale as Locale;
  return (
    <span className={styles.Logo}>
      <Link href={`/${locale}`} className={styles.Link} aria-label="Home">
        <LogoSvg />
      </Link>
    </span>
  );
};

export default Logo;
