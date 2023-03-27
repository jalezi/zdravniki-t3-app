import { clsx } from 'clsx';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import MapSkeleton from '@/components/HomeSections/BigMap/MapSkeleton';
import { DrAvailabilityInfo } from '@/components/HomeSections/DrInfo/DrAvailabilityInfo';
import { DrBasicInfo } from '@/components/HomeSections/DrInfo/DrBasicInfo';
import { Button } from '@/components/Shared/Buttons';
import { Icon } from '@/components/Shared/Icons';
import { MAX_ZOOM } from '@/lib/constants/map';
import type { Locale } from '@/lib/types/i18n';
import { formatDate } from '@/lib/utils/common';
import { stringifyHash } from '@/lib/utils/url-hash';
import type { Doctor } from '@/server/api/routers/doctors';

import styles from './DoctorCard.module.css';
import DoctorContacts from './DoctorContacts';
import DoctorFooter from './DoctorFooter';
import DoctorOverride from './DoctorOverride';
import { DoctorReportError } from './DoctorReportError';
import { Portal } from '../Shared/Portal';
import { Typography } from '../Shared/Typography';

type DoctorCardProps = {
  doctor: Doctor;
};

const DoctorCard = ({ doctor }: DoctorCardProps) => {
  const DrMap = dynamic(() => import('./DoctorMap'), {
    ssr: false,
    loading: MapSkeleton.bind(null, { size: 'sm' }),
  });

  const router = useRouter();

  const [edit, setEdit] = useState('edit' in router.query);
  const { t } = useTranslation('common');
  const { t: tDoctor } = useTranslation('doctor');

  const { override } = doctor;

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
        <DoctorContacts
          email={doctor.email}
          websites={doctor.websites}
          phones={doctor.phones}
          orderform={doctor.orderform}
          orderformText={tDoctor('orderform.linkReplaceText').toLowerCase()}
        />

        <Button type="button" onClick={() => setEdit(true)} container="span">
          <Icon name="AlertSvg" size="xxl" />{' '}
          {tDoctor('reportError.linkText').toLowerCase()}
        </Button>
        <hr className={styles.Divider} />
        <div className={styles.DoctorCard__back}>
          <DoctorFooter
            goBack={goBack}
            backToHomeText={t('backToHome').toLowerCase()}
          >
            {override.isDateOverride ? (
              <DoctorOverride
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
          </DoctorFooter>
        </div>
      </div>
      <div id="doctor-map" className={styles.DoctorCard__map}>
        <DrMap position={doctor.location.geoLocation} />
      </div>
      {edit && (
        <Portal>
          <DoctorReportError.Container setEdit={() => setEdit(false)}>
            <Typography as="h3" element="h2">
              {tDoctor('reportError.title')}
            </Typography>
            <div>
              <p>{tDoctor('reportError.text')}</p>
            </div>
            <DoctorReportError.Form
              address={doctor.location.address.fullAddress}
              websites={doctor.websites}
              phones={doctor.phones}
              email={doctor.email}
              orderform={doctor.orderform}
              accepts={doctor.accepts}
              availability={doctor.availability}
              note={doctor.override.note}
              setEdit={setEdit}
            />
          </DoctorReportError.Container>
        </Portal>
      )}
    </div>
  );
};

export default DoctorCard;
