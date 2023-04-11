import { clsx } from 'clsx';
import { useTranslation } from 'next-i18next';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { api } from '@/lib/utils/api';
import type { SendReportInput } from '@/server/api/routers/doctors';

import styles from './DoctorReportError.module.css';
import DoctorReportErrorActions from './DoctorReportErrorActions';
import DoctorReportErrosDiffs from './DoctorReportErrorDiffs';
import type { DoctorReportErrorProps } from './types';
import useDoctorReportErrorTranslations from './useDoctorReportErrorTranslations';

const CLOSE_TIMEOUT = 3000;

type DoctorReportErrorReadOnlyFormProps = {
  data: SendReportInput | null;
  initialData: SendReportInput;
  back: () => void;
  onEditDone: DoctorReportErrorProps['onEditDone'];
};

const DoctorReportErrorReadOnlyForm = ({
  data,
  back,
  onEditDone,
  initialData,
}: DoctorReportErrorReadOnlyFormProps) => {
  // translations
  const {
    buttons: buttonTranslations,
    notifications: notificationTransaltions,
  } = useDoctorReportErrorTranslations();
  const { t } = useTranslation('common');

  const { register, handleSubmit } = useForm<SendReportInput>({
    defaultValues: data ?? undefined,
  });

  // mutation
  const sendReport = api.doctors.sendReport.useMutation();

  const { isSuccess } = sendReport;
  useEffect(() => {
    let timeout: NodeJS.Timeout | null = null;

    if (isSuccess) {
      timeout = setTimeout(() => {
        onEditDone();
      }, CLOSE_TIMEOUT);
    }
    return () => {
      timeout && clearTimeout(timeout);
    };
  }, [isSuccess, onEditDone]);

  const onSubmit = handleSubmit((data, e) => {
    if (!e) return;
    e.preventDefault();
    sendReport.mutate(data);
  });

  const beforeSendStyles = clsx(
    styles.DoctorReportError__form,
    data && styles.Show,
    !data && styles.HideCheck
  );

  const loadingContent = sendReport.isLoading && (
    <div className={clsx(styles.DoctorReportError__info_container)}>
      {notificationTransaltions.sending}
    </div>
  );

  const idleContent = sendReport.isIdle && (
    <>
      <div>
        <p>{notificationTransaltions.initial}</p>
      </div>
      <div className={styles.DoctorReportError__diffs_container}>
        {data && (
          <DoctorReportErrosDiffs
            data={data}
            initialData={initialData}
            register={register}
          />
        )}
      </div>
      <DoctorReportErrorActions
        formStatus="validate"
        onBack={() => back()}
        onConfirmText={buttonTranslations.confirm}
        onBackText={buttonTranslations.back}
      />
    </>
  );

  const errorContent = sendReport.isError && (
    <>
      <div className={clsx(styles.DoctorReportError__info_container)}>
        <p>{notificationTransaltions.error}</p>
      </div>
      <DoctorReportErrorActions
        formStatus="error"
        onTryAgain={() => back()}
        onTryAgainText={buttonTranslations.tryAgain}
        onDone={onEditDone}
        onDoneText={buttonTranslations.close}
      />
    </>
  );

  const successContent = sendReport.isSuccess && (
    <>
      <div className={clsx(styles.DoctorReportError__info_container)}>
        <div>
          <p>{notificationTransaltions.success}</p>
          <p>
            {notificationTransaltions.closing}{' '}
            {t('seconds.secondsWithCount', {
              count: CLOSE_TIMEOUT / 1000,
              defaultValue: 'seconds',
            })}
            ...
          </p>
        </div>
      </div>
      <DoctorReportErrorActions
        formStatus="success"
        onClose={onEditDone}
        onCloseText={buttonTranslations.close}
      />
    </>
  );

  return (
    <form className={beforeSendStyles} onSubmit={onSubmit}>
      {loadingContent}
      {idleContent}
      {errorContent}
      {successContent}
    </form>
  );
};

export default DoctorReportErrorReadOnlyForm;
