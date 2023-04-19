import { clsx } from 'clsx';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { CountDown } from '@/components/Shared/CountDown';
import { api } from '@/lib/utils/api';
import type {
  SendReportInputFixed,
  SendReportInputFromUser,
  SendReportInputUserNotNull,
} from '@/server/api/routers/doctors';

import styles from './DoctorReportError.module.css';
import DoctorReportErrorActions from './DoctorReportErrorActions';
import DoctorReportErrosDiffs from './DoctorReportErrorDiffs';
import type { DoctorReportErrorProps } from './types';
import useDoctorReportErrorTranslations from './useDoctorReportErrorTranslations';

const CLOSE_TIMEOUT = 3000;

type DoctorReportErrorReadOnlyFormProps = {
  data: SendReportInputUserNotNull | null;
  fixed: SendReportInputFixed;
  initialData: SendReportInputUserNotNull;
  back: () => void;
  onEditDone: DoctorReportErrorProps['onEditDone'];
};

const DoctorReportErrorReadOnlyForm = ({
  data,
  back,
  onEditDone,
  initialData,
  fixed,
}: DoctorReportErrorReadOnlyFormProps) => {
  // translations
  const {
    buttons: buttonTranslations,
    notifications: notificationTransaltions,
  } = useDoctorReportErrorTranslations();

  const { register, handleSubmit } = useForm<SendReportInputUserNotNull>({
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

    const onlyChangedData: SendReportInputFromUser = {
      accepts: data.accepts !== initialData.accepts ? data.accepts : null,
      address: data.address !== initialData.address ? data.address : null,
      email: data.email !== initialData.email ? data.email : null,
      note: data.note !== initialData.note ? data.note : null,
      phone: data.phone !== initialData.phone ? data.phone : null,
      orderform:
        data.orderform !== initialData.orderform ? data.orderform : null,
      website: data.website !== initialData.website ? data.website : null,
    };

    sendReport.mutate({
      fromUser: onlyChangedData,
      fixed,
    });
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
        onTryAgain={onSubmit}
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
            <CountDown deadline={CLOSE_TIMEOUT} />
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
