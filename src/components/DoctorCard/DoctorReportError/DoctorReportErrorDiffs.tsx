import { clsx } from 'clsx';
import type { UseFormRegister } from 'react-hook-form';

import { Chip } from '@/components/Shared/Chip';
import type { IconName } from '@/components/Shared/Icons';
import { Typography } from '@/components/Shared/Typography';
import type { SendReportInputUserNotNull } from '@/server/api/routers/doctors';

import styles from './DoctorReportError.module.css';
import useDoctorReportErrorTranslations from './useDoctorReportErrorTranslations';

const INPUT_ICONS_MAP = {
  address: 'MapMarkerSvg',
  email: 'EmailSvg',
  orderform: 'LinkSvg',
  note: undefined,
  website: 'LinkSvg',
  accepts: undefined,
  phone: 'PhoneSvg',
} satisfies Record<keyof SendReportInputUserNotNull, IconName | undefined>;

type DoctorReportErrorDiffsProps = {
  data: SendReportInputUserNotNull;
  initialData: SendReportInputUserNotNull;
  register: UseFormRegister<SendReportInputUserNotNull>;
};

function DoctorReportErrosDiffs({
  data,
  initialData,
  register,
}: DoctorReportErrorDiffsProps) {
  const {
    yes,
    no,
    inputs: inputTranslations,
  } = useDoctorReportErrorTranslations();
  const diffs = Object.entries(data).map(([label, value]) => {
    const _label = label as keyof SendReportInputUserNotNull;
    const iconName = INPUT_ICONS_MAP[`${_label}`];

    const _value = _label === 'accepts' ? (value === 'y' ? yes : no) : value;

    const initialValue = initialData[`${_label}`];
    const _initialValue =
      _label === 'accepts' ? (initialValue === 'y' ? yes : no) : initialValue;
    const isChanged = value !== initialValue;

    // if I dont't wrap in div, react complains about missing key
    return isChanged ? (
      <div key={label}>
        <div className={styles.FormGroup__values}>
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
          value={value}
          hidden
          {...register(label as keyof SendReportInputUserNotNull)}
        />
      </div>
    ) : null;
  });
  return <>{diffs}</>;
}

export default DoctorReportErrosDiffs;
