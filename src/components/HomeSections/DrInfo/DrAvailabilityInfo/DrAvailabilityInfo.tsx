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
  variant?: 'default' | 'popup' | 'page';
  clinic: Doctor['clinic'];
};

const DrAvailabilityInfo = ({
  accepts,
  availability,
  clinic,
  drId,
  override,
  load,
  variant = 'default',
  ...props
}: DrAvailabilityInfoProps) => {
  const availabilityInfoStyles = clsx(
    styles.DrAvailabilityInfo,
    props.className
  );

  const acceptsId = `${drId}_accepts_${variant}`;
  const availabilityId = `${drId}_availability_${variant}`;

  return (
    <div className={availabilityInfoStyles} {...props}>
      <AcceptsOrRejects
        id={acceptsId}
        accepts={accepts}
        load={load}
        override={override}
      />
      {clinic !== 'floating' && (
        <Availability id={availabilityId} value={Number(availability)} />
      )}
    </div>
  );
};

export default DrAvailabilityInfo;
