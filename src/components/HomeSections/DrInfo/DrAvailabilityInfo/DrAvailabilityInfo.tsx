import { clsx } from 'clsx';

import styles from './DrAvailabilityInfo.module.css';
import { DrAcceptsOrRejectsChip } from '../DrAcceptsOrRejectsChip';
import DrAvailability from '../DrAvailability/DrAvailability';

export type DrAvailabilityInfoProps = {
  accepts: 'y' | 'n';
  availability: number;
  drId: string;
  acceptsText: string;
  className?: string;
};

const DrAvailabilityInfo = ({
  accepts,
  availability,
  drId,
  acceptsText: text,
  ...props
}: DrAvailabilityInfoProps) => {
  const availabilityInfoStyles = clsx(
    styles.DrAvailabilityInfo,
    props.className
  );

  return (
    <div className={availabilityInfoStyles} {...props}>
      <DrAcceptsOrRejectsChip
        tooltipContent={drId}
        id={drId + '_accepts'}
        text={text}
        accepts={accepts}
      />
      <DrAvailability
        id={drId + '_availability'}
        value={Number(availability)}
        tooltipContent={drId}
      />
    </div>
  );
};

export default DrAvailabilityInfo;
