import { clsx } from 'clsx';
import type { Ref } from 'react';
import { forwardRef } from 'react';

import { Polymorphic } from '@/components/Shared/Polymorphic';

import styles from './IconButton.module.css';
import type { InternalIconButtonProps } from './IconButton.types';

type IconButtonComponent = (
  { as = 'button', children, ...polymorphicProps }: InternalIconButtonProps,
  ref?: Ref<HTMLElement>
) => React.ReactElement | null;

const IconButton: IconButtonComponent = (
  { children, ...polymorphicProps }: InternalIconButtonProps,
  ref?: Ref<HTMLElement>
) => {
  const as = polymorphicProps.as || 'button';

  // ? not sure if this is needed
  delete polymorphicProps.ref;

  const { className, ...restProps } = polymorphicProps;

  const componentStyles = clsx(styles.IconButton, className);

  const iconContainerStyles = clsx(styles.IconContainer);

  return (
    <Polymorphic ref={ref} as={as} className={componentStyles} {...restProps}>
      <span className={iconContainerStyles}>{children}</span>
    </Polymorphic>
  );
};

export default forwardRef<HTMLElement, InternalIconButtonProps>(IconButton);
