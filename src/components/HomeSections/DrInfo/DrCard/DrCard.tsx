import clsx from 'clsx';
import type { AriaRole, Ref } from 'react';
import { forwardRef } from 'react';

import type { Doctor } from '@/server/api/routers/doctors';

import styles from './DrCard.module.css';
import { DrActions } from '../DrActions';
import { DrAvailabilityInfo } from '../DrAvailabilityInfo';
import { DrBasicInfo } from '../DrBasicInfo';

type DrCardProps = {
  accepts: Doctor['accepts'];
  availability: Doctor['availability'];
  drId: Doctor['fakeId'];
  drHref: Doctor['href'];
  href: Doctor['href'];
  fullAddress: Doctor['location']['address']['fullAddress'];
  isExtra: Doctor['isExtra'];
  load: Doctor['load'];
  name: Doctor['name'];
  override: Doctor['override'];
  phone: Doctor['phone'];
  provider: Doctor['provider'];
  role?: AriaRole;
};

const DrCard = (
  {
    accepts,
    availability,
    drHref,
    drId,
    fullAddress,
    href,
    isExtra,
    load,
    name,
    override,
    phone,
    provider,
    role,
  }: DrCardProps,
  ref: Ref<HTMLDivElement>
) => {
  const infoCardStyles = clsx(
    styles.DrCard,
    accepts === 'y' && styles.Accepts,
    accepts === 'n' && styles.Rejects
  );
  return (
    <div role={role} ref={ref} className={infoCardStyles}>
      <DrBasicInfo
        address={fullAddress}
        drId={drId}
        href={href}
        isExtra={isExtra}
        name={name}
        provider={provider}
        className={styles.BasicInfo}
      />
      <DrAvailabilityInfo
        availability={availability}
        accepts={accepts}
        drId={drId}
        load={load}
        override={override}
        className={styles.Availability}
      />
      <DrActions
        drHref={drHref}
        drId={drId}
        phone={phone}
        className={styles.Actions}
      />
    </div>
  );
};

export default forwardRef(DrCard);
