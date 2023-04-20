import { clsx } from 'clsx';

import type { PolymorphicComponentProps } from '@/components/Shared/Polymorphic';
import { Polymorphic } from '@/components/Shared/Polymorphic';

import styles from './SkipLink.module.css';

type SkipLinkProps = Omit<PolymorphicComponentProps<'a'>, 'as'>;

const SkipLink = ({ children, className, ...props }: SkipLinkProps) => {
  const skipLinkStyles = clsx(styles.SkipLink, className);
  return (
    <Polymorphic as="a" className={skipLinkStyles} {...props}>
      {children}
    </Polymorphic>
  );
};

export default SkipLink;
