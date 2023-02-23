/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { clsx } from 'clsx';
import type { Ref } from 'react';
import { forwardRef } from 'react';

import type { ButtonInternalProps } from '@/lib/types/Buttons';

import styles from './FilterButton.module.css';
import { Button } from '../../../../Shared/Buttons/Button';

type Props = ButtonInternalProps & {
  Icon?: any;
  text: string;
  isActive?: boolean;
};

type FilterButtonComponent = (
  { Icon, text, isActive, ...ploymorphicPros }: Props,
  ref: Ref<HTMLElement>
) => React.ReactElement | null;

const FilterButton: FilterButtonComponent = (
  { Icon, text, isActive, ...props }: Props,
  ref: Ref<HTMLElement>
) => {
  const { className, ...rest } = props;

  const combinedStyles = clsx(
    className,
    styles.FilterButton,
    Boolean(Icon) && styles.FilterButton__withIcon,
    isActive && styles.FilterButton__active
  );

  const iconStyles = clsx(
    styles.FilterButton__icon,
    isActive && styles.FilterButton__icon__active
  );

  const textStyles = clsx(
    styles.FilterButton__text,
    isActive && styles.FilterButton__text__active
  );

  return (
    <Button ref={ref} className={combinedStyles} {...rest}>
      {Icon ? (
        <span className={iconStyles}>
          <Icon />
        </span>
      ) : null}
      <span className={textStyles}>{text}</span>
    </Button>
  );
};

export default forwardRef<HTMLElement, Props>(FilterButton);
