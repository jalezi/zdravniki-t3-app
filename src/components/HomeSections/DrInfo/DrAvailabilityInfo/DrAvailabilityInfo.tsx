import { clsx } from 'clsx';

import styles from './DrAvailabilityInfo.module.css';
import { DrAcceptsOrRejectsChip } from '../DrAcceptsOrRejectsChip';
import { Availability } from '../DrAvailability';

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
        id={drId + '_accepts'}
        text={text}
        accepts={accepts}
      />
      <Availability id={drId + '_availability'} value={Number(availability)} />
    </div>
  );
};

export default DrAvailabilityInfo;
