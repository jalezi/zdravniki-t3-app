import { clsx } from 'clsx';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { Chip } from '@/components/Shared/Chip';
import type { IconName } from '@/components/Shared/Icons';
import { Typography } from '@/components/Shared/Typography';
import { api } from '@/lib/utils/api';
import type { SendReportInput } from '@/server/api/routers/doctors';

import styles from './DoctorReportError.module.css';
import DoctorReportErrorActions from './DoctorReportErrorActions';
import type { DoctorReportErrorProps } from './types';
import useDoctorReportErrorTranslations from './useDoctorReportErrorTranslations';

type DoctorReportErrorReadOnlyFormProps = {
  data: SendReportInput | null;
  initialData: SendReportInput;
  back: () => void;
  onEditDone: DoctorReportErrorProps['onEditDone'];
};

const INPUT_ICONS_MAP = {
  address: 'MapMarkerSvg',
  email: 'EmailSvg',
  orderform: 'LinkSvg',
  note: undefined,
  website: 'LinkSvg',
  accepts: undefined,
  availability: undefined,
  phone: 'PhoneSvg',
} satisfies Record<keyof SendReportInput, IconName | undefined>;

const DoctorReportErrorReadOnlyForm = ({
  data,
  back,
  onEditDone,
  initialData,
}: DoctorReportErrorReadOnlyFormProps) => {
  const {
    yes,
    no,
    buttons: buttonTranslations,
    inputs: inputTranslations,
  } = useDoctorReportErrorTranslations();

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
        {data &&
          Object.entries(data).map(([label, value]) => {
            const _label = label as keyof SendReportInput;
            const iconName = INPUT_ICONS_MAP[`${_label}`];

            const _value =
              _label === 'accepts' ? (value === 'y' ? yes : no) : value;

            const initialValue = initialData[`${_label}`];
            const _initialValue =
              _label === 'accepts'
                ? initialValue === 'y'
                  ? yes
                  : no
                : initialValue;
            const isChanged = value !== initialValue;

            return isChanged ? (
              <>
                <div key={label + '_div'} className={styles.FormGroup__values}>
                  <Chip
                    size="sm"
                    iconName={iconName}
                    text={inputTranslations[`${_label}`].label}
                    className={clsx(styles.FormGroup__chip)}
                  />

                  <p className={clsx(styles.Value, styles.InitialValue)}>
                    <Typography as="h6" element="strong">
                      {_initialValue ? _initialValue : "''"}
                    </Typography>
                  </p>
                  <p className={clsx(styles.Value, styles.ChangedValue)}>
                    <Typography as="h6" element="strong">
                      {_value ? _value : "''"}
                    </Typography>
                  </p>
                </div>
                <input
                  key={label + '_hidden_input'}
                  value={value}
                  hidden
                  {...register(label as keyof SendReportInput)}
                />
              </>
            ) : null;
          })}
      </div>
      {actions}
    </form>
  );
};

export default DoctorReportErrorReadOnlyForm;
