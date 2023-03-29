import type { URL } from 'url';

import { clsx } from 'clsx';

import { Button } from '@/components/Shared/Buttons';
import { Icon } from '@/components/Shared/Icons';

import styles from './DoctorWebsite.module.css';

type DoctorWebsiteProps = {
  href: URL['href'];
  text: string;
  host: URL['host'];
};

const DoctorWebsite = ({ host, href, text }: DoctorWebsiteProps) => {
  return (
    <Button
      as="a"
      href={href}
      container="span"
      target="_blank"
      rel="noopener noreferrer"
      containerClassName={clsx(styles.Container)}
      title={href}
    >
      <Icon name="LinkSvg" size="xxl" />
      <span className={styles.Elipsis}>
        <strong>{host}</strong>
        <span>{text}</span>
      </span>
    </Button>
  );
};

export default DoctorWebsite;
