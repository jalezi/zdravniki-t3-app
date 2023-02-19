import { clsx } from 'clsx';
import { useTranslation } from 'next-i18next';

import { IBMPlexSans } from '@/assets/fonts';
import { api } from '@/lib/utils/api';

import styles from './Footer.module.css';
import { LongDate } from '../Shared/LongDate';

type FooterProps = {
  position?: 'mdx';
};

const Footer = ({ position = 'mdx' }: FooterProps) => {
  const positionStyles = position === 'mdx' && styles.Mdx;
  const { t } = useTranslation('common');

  const ts = api.timestamp.doctors.useQuery();

  const timestamp = ts.data?.success ? ts.data.data * 1000 : 'error';

  const footerStyles = clsx(
    styles.Footer,
    IBMPlexSans.className,
    positionStyles
  );

  const contentStyles = clsx(styles.Content, positionStyles);

  const dataSource = t`footer.dataSource`;
  const lastChange = t`footer.lastChange`;

  return (
    <footer className={footerStyles}>
      <div className={contentStyles}>
        {dataSource}:{' '}
        <a href="https://www.zzzs.si" target="_blank" rel="noreferrer">
          ZZZS
        </a>
        ,{' '}
        <a
          href="https://www.gov.si/drzavni-organi/organi-v-sestavi/geodetska-uprava/"
          target="_blank"
          rel="noreferrer"
        >
          GURS
        </a>
        <br />
        {lastChange}: <LongDate timestamp={timestamp} />
        .
        <br />© 2021-{new Date().getFullYear()} <strong>Sledilnik.org</strong>
      </div>
    </footer>
  );
};

export default Footer;
