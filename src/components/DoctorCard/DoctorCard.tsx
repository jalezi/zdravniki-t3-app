import { clsx } from 'clsx';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';

import MapSkeleton from '@/components/HomeSections/BigMap/MapSkeleton';
import { DrAvailabilityInfo } from '@/components/HomeSections/DrInfo/DrAvailabilityInfo';
import { DrBasicInfo } from '@/components/HomeSections/DrInfo/DrBasicInfo';
import { Button } from '@/components/Shared/Buttons';
import { Icon } from '@/components/Shared/Icons';
import useBoundStore from '@/lib/store/useBoundStore';
import type { Locale } from '@/lib/types/i18n';
import { formatDate, getSiteUrl } from '@/lib/utils/common';
import { stringifyHash } from '@/lib/utils/url-hash';
import type { Doctor } from '@/server/api/routers/doctors';

import styles from './DoctorCard.module.css';
import DoctorContacts from './DoctorContacts';
import DoctorFooter from './DoctorFooter';
import DoctorOverride from './DoctorOverride';
import { DoctorReportError } from './DoctorReportError';
import type { DoctorReportErrorDataProps } from './DoctorReportError/types';
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

  const zoom = useBoundStore(state => state.zoom);
  const center = useBoundStore(state => state.center);
  const accepts = useBoundStore(state => state.accepts);
  const search = useBoundStore(state => state.search);

  const router = useRouter();

  const [edit, setEdit] = useState(false);
  const { t } = useTranslation('common');
  const { t: tDoctor } = useTranslation('doctor');

  const editQuery = router.query.edit;
  useEffect(() => {
    if (editQuery === 'true') {
      setEdit(true);
      return;
    }
    setEdit(false);
  }, [editQuery]);

  const { override } = doctor;

  const goBack = () => {
    const { locale } = router;
    const hash = stringifyHash([accepts, [zoom, center[0], center[1]], search]);
    const asPath = `/${doctor.typePage}${hash}`;
    void router.push(`/${doctor.typePage}`, asPath, { locale });
  };

  const doctorCardStyles = clsx(
    styles.DoctorCard,
    doctor.accepts === 'y' && styles.Accepts,
    doctor.accepts === 'n' && styles.Rejects
  );

  const doctorInfoStyles = clsx(styles.DoctorCard__info);

  const onEdit = () => {
    void router.replace(
      {
        pathname: router.asPath,
        query: { edit: true },
      },
      `/${doctor.type}/${doctor.slugName}/${doctor.idInst}/?edit=true`,
      { locale: router.locale as Locale }
    );
  };

  const onEditDone = () => {
    void router.replace(
      {
        pathname: router.asPath,
        query: {},
      },
      `/${doctor.type}/${doctor.slugName}/${doctor.idInst}`,
      { locale: router.locale as Locale }
    );
  };

  const formData: DoctorReportErrorDataProps['data']['fromUser'] = {
    address: doctor.location.address.fullAddress,
    accepts: doctor.accepts,
    email: doctor.email,
    note: doctor.override.note,
    orderform: doctor.orderform,
    phones: doctor.phones,
    websites: doctor.websites,
  };

  const fixedData: DoctorReportErrorDataProps['data']['fixed'] & {
    provider: string;
  } = {
    name: doctor.name,
    url: getSiteUrl() + router.asPath,
    instId: doctor.idInst,
    type: doctor.type,
    provider: doctor.provider ?? '',
    availability: doctor.availability,
  };

  const data = { fromUser: formData, fixed: fixedData };

  return (
    <div className={doctorCardStyles}>
      <div id="doctor-info" className={doctorInfoStyles}>
        <DrBasicInfo
          address={doctor.location.address.fullAddress}
          drId={doctor.fakeId}
          clinic={doctor.clinic}
          href={doctor.href}
          name={doctor.name}
          provider={doctor.provider}
          variant="page"
        />
        <DrAvailabilityInfo
          availability={doctor.availability}
          accepts={doctor.accepts}
          clinic={doctor.clinic}
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

        <Button type="button" onClick={onEdit} container="span">
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
          <DoctorReportError.Container onClose={onEditDone}>
            <header>
              <Typography as="h3" element="h2">
                {tDoctor('reportError.title')}
              </Typography>
              <div>
                <p>{tDoctor('reportError.text')}</p>
              </div>
            </header>
            <DoctorReportError.Form data={data} onEditDone={onEditDone} />
          </DoctorReportError.Container>
        </Portal>
      )}
    </div>
  );
};

export default DoctorCard;
