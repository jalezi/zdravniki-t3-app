import styles from './DrAvailabilityInfo.module.css';
import { DrAcceptsOrRejectsChip } from '../DrAcceptsOrRejectsChip';
import DrAvailability from '../DrAvailability/DrAvailability';

export type DrAvailabilityInfoProps = {
  accepts: 'y' | 'n';
  availability: number;
  drId: string;
  acceptsText: string;
};

const DrAvailabilityInfo = ({
  accepts,
  availability,
  drId,
  acceptsText: text,
  ...props
}: DrAvailabilityInfoProps) => {
  return (
    <div className={styles.DrAvailabilityInfo} {...props}>
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
