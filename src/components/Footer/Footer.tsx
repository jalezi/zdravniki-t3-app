import { clsx } from 'clsx';
import { useTranslation } from 'next-i18next';

import { IBMPlexSans } from '@/assets/fonts';
import { api } from '@/lib/utils/api';

import styles from './Footer.module.css';
import { LongDate } from '../Shared/LongDate';

type FooterProps = {
  position?: 'mdx' | 'list' | 'doctor';
};

const Footer = ({ position = 'mdx' }: FooterProps) => {
  const positionStyles = clsx(
    position === 'mdx' && styles.Mdx,
    position === 'list' && styles.List,
    position === 'doctor' && styles.Doctor
  );
  const { t } = useTranslation('common');

  const ts = api.timestamp.doctors.useQuery();

  // LongDate handles the error case
  const timestamp = ts.data?.success ? ts.data.data * 1000 : 'error';

  const footerStyles = clsx(
    styles.Footer,
    IBMPlexSans.className,
    positionStyles
  );

  const contentStyles = clsx(styles.Content__wrapper, positionStyles);

  const dataSource = t`footer.dataSource`;
  const lastChange = t`footer.lastChange`;
  const zzzs = t`footer.zzzs`;
  const gurs = t`footer.gurs`;

  return (
    <footer className={footerStyles}>
      <div className={contentStyles}>
        <div>
          <p className={styles.Content__item}>
            {dataSource}:{' '}
            <a href="https://www.zzzs.si" target="_blank" rel="noreferrer">
              <abbr title={zzzs}>ZZZS</abbr>
            </a>
            ,{' '}
            <a
              href="https://www.gov.si/drzavni-organi/organi-v-sestavi/geodetska-uprava/"
              target="_blank"
              rel="noreferrer"
            >
              <abbr title={gurs}>GURS</abbr>
            </a>
          </p>
          <p className={styles.Content__item}>
            {lastChange}: <LongDate timestamp={timestamp} />.
          </p>
          <p className={styles.Content__item}>
            © 2021-
            {new Date().getFullYear()} <strong>Sledilnik.org</strong>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
