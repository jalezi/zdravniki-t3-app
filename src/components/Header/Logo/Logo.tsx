import Link from 'next/link';
import { useRouter } from 'next/router';

import { LogoSvg } from '@/components/Shared/Icons';

import styles from './Logo.module.css';

const Logo = () => {
  const router = useRouter();
  const locale = router.locale;
  return (
    <span className={styles.Logo}>
      <Link
        href={`/gp/`}
        locale={locale}
        className={styles.Link}
        aria-label="Home"
      >
        <LogoSvg />
      </Link>
    </span>
  );
};

export default Logo;
