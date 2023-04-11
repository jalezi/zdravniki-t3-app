import { clsx } from 'clsx';
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
  const { buttons: buttonTranslations } = useDoctorReportErrorTranslations();

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
    <div>Pošiljanje sporočila...</div>
  );

  const idleContent = sendReport.isIdle && (
    <>
      <div>
        <p>Prikazani so samo spremenjeni podatki.</p>
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
        onBack={() => back()}
        onConfirmText={buttonTranslations.confirm}
        onBackText={buttonTranslations.back}
      />
    </>
  );

  const errorContent = sendReport.isError && (
    <>
      <div>
        <p>Napaka pri pošiljanju sporočila.</p>
      </div>
      <DoctorReportErrorActions
        onTryAgain={() => back()}
        onTryAgainText="Poskusi ponovno"
        onDone={onEditDone}
        onDoneText="Zapri"
      />
    </>
  );

  const successContent = sendReport.isSuccess && (
    <>
      <div>
        <p>Sporočilo je bilo uspešno poslano.</p>
        <p>Okno se bo zaprlo čez 3 sekunde</p>
      </div>
      <DoctorReportErrorActions onClose={onEditDone} onCloseText="Zapri" />
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
