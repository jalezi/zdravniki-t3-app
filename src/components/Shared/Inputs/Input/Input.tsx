import { clsx } from 'clsx';
import type { Ref } from 'react';
import { forwardRef, useId } from 'react';

import styles from './Input.module.css';
import { InputBase } from '../InputBase';
import type { InputBaseProps } from '../InputBase';

export type InputCustomProps = {
  label: string;
  error?: string;
  description?: string;
};
export type InputProps = InputBaseProps & InputCustomProps;

const Input = (
  { className, id, description, error, label, ...props }: InputProps,
  ref: Ref<HTMLInputElement>
) => {
  const _id = useId();
  const inputId = id ?? _id;
  const inputWrapperStyles = clsx(
    styles.Input,
    styles.InputWrapper,
    error && styles.InputErrorActive,
    className
  );

  const inputDescriptionStyles = clsx(styles.InputDescription);
  const inputErrorStyles = clsx(styles.InputError);

  return (
    <div className={inputWrapperStyles}>
      <label htmlFor={inputId}>{label}</label>
      {description && <p className={inputDescriptionStyles}>{description}</p>}
      <InputBase ref={ref} id={inputId} aria-invalid={!!error} {...props} />
      <label htmlFor={inputId} className={inputErrorStyles}>
        {error}
      </label>
    </div>
  );
};

export default forwardRef<HTMLInputElement, InputProps>(Input);
