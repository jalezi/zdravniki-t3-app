import { CircleChart } from '@/components/Shared/CircleChart';
import type { PolymorphicComponentProps } from '@/components/Shared/Polymorphic';
import { Tooltip } from '@/components/Shared/Tooltips';

import styles from './DrAvailability.module.css';

type TooltipProps = {
  tooltipContent?: React.ReactNode;
};
export type DrAvailabilityProps = { id: string; value: number } & TooltipProps &
  Omit<PolymorphicComponentProps<'span'>, 'children' | 'as'>;

const DrAvailability = ({ id, value, tooltipContent }: DrAvailabilityProps) => {
  const firstValue = value > 1 ? 1 : value;
  const secondValue = value > 1 ? value - 1 : 0;

  return (
    <>
      <span id={id} className={styles.DrAvailability}>
        <CircleChart value={firstValue} className={styles.Large} />
        {secondValue > 0 && (
          <CircleChart value={secondValue} className={styles.Small} />
        )}
      </span>
      {tooltipContent ? (
        <Tooltip anchorSelect={`#${id}`} place="bottom">
          {tooltipContent}
        </Tooltip>
      ) : null}
    </>
  );
};

export default DrAvailability;
