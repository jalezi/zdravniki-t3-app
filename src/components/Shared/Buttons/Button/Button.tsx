import { clsx } from 'clsx';
import type { Ref } from 'react';
import { forwardRef } from 'react';

import { Polymorphic } from '@/components/Shared/Polymorphic';

import styles from './Button.module.css';
import type { InternalButtonProps } from './Button.types';

type ButtonComponent = (
  { as = 'button', children, ...polymorphicProps }: InternalButtonProps,
  ref?: Ref<HTMLElement>
) => React.ReactElement | null;

const Button: ButtonComponent = (
  { children, ...polymorphicProps }: InternalButtonProps,
  ref?: Ref<HTMLElement>
) => {
  const as = polymorphicProps.as || 'button';

  // ? not sure if this is needed
  delete polymorphicProps.ref;

  const { className, ...restProps } = polymorphicProps;

  const componentStyles = clsx(styles.Button, className);

  const iconContainerStyles = clsx(styles.Container);

  return (
    <Polymorphic ref={ref} as={as} className={componentStyles} {...restProps}>
      <span className={iconContainerStyles}>{children}</span>
    </Polymorphic>
  );
};

export default forwardRef<HTMLElement, InternalButtonProps>(Button);
