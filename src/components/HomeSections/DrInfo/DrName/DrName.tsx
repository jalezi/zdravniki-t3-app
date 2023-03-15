import Link from 'next/link';

import { Typography } from '@/components/Shared/Typography';

import styles from './DrName.module.css';

export type DrNameProps = { href: string; locale?: string; name: string } & {
  children?: React.ReactNode;
};

const DrName = ({ href, name, locale, children }: DrNameProps) => {
  return (
    <Typography as="h2" element="h3" translate="no" className={styles.DrName}>
      {href ? (
        <Link
          href={href}
          passHref
          hrefLang={locale ? locale : undefined}
          locale={locale}
        >
          {name}
        </Link>
      ) : (
        <span>{name}</span>
      )}
      {children}
    </Typography>
  );
};

export default DrName;
