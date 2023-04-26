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
  clinic: Doctor['clinic'];
  drId: Doctor['fakeId'];
  drHref: Doctor['href'];
  email: Doctor['email'];
  href: Doctor['href'];
  fullAddress: Doctor['location']['address']['fullAddress'];
  geoLocation: Doctor['location']['geoLocation'];
  load: Doctor['load'];
  name: Doctor['name'];
  override: Doctor['override'];
  phones: Doctor['phones'];
  provider: Doctor['provider'];
  websites: Doctor['websites'];
  role?: AriaRole;
};

const DrCard = (
  {
    accepts,
    availability,
    clinic,
    drHref,
    drId,
    email,
    fullAddress,
    geoLocation,
    href,
    load,
    name,
    override,
    phones,
    provider,
    websites,
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
        clinic={clinic}
        drId={drId}
        href={href}
        name={name}
        provider={provider}
        className={styles.BasicInfo}
      />
      <DrAvailabilityInfo
        availability={availability}
        accepts={accepts}
        clinic={clinic}
        drId={drId}
        load={load}
        override={override}
        className={styles.Availability}
      />
      <DrActions
        drHref={drHref}
        drId={drId}
        email={email}
        geoLocation={geoLocation}
        phones={phones}
        websites={websites}
        className={styles.Actions}
      />
    </div>
  );
};

export default forwardRef(DrCard);
