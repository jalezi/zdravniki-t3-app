import { CircleChart } from '@/components/Shared/CircleChart';
import type { PolymorphicComponentProps } from '@/components/Shared/Polymorphic';

import styles from './DrAvailability.module.css';

export type DrAvailabilityProps = { id: string; value: number } & Omit<
  PolymorphicComponentProps<'span'>,
  'children' | 'as'
>;

const DrAvailability = ({ id, value }: DrAvailabilityProps) => {
  const firstValue = value > 1 ? 1 : value;
  const secondValue = value > 1 ? value - 1 : 0;

  return (
    <span id={id} className={styles.DrAvailability}>
      <CircleChart value={firstValue} className={styles.Large} />
      {secondValue > 0 && (
        <CircleChart value={secondValue} className={styles.Small} />
      )}
    </span>
  );
};

export default DrAvailability;
