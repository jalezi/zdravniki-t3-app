import { clsx } from 'clsx';
import type { ReactNode, Ref } from 'react';
import { forwardRef } from 'react';
import { z } from 'zod';

import { Polymorphic } from '@/components/Shared/Polymorphic';
import type { PolymorphicComponentPropsWithRef } from '@/components/Shared/Polymorphic';

import styles from './InputBase.module.css';
import InputBaseWrapper from './InputBaseWrapper';

const sizeSchema = z.enum(['xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl']);
type Size = z.infer<typeof sizeSchema>;

const weightSchema = z.enum(['regular', 'semibold', 'bold', 'extrabold']);
type Weight = z.infer<typeof weightSchema>;

const SIZE_STYLES = {
  xxs: styles.XXSmall,
  xs: styles.XSmall,
  sm: styles.Small,
  md: styles.Medium,
  lg: styles.Large,
  xl: styles.XLarge,
  xxl: styles.XXLarge,
} satisfies Record<Size, string | undefined>;

const WEIGHT_STYLES = {
  regular: styles.Regular,
  semibold: styles.SemiBold,
  bold: styles.Bold,
  extrabold: styles.ExtraBold,
} satisfies Record<Weight, string | undefined>;

export type InputBaseCustomProps = {
  icon?: ReactNode;
  size?: Size;
  weight?: Weight;
};

export type InputBaseProps = Omit<
  PolymorphicComponentPropsWithRef<'input'>,
  'as' | keyof InputBaseCustomProps
> &
  InputBaseCustomProps;

const InputBase = (
  {
    className,
    icon,
    size = 'md',
    weight = 'regular',
    ...props
  }: InputBaseProps,
  ref: Ref<HTMLInputElement>
) => {
  const validSize = sizeSchema.safeParse(size);
  const validWeight = weightSchema.safeParse(weight);

  const sizeStyles = SIZE_STYLES[`${validSize.success ? size : 'sm'}`];
  const weightStyles =
    WEIGHT_STYLES[`${validWeight.success ? weight : 'regular'}`];

  const inputBaseWrapperStyles = clsx(
    styles.InputBase,
    sizeStyles,
    weightStyles,
    className
  );

  return (
    <InputBaseWrapper className={inputBaseWrapperStyles}>
      {icon && (
        <label htmlFor={props.id} className={styles.InputBase__label_icon}>
          {icon}
        </label>
      )}
      <Polymorphic ref={ref} as="input" {...props} />
    </InputBaseWrapper>
  );
};

export default forwardRef<HTMLInputElement, InputBaseProps>(InputBase);
