import { clsx } from 'clsx';
import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useOnClickOutside } from 'usehooks-ts';

import useKeyboardNavigation from '@/lib/hooks/useKeyboardNavigation';

import styles from './Select.module.css';
import { CaretDownSvg, CaretUpSvg } from '../Icons';

type Option = {
  label?: string;
  value: string;
};

export type SelectProps = {
  placeholder?: string;
  value?: string;
  options: Option[];
  onChange?: (value: string) => void;
  name: string;
  position?:
    | 'top-left'
    | 'top-right'
    | 'top-center'
    | 'bottom-left'
    | 'bottom-right'
    | 'bottom-center';
  selectedStyle?: string;
  dropdownStyle?: string;
  dropdownItemStyle?: string;
};

export type SelectRefProps = {
  selectedOption: string;
  refs: Record<string, React.RefObject<HTMLElement>>;
  value: string;
};

export type SelectRef = React.Ref<SelectRefProps>;

const OptionsPositionClassName = {
  ['top-left']: clsx(styles.Top, styles.Left),
  ['top-right']: clsx(styles.Top, styles.Right),
  ['top-center']: clsx(styles.Top, styles.Center),
  ['bottom-left']: clsx(styles.Bottom, styles.Left),
  ['bottom-center']: clsx(styles.Bottom, styles.Center),
  ['bottom-right']: clsx(styles.Bottom, styles.Right),
} as const;

const Select = (
  {
    options,
    value,
    onChange,
    placeholder = 'Select an option',
    name,
    position = 'bottom-right',
    selectedStyle,
    dropdownStyle,
    dropdownItemStyle,
  }: SelectProps,
  ref: SelectRef
) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const selectWrapperRef = useRef<HTMLDivElement>(null);
  const selectRef = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<HTMLUListElement>(null);
  const selectedOption = useRef(value || placeholder);

  const isOptionSelected =
    selectedOption.current === placeholder ? false : true;

  const internalOptions = useMemo(
    () =>
      options.map(option => ({
        ...option,
        label: option.label || option.value,
      })),
    [options]
  );

  useImperativeHandle(ref, () => ({
    selectedOption: selectedOption.current,
    refs: { selectWrapperRef, selectRef, optionsRef },
    value: isOptionSelected ? selectedOption.current : '',
  }));

  useOnClickOutside(selectWrapperRef, () => setIsOpen(false));

  const handleSelectClick = useCallback(() => setIsOpen(false), []);
  useKeyboardNavigation(isOpen, handleSelectClick, optionsRef);

  const onToggle = () => setIsOpen(prev => !prev);

  const handleOptionClick = (option: string) => {
    selectedOption.current = option;
    setIsOpen(false);
    selectRef.current?.focus();
    onChange?.(option);
  };

  if (isOpen) {
    optionsRef.current?.focus();
  }

  const selectedStyles = clsx(styles.SelectedOption, selectedStyle);

  const optionsStyles = clsx(
    styles.OptionsList,
    OptionsPositionClassName[`${position}`],
    dropdownStyle
  );

  const optionStyles = clsx(styles.Option, dropdownItemStyle);

  return (
    <div
      ref={selectWrapperRef}
      className={styles.Select}
      data-select-value={selectedOption.current}
      translate="no"
    >
      <div
        ref={selectRef}
        className={selectedStyles}
        role="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={onToggle}
        tabIndex={0}
        onKeyDown={e => {
          if (e.key === 'Enter' || e.key === ' ') {
            onToggle();
          }
        }}
        data-value-selected={isOptionSelected}
        data-value={isOptionSelected ? selectedOption.current : ''}
        data-name={name}
      >
        <span>{selectedOption.current}</span>
        <span className="sr-only">{placeholder}</span>
        <span className={styles.Caret} aria-hidden="true">
          {isOpen ? <CaretUpSvg /> : <CaretDownSvg />}
        </span>
      </div>
      {isOpen ? (
        <ul
          ref={optionsRef}
          className={optionsStyles}
          role="listbox"
          tabIndex={-1}
        >
          {internalOptions.map(option => (
            <li
              key={option.value}
              className={optionStyles}
              role="option"
              aria-selected={option.value === selectedOption.current}
              onClick={() => handleOptionClick(option.value)}
              tabIndex={isOpen ? 0 : -1}
              data-keep-focus="true"
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleOptionClick(option.value);
                }
              }}
            >
              {option.label}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

export default forwardRef(Select);
