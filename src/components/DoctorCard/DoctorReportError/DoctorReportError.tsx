import { zodResolver } from '@hookform/resolvers/zod';
import { clsx } from 'clsx';
import { useTranslation } from 'next-i18next';
import { useEffect, useRef, useState } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';

import { Chip } from '@/components/Shared/Chip';
import {
  EmailSvg,
  LinkSvg,
  MapMarkerSvg,
  PhoneSvg,
} from '@/components/Shared/Icons';
import { Input } from '@/components/Shared/Inputs/Input';
import { Select } from '@/components/Shared/Selects/Select';
import type { SendReportInput } from '@/server/api/routers/doctors';

import { AddRemoveField } from './AddRemoveField';
import styles from './DoctorReportError.module.css';
import DoctorReportErrorActions from './DoctorReportErrorActions';
import DoctorReportErrorReadOnlyForm from './DoctorReportErrorReadOnlyForm';
import type { DoctorReportErrorProps, FormData } from './types';
import { NOTE_LENGTH_LIMIT, formDataSchema } from './types';
import useDoctorReportErrorTranslations from './useDoctorReportErrorTranslations';

const DoctorReportError = ({
  onEditDone,
  ...props
}: DoctorReportErrorProps) => {
  // translations
  const { t } = useTranslation('common');
  const {
    yes,
    no,
    buttons: buttonTranslations,
    groups: groupTranslations,
    inputs: inputTranslations,
  } = useDoctorReportErrorTranslations();

  // ref and state
  const noteRef = useRef<HTMLTextAreaElement | HTMLInputElement | null>(null);
  const [noteLength, setNoteLength] = useState<number>(
    noteRef.current?.value.length ?? 0
  );
  const [dataToSend, setDataToSend] = useState<SendReportInput | null>(null);

  // react-hook-form
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
  const { ref: reactHookNoteRef, ...noteProps } = register('note');
  const websiteFields = useFieldArray({
    control,
    name: 'websites',
  });

  const phoneFields = useFieldArray({
    control,
    name: 'phones',
  });

  // adjust note height
  useEffect(() => {
    const textArea = noteRef.current;
    if (!textArea) return;
    const setHeight = () => {
      textArea.style.height = 'auto';
      textArea.style.height = `${textArea.scrollHeight}px`;
      setNoteLength(textArea.value.length);
    };
    textArea.addEventListener('input', setHeight);

    return () => {
      textArea.removeEventListener('input', setHeight);
    };
  }, []);

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

    setDataToSend(mutationInput);
  });

  const actions = (
    <DoctorReportErrorActions
      onCancel={() => onEditDone()}
      onReset={() => reset()}
      onResetText={buttonTranslations.reset}
      onSubmitText={buttonTranslations.send}
      onCancelText={buttonTranslations.cancel}
    />
  );

  const formStyles = clsx(
    styles.DoctorReportError__form,
    !dataToSend && styles.Show,
    dataToSend && styles.HideForm
  );

  return (
    <>
      <form onSubmit={onSubmit} className={formStyles} autoComplete="off">
        {actions}
        <Input
          {...register('address')}
          type="text"
          id="address"
          placeholder={inputTranslations.address.placeholder}
          icon={<MapMarkerSvg />}
          label={inputTranslations.address.placeholder}
          error={
            errors.address?.message
              ? inputTranslations.address.message
              : undefined
          }
        />

        <fieldset
          className={clsx(
            styles.FormGroup__fieldset,
            styles.FormGroup__full_width
          )}
        >
          <legend className={styles.FormGroup__legend}>
            <Chip
              size="sm"
              iconName="LinkSvg"
              text={groupTranslations.websites}
              className={styles.FormGroup__chip}
            />
          </legend>
          {websiteFields.fields.map((field, index, arr) => (
            <div
              key={field.id}
              className={clsx(
                styles.FormGroup__field,
                styles.FormGroup__full_width
              )}
            >
              <Input
                {...register(`websites.${index}.website`)}
                type="text"
                id={field.id}
                placeholder={inputTranslations.website.placeholder}
                inputMode="url"
                icon={<LinkSvg />}
                label={`${inputTranslations.website.label} ${index + 1}`}
                error={errors.websites?.[`${index}`]?.website?.message}
              />
              <AddRemoveField
                hasRemove={arr.length !== 1}
                hasAdd={arr.length - 1 === index}
                onRemove={() => websiteFields.remove(index)}
                onAdd={() => websiteFields.append({ website: '' })}
              />
            </div>
          ))}
        </fieldset>
        <fieldset className={styles.FormGroup__fieldset}>
          <legend className={styles.FormGroup__legend}>
            <Chip
              size="sm"
              iconName="PhoneSvg"
              text={groupTranslations.phones}
              className={styles.FormGroup__chip}
            />
          </legend>
          {phoneFields.fields.map((field, index, arr) => (
            <div key={field.id} className={clsx(styles.FormGroup__field)}>
              <Input
                {...register(`phones.${index}.phone`)}
                type="text"
                id={field.id}
                placeholder={inputTranslations.phone.placeholder}
                inputMode="tel"
                icon={<PhoneSvg />}
                label={`${inputTranslations.phone.label} ${index + 1}`}
                error={errors.phones?.[`${index}`]?.phone?.message}
              />
              <AddRemoveField
                hasRemove={arr.length !== 1}
                hasAdd={arr.length - 1 === index}
                onRemove={() => phoneFields.remove(index)}
                onAdd={() => phoneFields.append({ phone: '' })}
              />
            </div>
          ))}
        </fieldset>
        <Input
          {...register('email')}
          type="text"
          id="email"
          placeholder={inputTranslations.email.placeholder}
          inputMode="email"
          icon={<EmailSvg />}
          label={inputTranslations.email.label}
          error={errors.email?.message}
        />
        <Input
          {...register('orderform')}
          type="text"
          id="orderform"
          placeholder={inputTranslations.orderform.placeholder}
          icon={<LinkSvg />}
          label={inputTranslations.orderform.label}
          error={errors.orderform?.message}
        />
        <div className={styles.FormGroup__accepts_and_availability}>
          <Controller
            name="accepts"
            control={control}
            render={({ field }) => (
              <Select
                label={inputTranslations.accepts.label}
                error={errors.accepts?.message}
                {...field}
                options={[
                  { value: 'y', label: yes, valueToShow: yes },
                  { value: 'n', label: no, valueToShow: no },
                ]}
                id="accepts"
              />
            )}
          />
          <Input
            {...register('availability')}
            inputMode="decimal"
            id="availability"
            placeholder="0.0"
            label={inputTranslations.availability.label}
            error={errors.availability?.message}
          />
        </div>

        <Input
          as="textarea"
          {...noteProps}
          ref={e => {
            reactHookNoteRef(e);
            noteRef.current = e;
          }}
          id="note"
          label={inputTranslations.note.label}
          placeholder={inputTranslations.note.placeholder}
          error={
            errors.note?.message ? inputTranslations.note.message : undefined
          }
          description={`${inputTranslations.note.description} (max: ${t(
            'chars.charsWithCount',
            { count: NOTE_LENGTH_LIMIT }
          )})`}
          data-limit-remain={NOTE_LENGTH_LIMIT - noteLength}
        />
        {actions}
      </form>
      <DoctorReportErrorReadOnlyForm
        data={dataToSend}
        initialData={{
          address: props.address,
          accepts: props.accepts,
          availability: props.availability.toString(),
          email: props.email,
          note: props.note,
          orderform: props.orderform,
          phone: props.phones.join(', '),
          website: props.websites.join(', '),
        }}
        back={() => setDataToSend(null)}
        onEditDone={onEditDone}
      />
    </>
  );
};

export default DoctorReportError;
