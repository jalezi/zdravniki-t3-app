import { clsx } from 'clsx';

import type { PolymorphicComponentProps } from '@/components/Shared/Polymorphic';
import { Polymorphic } from '@/components/Shared/Polymorphic';

import styles from './InputBaseWrapper.module.css';

type InputBaseWrapperProps = Omit<PolymorphicComponentProps<'div'>, 'as'>;

const InputBaseWrapper = ({
  children,
  className,
  ...props
}: InputBaseWrapperProps) => {
  const inputBaseWrapperStyles = clsx(styles.InputBaseWrapper, className);

  return (
    <Polymorphic as="div" className={inputBaseWrapperStyles} {...props}>
      {children}
    </Polymorphic>
  );
};

export default InputBaseWrapper;
