import type { TypographyCustomProps } from '@/components/Shared/Typography';
import { Typography } from '@/components/Shared/Typography';

import styles from './DrAddress.module.css';
import type { Variant, VariantProps } from '../types';

export type DrAddressProps = { address: string } & VariantProps;

const VARIANT_MAP = {
  list: { as: 'body2', element: 'address' },
  popup: { as: 'body2', element: 'address' },
  page: { as: 'body1', element: 'address' },
} satisfies Record<Variant, TypographyCustomProps>;

const DrAddress = ({ address, variant = 'list' }: DrAddressProps) => {
  const { as, element } = VARIANT_MAP[`${variant}`];
  return (
    <Typography as={as} element={element} className={styles.DrAddress}>
      {address}
    </Typography>
  );
};

export default DrAddress;
