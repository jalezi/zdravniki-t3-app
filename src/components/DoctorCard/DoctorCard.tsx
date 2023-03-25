import { clsx } from 'clsx';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import MapSkeleton from '@/components/HomeSections/BigMap/MapSkeleton';
import { DrAvailabilityInfo } from '@/components/HomeSections/DrInfo/DrAvailabilityInfo';
import { DrBasicInfo } from '@/components/HomeSections/DrInfo/DrBasicInfo';
import { Button } from '@/components/Shared/Buttons';
import { Icon } from '@/components/Shared/Icons';
import { MAX_ZOOM } from '@/lib/constants/map';
import {
  urlOrEmailTransformSchema,
  urlTransformSchema,
} from '@/lib/types/doctors';
import type { Locale } from '@/lib/types/i18n';
import { formatDate } from '@/lib/utils/common';
import { stringifyHash } from '@/lib/utils/url-hash';
import type { Doctor } from '@/server/api/routers/doctors';

import styles from './DoctorCard.module.css';
import DoctorCardFooter from './DoctorCardFooter';
import OverrideChip from './OverrideChip';
import Website from './Website';

type DoctorCardProps = {
  doctor: Doctor;
};

const DoctorCard = ({ doctor }: DoctorCardProps) => {
  const DrMap = dynamic(() => import('./DoctorMap'), {
    ssr: false,
    loading: MapSkeleton.bind(null, { size: 'sm' }),
  });

  const router = useRouter();
  const { t } = useTranslation('common');
  const { t: tDoctor } = useTranslation('doctor');

  const { override } = doctor;

  const orderform = urlOrEmailTransformSchema.safeParse(doctor.orderform);

  const goBack = () => {
    if (window.history.length > 2) {
      router.back();
    } else {
      const { locale } = router;
      const hash = stringifyHash([
        'all',
        [
          MAX_ZOOM,
          doctor.location.geoLocation.lat,
          doctor.location.geoLocation.lng,
        ],
        doctor.name,
      ]);

      const asPath = `/${doctor.type}${hash}`;
      void router.push(`/${doctor.type}`, asPath, { locale });
    }
  };

  const doctorCardStyles = clsx(
    styles.DoctorCard,
    doctor.accepts === 'y' && styles.Accepts,
    doctor.accepts === 'n' && styles.Rejects
  );

  const doctorInfoStyles = clsx(styles.DoctorCard__info);

  return (
    <div className={doctorCardStyles}>
      <div id="doctor-info" className={doctorInfoStyles}>
        <DrBasicInfo
          address={doctor.location.address.fullAddress}
          drId={doctor.fakeId}
          href={doctor.href}
          isExtra={doctor.isExtra}
          name={doctor.name}
          provider={doctor.provider}
          variant="page"
        />
        <DrAvailabilityInfo
          availability={doctor.availability}
          accepts={doctor.accepts}
          drId={doctor.fakeId}
          load={doctor.load}
          override={doctor.override}
        />
        <hr className={styles.Divider} />
        {doctor.websites.map(website => {
          const websiteUrl = urlTransformSchema.safeParse(website);
          return websiteUrl.success ? (
            <Website
              key="website"
              href={websiteUrl.data.href}
              text={websiteUrl.data.host.replaceAll('www.', '')}
            />
          ) : null;
        })}
        {orderform.success && (
          <Button
            as="a"
            href={
              orderform.data.type === 'url'
                ? orderform.data.value
                : `mailto: ${orderform.data.value}`
            }
            container="span"
            target={orderform.data.type === 'url' ? '_blank' : undefined}
            rel={
              orderform.data.type === 'url' ? 'noopener noreferrer' : undefined
            }
          >
            <Icon name="BookingSvg" size="xxl" />{' '}
            {tDoctor('orderform.linkReplaceText').toLowerCase()}
          </Button>
        )}
        {doctor.email && (
          <Button as="a" href={`mailto: ${doctor.email}`} container="span">
            <Icon name="EmailSvg" size="xxl" /> {doctor.email}
          </Button>
        )}
        {doctor.phones.map(phone =>
          phone ? (
            <Button key={phone} as="a" href={`tel: ${phone}`} container="span">
              <Icon name="Phone" size="xxl" /> {phone}
            </Button>
          ) : null
        )}
        <Button
          as={Link}
          href="#"
          locale={router.locale}
          passHref
          container="span"
        >
          <Icon name="AlertSvg" size="xxl" />{' '}
          {tDoctor('reportError.linkText').toLowerCase()}
        </Button>
        <hr className={styles.Divider} />
        <div className={styles.DoctorCard__back}>
          <DoctorCardFooter
            goBack={goBack}
            backToHomeText={t('backToHome').toLowerCase()}
          >
            {override.isDateOverride ? (
              <OverrideChip
                overrideId={doctor.fakeId}
                changedOnText={tDoctor('info.changedOn')}
                overrideChipText={formatDate(
                  override.date,
                  router.locale as Locale
                )}
                note={override.note}
                overideChipClassName={styles.Override}
              />
            ) : null}
          </DoctorCardFooter>
        </div>
      </div>
      <div id="doctor-map" className={styles.DoctorCard__map}>
        <DrMap position={doctor.location.geoLocation} />
      </div>
    </div>
  );
};

export default DoctorCard;
