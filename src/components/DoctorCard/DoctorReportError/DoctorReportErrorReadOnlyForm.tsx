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
    if (isSuccess) {
      onEditDone();
    }
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

  const actions = (
    <DoctorReportErrorActions
      onBack={() => back()}
      onConfirmText={buttonTranslations.confirm}
      onBackText={buttonTranslations.back}
    />
  );

  return (
    <form className={beforeSendStyles} onSubmit={onSubmit}>
      <div>
        <p>Prikazani so samo spremenjeni podatki.</p>
      </div>
      <div
        style={{
          flex: '1 1 100%',
          display: 'flex',
          flexDirection: 'column',
          gap: '1em',
        }}
      >
        {data && (
          <DoctorReportErrosDiffs
            data={data}
            initialData={initialData}
            register={register}
          />
        )}
      </div>
      {actions}
    </form>
  );
};

export default DoctorReportErrorReadOnlyForm;
