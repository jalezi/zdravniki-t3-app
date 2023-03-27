import { zodResolver } from '@hookform/resolvers/zod';
import { clsx } from 'clsx';
import { useTranslation } from 'next-i18next';
import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';

import { api } from '@/lib/utils/api';
import type { Doctor, SendReportInput } from '@/server/api/routers/doctors';

import styles from './DoctorReportError.module.css';
import DoctorReportErrorActions from './DoctorReportErrorActions';

type ReportErrorTranslations = {
  cancel: string;
  linkText: string;
  placeholder: {
    accepts: string;
    address: string;
    availability: string;
    email: string;
    note: string;
    orderform: string;
    phone: string;
    website: string;
  };
  reportReceived: string;
  reset: string;
  send: string;
  text: string;
  title: string;
  tooltip: string;
};

const formDataSchema = z.object({
  address: z.string().min(0).max(255),
  websites: z.array(
    z.object({
      website: z.string(),
    })
  ),
  phones: z.array(
    z.object({
      phone: z.string(),
    })
  ),
  email: z.string().email(),
  orderform: z.string(),
  accepts: z.enum(['y', 'n']),
  availability: z.string(),
  note: z.string().min(0).max(255),
});

type FormData = z.infer<typeof formDataSchema>;

type DoctorReportErrorProps = {
  address: Doctor['location']['address']['fullAddress'];
  websites: Doctor['websites'];
  phones: Doctor['phones'];
  email: Doctor['email'];
  orderform: Doctor['orderform'];
  accepts: Doctor['accepts'];
  availability: Doctor['availability'];
  note: Doctor['override']['note'];
  setEdit: (edit: boolean) => void;
};

const DoctorReportError = (props: DoctorReportErrorProps) => {
  const { t } = useTranslation('doctor');
  const reportErrorTranslation: ReportErrorTranslations = t('reportError', {
    returnObjects: true,
  });

  const sendReport = api.doctors.sendReport.useMutation();

  const {
    register,
    reset,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      ...props,
      websites: props.websites.map(website => ({ website })),
      phones: props.phones.map(phone => ({ phone })),
      availability: props.availability.toString(),
    },
    resolver: zodResolver(formDataSchema),
    mode: 'onChange',
  });

  const websiteFields = useFieldArray({
    control,
    name: 'websites',
  });

  const phoneFields = useFieldArray({
    control,
    name: 'phones',
  });

  const onSubmit = handleSubmit((data, e) => {
    if (!e) return;
    e.preventDefault();
    const website = data.websites.map(({ website }) => website).join(',');
    const phone = data.phones.map(({ phone }) => phone).join(',');
    const mutationInput = {
      accepts: data.accepts,
      address: data.address.trim(),
      availability: data.availability.trim(),
      email: data.email.trim(),
      note: data.note.trim(),
      phone: phone.trim(),
      orderform: data.orderform.trim(),
      website: website.trim(),
    } satisfies SendReportInput;

    sendReport.mutate(mutationInput);
    sendReport.data?.success && props.setEdit(false);
  });

  const actions = (
    <DoctorReportErrorActions
      onCancel={() => props.setEdit(false)}
      onReset={reset}
      onResetText={reportErrorTranslation.reset}
      onSubmitText={reportErrorTranslation.send}
      onCancelText={reportErrorTranslation.cancel}
    />
  );

  return (
    <form onSubmit={onSubmit} className={styles.DoctorReportError__form}>
      {actions}
      <div className={styles.DoctorReportError__input_container}>
        <label htmlFor="address">
          {reportErrorTranslation.placeholder.address}
        </label>
        <input
          {...register('address')}
          type="text"
          id="address"
          placeholder={reportErrorTranslation.placeholder.address}
        />
        <p>{errors.address?.message}</p>
      </div>
      {websiteFields.fields.map((field, index, arr) => (
        <div key={field.id}>
          <div className={styles.DoctorReportError__input_container}>
            <label htmlFor={field.id}>
              {reportErrorTranslation.placeholder.website} {index + 1}
            </label>
            <input
              {...register(`websites.${index}.website`)}
              type="text"
              id={field.id}
              placeholder={reportErrorTranslation.placeholder.website}
            />

            <p>{errors.websites?.[`${index}`]?.website?.message}</p>
          </div>
          <div>
            {arr.length !== 1 && (
              <button onClick={() => websiteFields.remove(index)}>-</button>
            )}
            {arr.length - 1 === index && (
              <button onClick={() => websiteFields.append({ website: '' })}>
                +
              </button>
            )}
          </div>
        </div>
      ))}
      {phoneFields.fields.map((field, index, arr) => (
        <div
          key={field.id}
          className={styles.DoctorReportError__field_container}
        >
          <div className={styles.DoctorReportError__input_container}>
            <label htmlFor={field.id}>
              {reportErrorTranslation.placeholder.phone} {index + 1}
            </label>
            <input
              {...register(`phones.${index}.phone`)}
              type="text"
              id={field.id}
              placeholder={reportErrorTranslation.placeholder.phone}
            />

            <p>{errors.phones?.[`${index}`]?.phone?.message}</p>
          </div>
          <div>
            {arr.length !== 1 && (
              <button onClick={() => phoneFields.remove(index)}>-</button>
            )}
            {arr.length - 1 === index && (
              <button onClick={() => phoneFields.append({ phone: '' })}>
                +
              </button>
            )}
          </div>
        </div>
      ))}
      <div className={styles.DoctorReportError__input_container}>
        <label htmlFor="email">
          {reportErrorTranslation.placeholder.email}
        </label>
        <input
          {...register('email')}
          type="text"
          id="address"
          placeholder={reportErrorTranslation.placeholder.email}
        />
        <p>{errors.email?.message}</p>
      </div>
      <div className={styles.DoctorReportError__input_container}>
        <label htmlFor="orderform">
          {reportErrorTranslation.placeholder.orderform}
        </label>
        <input
          {...register('orderform')}
          type="text"
          id="orderform"
          placeholder={reportErrorTranslation.placeholder.orderform}
        />
        <p>{errors.orderform?.message}</p>
      </div>
      <div
        className={clsx(styles.DoctorReportError__input_container, styles.Row)}
      >
        <div
          className={clsx(
            styles.DoctorReportError__input_container,
            styles.Row
          )}
        >
          <label htmlFor="accepts">
            {reportErrorTranslation.placeholder.accepts}
          </label>
          <select {...register('accepts')} id="accepts">
            <option value="y">Yes</option>
            <option value="n">No</option>
          </select>
          <p>{errors.accepts?.message}</p>
        </div>
        <div
          className={clsx(
            styles.DoctorReportError__input_container,
            styles.Row
          )}
        >
          <label htmlFor="availability">
            {reportErrorTranslation.placeholder.availability}
          </label>
          <input
            {...register('availability')}
            inputMode="decimal"
            id="availability"
            placeholder="0.0"
          />
          <p>{errors.availability?.message}</p>
        </div>
      </div>

      <div className={styles.DoctorReportError__input_container}>
        <label htmlFor="note">{reportErrorTranslation.placeholder.note}</label>
        <textarea
          {...register('note')}
          id="note"
          placeholder={reportErrorTranslation.placeholder.note}
        />
        <p>{errors.note?.message}</p>
      </div>
      {actions}
    </form>
  );
};

export default DoctorReportError;
