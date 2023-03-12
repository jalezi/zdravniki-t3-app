import { clsx } from 'clsx';

import type { Doctor } from '@/server/api/routers/doctors';

import styles from './DrAvailabilityInfo.module.css';
import { AcceptsOrRejects } from '../DrAcceptsOrRejectsChip';
import { Availability } from '../DrAvailability';

type Load = Doctor['load'];

export type DrAvailabilityInfoProps = {
  accepts: 'y' | 'n';
  availability: number;
  drId: string;
  load: Load;
  override: Doctor['override'];
  className?: string;
};

const DrAvailabilityInfo = ({
  accepts,
  availability,
  drId,
  override,
  load,
  ...props
}: DrAvailabilityInfoProps) => {
  const availabilityInfoStyles = clsx(
    styles.DrAvailabilityInfo,
    props.className
  );

  return (
    <div className={availabilityInfoStyles} {...props}>
      <AcceptsOrRejects
        id={drId + '_accepts'}
        accepts={accepts}
        load={load}
        override={override}
      />
      <Availability id={drId + '_availability'} value={Number(availability)} />
    </div>
  );
};

export default DrAvailabilityInfo;
