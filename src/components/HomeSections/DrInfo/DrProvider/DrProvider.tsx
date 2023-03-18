import type { TypographyCustomProps } from '@/components/Shared/Typography';
import { Typography } from '@/components/Shared/Typography';

import styles from './DrProvider.module.css';
import type { Variant, VariantProps } from '../types';

export type DrProviderProps = {
  provider: string;
} & VariantProps;

const VARIANT_MAP = {
  list: { as: 'h6', element: 'h4' },
  popup: { as: 'h6', element: 'h4' },
  page: { as: 'h4', element: 'h2' },
} satisfies Record<Variant, TypographyCustomProps>;

const DrProvider = ({ provider, variant = 'list' }: DrProviderProps) => {
  const { as, element } = VARIANT_MAP[`${variant}`];
  return (
    <Typography
      as={as}
      element={element}
      translate="no"
      className={styles.DrProvider}
    >
      {provider}
    </Typography>
  );
};

export default DrProvider;
