import { clsx } from 'clsx';

import { IBMPlexSans } from '@/assets/fonts';

import styles from './Footer.module.css';

type FooterProps = {
  position?: 'mdx';
};

const Footer = ({ position = 'mdx' }: FooterProps) => {
  const positionStyles = position === 'mdx' && styles.Mdx;

  const footerStyles = clsx(
    styles.Footer,
    IBMPlexSans.className,
    positionStyles
  );

  const contentStyles = clsx(styles.Content, positionStyles);

  return (
    <footer className={footerStyles}>
      <div className={contentStyles}>
        Vir podatkov:{' '}
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
        Zadnja sprememba: <strong>sobota, 18. februar 2023 ob 11:28</strong>.
        <br />© 2021-2023 <strong>Sledilnik.org</strong>
      </div>
    </footer>
  );
};

export default Footer;
