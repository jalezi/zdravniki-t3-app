import { Typography } from '@/components/Shared/Typography';

import styles from './DrAddress.module.css';
export type DrAddressProps = { address: string };

const DrAddress = ({ address }: DrAddressProps) => {
  return (
    <Typography as="body2" element="address" className={styles.DrAddress}>
      {address}
    </Typography>
  );
};

export default DrAddress;
