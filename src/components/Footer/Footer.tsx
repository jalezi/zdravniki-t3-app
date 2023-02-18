import { clsx } from 'clsx';
import { useTranslation } from 'next-i18next';

import { IBMPlexSans } from '@/assets/fonts';

import styles from './Footer.module.css';

type FooterProps = {
  position?: 'mdx';
};

const Footer = ({ position = 'mdx' }: FooterProps) => {
  const positionStyles = position === 'mdx' && styles.Mdx;
  const { t } = useTranslation('common');

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
        {lastChange}: <strong>sobota, 18. februar 2023 ob 11:28</strong>.
        <br />© 2021-{new Date().getFullYear()} <strong>Sledilnik.org</strong>
      </div>
    </footer>
  );
};

export default Footer;
