import { clsx } from 'clsx';
import type { Ref } from 'react';
import { forwardRef } from 'react';

import { Polymorphic } from '@/components/Shared/Polymorphic';

import styles from './Button.module.css';
import type { ButtonInternalProps } from './Button.types';

type ButtonProps = ButtonInternalProps & {
  container?: 'span' | 'div';
};

type ButtonComponent = (
  { as, children, container, ...polymorphicProps }: ButtonProps,
  ref?: Ref<HTMLElement>
) => React.ReactElement | null;

const Button: ButtonComponent = (
  { children, container, ...polymorphicProps }: ButtonProps,
  ref?: Ref<HTMLElement>
) => {
  const as = polymorphicProps.as || 'button';

  // ? not sure if this is needed
  delete polymorphicProps.ref;

  const { className, ...restProps } = polymorphicProps;

  const componentStyles = clsx(styles.Button, className);

  const iconContainerStyles = clsx(styles.Button__container);

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
