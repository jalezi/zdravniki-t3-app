import { clsx } from 'clsx';
import { forwardRef, useId } from 'react';

import styles from './Select.module.css';
import inputStyles from '../../Inputs/Input/Input.module.css';
import InputDescription from '../../Inputs/InputBase/InputDescription';
import InputError from '../../Inputs/InputBase/InputError';
import InputLabel from '../../Inputs/InputBase/InputLabel';
import InputWrapper from '../../Inputs/InputBase/InputWrapper';
import type { SelectBaseProps, SelectBaseRef } from '../SelectBase';
import { SelectBase } from '../SelectBase';

type SelectCustomProps = {
  label: string;
  error?: string;
  description?: string;
  selectWrapperClassName?: string;
  selectLabelClassName?: string;
  selectDescriptionClassName?: string;
  selectErrorClassName?: string;
};

export type SelectProps = SelectBaseProps & SelectCustomProps;

const Select = (
  {
    id,
    label,
    description,
    error,
    selectWrapperClassName,
    selectLabelClassName,
    selectDescriptionClassName,
    selectErrorClassName,
    ...props
  }: SelectProps,
  ref: SelectBaseRef
) => {
  const _id = useId();
  const selectId = id ?? _id;

  const selectWrapperStyles = clsx(
    inputStyles.Input,
    inputStyles.InputWrapper,
    error && inputStyles.InputErrorActive,
    styles.Select,
    selectWrapperClassName
  );
  const selectLabelStyles = clsx(inputStyles.InputLabel, selectLabelClassName);
  const selectDescriptionStyles = clsx(
    inputStyles.InputDescription,
    selectDescriptionClassName
  );
  const selectErrorStyles = clsx(inputStyles.InputError, selectErrorClassName);

  const selectedBaseStyles = clsx(styles.Selected);
  const selectDropdownStyles = clsx(styles.Dropdown);
  const selectDropdownItemStyles = clsx(styles.DropdownItem);

  return (
    <InputWrapper className={selectWrapperStyles}>
      <div>
        <InputLabel
          text={label}
          htmlFor={selectId}
          className={selectLabelStyles}
        />
        <InputDescription
          text={description}
          className={selectDescriptionStyles}
        />
      </div>
      <SelectBase
        ref={ref}
        id={selectId}
        {...props}
        selectedStyle={selectedBaseStyles}
        dropdownStyle={selectDropdownStyles}
        dropdownItemStyle={selectDropdownItemStyles}
      />
      <InputError
        as="label"
        htmlFor={selectId}
        text={error}
        className={selectErrorStyles}
      />
    </InputWrapper>
  );
};

export default forwardRef(Select);
