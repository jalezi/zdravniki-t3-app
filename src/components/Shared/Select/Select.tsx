import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { useOnClickOutside } from 'usehooks-ts';

import useKeyboardNavigation from '@/hooks/useKeyboardNavigation';

import styles from './Select.module.css';
import { CaretDown, CaretUp } from '../Icons';

type SelectProps = {
  placeholder?: string;
  value?: string;
  options: string[];
  onChange?: (value: string) => void;
  name: string;
};

export type RefProps = {
  selectedOption: string;
  refs: Record<string, React.RefObject<HTMLElement>>;
  value: string;
};

export type SelectRef = React.Ref<RefProps>;

const Select = (
  {
    options,
    value,
    onChange,
    placeholder = 'Select an option',
    name,
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

  return (
    <div
      ref={selectWrapperRef}
      className={styles.Select}
      data-select-value={selectedOption.current}
    >
      <div
        ref={selectRef}
        className={styles.SelectedOption}
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
          {isOpen ? (
            <CaretUp title="Close dropdown" />
          ) : (
            <CaretDown title="Open dropdown" />
          )}
        </span>
      </div>
      {isOpen ? (
        <ul
          ref={optionsRef}
          className={styles.OptionsList}
          role="listbox"
          tabIndex={-1}
        >
          {options.map(option => (
            <li
              key={option}
              className={styles.Option}
              role="option"
              aria-selected={option === selectedOption.current}
              onClick={() => handleOptionClick(option)}
              tabIndex={isOpen ? 0 : -1}
              data-keep-focus="true"
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleOptionClick(option);
                }
              }}
            >
              {option}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

export default forwardRef(Select);
