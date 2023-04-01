import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'next-i18next';
import { useEffect } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';

import {
  EmailSvg,
  LinkSvg,
  MapMarkerSvg,
  PhoneSvg,
} from '@/components/Shared/Icons';
import { Input } from '@/components/Shared/Inputs/Input';
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
  websites: z
    .array(
      z.object({
        website: z.string(),
      })
    )
    .nonempty(),
  phones: z
    .array(
      z.object({
        phone: z.string(),
      })
    )
    .nonempty(),
  email: z.string(),
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
  onEditDone: () => void;
};

const DoctorReportError = ({
  onEditDone,
  ...props
}: DoctorReportErrorProps) => {
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

  const { isSuccess } = sendReport;
  useEffect(() => {
    if (isSuccess) {
      onEditDone();
    }
  }, [isSuccess, onEditDone]);

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
  });

  const actions = (
    <DoctorReportErrorActions
      onCancel={() => onEditDone()}
      onReset={() => reset()}
      onResetText={reportErrorTranslation.reset}
      onSubmitText={reportErrorTranslation.send}
      onCancelText={reportErrorTranslation.cancel}
    />
  );

  return (
    <form
      onSubmit={onSubmit}
      className={styles.DoctorReportError__form}
      autoComplete="off"
    >
      {actions}
      <Input
        {...register('address')}
        type="text"
        id="address"
        placeholder={reportErrorTranslation.placeholder.address}
        icon={<MapMarkerSvg />}
        label={reportErrorTranslation.placeholder.address}
      />

      <fieldset>
        <legend>Websites</legend>
        {websiteFields.fields.map((field, index, arr) => (
          <div key={field.id}>
            <Input
              {...register(`websites.${index}.website`)}
              type="text"
              id={field.id}
              placeholder={reportErrorTranslation.placeholder.website}
              inputMode="url"
              icon={<LinkSvg />}
              label={reportErrorTranslation.placeholder.website}
              error={errors.websites?.[`${index}`]?.website?.message}
            />
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
      </fieldset>
      <fieldset>
        <legend>Phones</legend>
        {phoneFields.fields.map((field, index, arr) => (
          <div key={field.id}>
            <Input
              {...register(`phones.${index}.phone`)}
              type="text"
              id={field.id}
              placeholder={reportErrorTranslation.placeholder.phone}
              inputMode="tel"
              icon={<PhoneSvg />}
              label={`${reportErrorTranslation.placeholder.phone} ${index + 1}`}
              error={errors.phones?.[`${index}`]?.phone?.message}
            />
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
      </fieldset>
      <Input
        {...register('email')}
        type="text"
        id="email"
        placeholder={reportErrorTranslation.placeholder.email}
        inputMode="email"
        icon={<EmailSvg />}
        label={reportErrorTranslation.placeholder.email}
        error={errors.email?.message}
      />
      <Input
        {...register('orderform')}
        type="text"
        id="orderform"
        placeholder={reportErrorTranslation.placeholder.orderform}
        icon={<LinkSvg />}
        label={reportErrorTranslation.placeholder.orderform}
        error={errors.orderform?.message}
      />
      <div>
        <div>
          <label htmlFor="accepts">
            {reportErrorTranslation.placeholder.accepts}
          </label>
          <select {...register('accepts')} id="accepts">
            <option value="y">Yes</option>
            <option value="n">No</option>
          </select>
          <p>{errors.accepts?.message}</p>
        </div>
        <Input
          {...register('availability')}
          inputMode="decimal"
          id="availability"
          placeholder="0.0"
          label={reportErrorTranslation.placeholder.availability}
          error={errors.availability?.message}
        />
      </div>

      <div>
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
