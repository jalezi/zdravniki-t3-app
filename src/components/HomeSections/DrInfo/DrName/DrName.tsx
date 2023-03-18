import Link from 'next/link';

import type { TypographyCustomProps } from '@/components/Shared/Typography';
import { Typography } from '@/components/Shared/Typography';

import styles from './DrName.module.css';
import type { Variant, VariantProps } from '../types';

export type DrNameProps = {
  href: string;
  locale?: string;
  name: string;
} & VariantProps & {
    children?: React.ReactNode;
  };

const VARIANT_MAP = {
  list: { as: 'h3', element: 'h3' },
  popup: { as: 'h3', element: 'h3' },
  page: { as: 'h1', element: 'h1' },
} satisfies Record<Variant, TypographyCustomProps>;

const DrName = ({
  href,
  name,
  locale,
  variant = 'list',
  children,
}: DrNameProps) => {
  const { as, element } = VARIANT_MAP[`${variant}`];

  return (
    <Typography
      as={as}
      element={element}
      translate="no"
      className={styles.DrName}
    >
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
