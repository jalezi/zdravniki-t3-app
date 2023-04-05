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
  inputWrapperClassName?: string;
  inputLabelClassName?: string;
  inputDescriptionClassName?: string;
  inputErrorClassName?: string;
};
export type InputProps = InputBaseProps & InputCustomProps;

const Input = (
  {
    inputLabelClassName,
    inputWrapperClassName,
    inputDescriptionClassName,
    inputErrorClassName,
    id,
    description,
    error,
    label,
    ...props
  }: InputProps,
  ref: Ref<HTMLInputElement | HTMLTextAreaElement>
) => {
  const _id = useId();
  const inputId = id ?? _id;

  const inputWrapperStyles = clsx(
    styles.Input,
    styles.InputWrapper,
    error && styles.InputErrorActive,
    inputWrapperClassName
  );
  const inputLabelStyles = clsx(styles.InputLabel, inputLabelClassName);
  const inputDescriptionStyles = clsx(
    styles.InputDescription,
    inputDescriptionClassName
  );
  const inputStyles = clsx(styles.InputBase);
  const inputErrorStyles = clsx(styles.InputError, inputErrorClassName);

  return (
    <InputBase.Wrapper className={inputWrapperStyles}>
      <div>
        <InputBase.Label
          htmlFor={inputId}
          text={label}
          className={inputLabelStyles}
        />
        <InputBase.Description
          text={description}
          className={inputDescriptionStyles}
        />
      </div>
      <InputBase.Input
        ref={ref}
        id={inputId}
        aria-invalid={!!error}
        className={inputStyles}
        {...props}
      />
      <InputBase.Error
        as="label"
        htmlFor={inputId}
        text={error}
        className={inputErrorStyles}
      />
    </InputBase.Wrapper>
  );
};

export default forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>(
  Input
);
