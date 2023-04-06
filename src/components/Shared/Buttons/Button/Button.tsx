import { clsx } from 'clsx';
import type { Ref } from 'react';
import { forwardRef } from 'react';
import { z } from 'zod';

import { Polymorphic } from '@/components/Shared/Polymorphic';

import styles from './Button.module.css';
import type { ButtonInternalProps } from './Button.types';

const sizeSchema = z.enum(['xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl']);
type Size = z.infer<typeof sizeSchema>;

const SIZE_STYLES = {
  xxs: styles.XXSmall__font,
  xs: styles.XSmall__font,
  sm: styles.Small__font,
  md: styles.Medium__font,
  lg: styles.Large__font,
  xl: styles.XLarge__font,
  xxl: styles.XXLarge__font,
} satisfies Record<Size, string | undefined>;

const RADIUS_STYLES = {
  xxs: styles.XXSmall__radius,
  xs: styles.XSmall__radius,
  sm: styles.Small__radius,
  md: styles.Medium__radius,
  lg: styles.Large__radius,
  xl: styles.XLarge__radius,
  xxl: styles.XXLarge__radius,
} satisfies Record<Size, string | undefined>;

type ButtonProps = ButtonInternalProps & {
  container?: 'span' | 'div';
  containerClassName?: string;
  size?: Size;
  radius?: Size;
};

type ButtonComponent = (
  {
    as,
    children,
    container,
    containerClassName,
    size,
    radius,
    ...polymorphicProps
  }: ButtonProps,
  ref?: Ref<HTMLElement>
) => React.ReactElement | null;

const Button: ButtonComponent = (
  {
    children,
    container,
    containerClassName,
    size = 'md',
    radius = 'md',
    ...polymorphicProps
  }: ButtonProps,
  ref?: Ref<HTMLElement>
) => {
  const as = polymorphicProps.as || 'button';

  // ? not sure if this is needed
  delete polymorphicProps.ref;

  const validSize = sizeSchema.safeParse(size);
  const validRadius = sizeSchema.safeParse(radius);

  const sizeStyles = SIZE_STYLES[`${validSize.success ? size : 'md'}`];
  const radiusStyles = RADIUS_STYLES[`${validRadius.success ? radius : 'md'}`];

  const { className, ...restProps } = polymorphicProps;

  const componentStyles = clsx(
    styles.Button,
    sizeStyles,
    radiusStyles,
    className
  );

  const iconContainerStyles = clsx(
    styles.Button__container,
    containerClassName
  );

  return (
    <Polymorphic ref={ref} as={as} className={componentStyles} {...restProps}>
      {container ? (
        <Polymorphic as={container} className={iconContainerStyles}>
          {children}
        </Polymorphic>
      ) : (
        children
      )}
    </Polymorphic>
  );
};

export default forwardRef<HTMLElement, ButtonProps>(Button);
