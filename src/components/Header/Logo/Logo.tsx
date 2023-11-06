import Link from 'next/link';
import { useRouter } from 'next/router';
import type { SyntheticEvent } from 'react';

import { LogoSvg } from '@/components/Shared/Icons';
import { SL_CENTER, ZOOM } from '@/lib/constants/map';
import useBoundStore from '@/lib/store/useBoundStore';
import { stringifyHash } from '@/lib/utils/url-hash';

import styles from './Logo.module.css';

const Logo = () => {
  const router = useRouter();
  const locale = router.locale;

  const hash = stringifyHash(['all', [ZOOM, SL_CENTER[0], SL_CENTER[1]], '']);
  const resetFilters = (e: SyntheticEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    useBoundStore.setState({
      accepts: 'all',
      zoom: ZOOM,
      center: SL_CENTER,
      search: '',
    });
    void router.push(`/gp/`, `/gp/${hash}`, {
      shallow: true,
      locale: router.locale,
    });
  };

  return (
    <span className={styles.Logo}>
      <Link
        href={`/gp/${hash}}`}
        locale={locale}
        className={styles.Link}
        aria-label="Home"
        onClick={e => resetFilters(e)}
      >
        <LogoSvg />
      </Link>
    </span>
  );
};

export default Logo;
