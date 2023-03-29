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
  geoLocation: Doctor['location']['geoLocation'];
  isExtra: Doctor['isExtra'];
  isFloating: Doctor['isFloating'];
  load: Doctor['load'];
  name: Doctor['name'];
  override: Doctor['override'];
  phones: Doctor['phones'];
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
    geoLocation,
    href,
    isExtra,
    isFloating,
    load,
    name,
    override,
    phones,
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
        isFloating={isFloating}
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
        geoLocation={geoLocation}
        phones={phones}
        className={styles.Actions}
      />
    </div>
  );
};

export default forwardRef(DrCard);
