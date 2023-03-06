import { Typography } from '@/components/Shared/Typography';

import styles from './DrProvider.module.css';

export type DrProviderProps = {
  provider: string;
};

const DrProvider = ({ provider }: DrProviderProps) => {
  return (
    <Typography
      as="strong"
      element="h4"
      translate="no"
      className={styles.DrProvider}
    >
      {provider}
    </Typography>
  );
};

export default DrProvider;
