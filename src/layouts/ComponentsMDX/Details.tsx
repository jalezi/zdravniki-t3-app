import { clsx } from 'clsx';
import type { ReactNode } from 'react';
import { useRef } from 'react';

import type { PolymorphicComponentProps } from '@/components/Shared/Polymorphic';
import { Polymorphic } from '@/components/Shared/Polymorphic';

import styles from './ComponentsMDX.module.css';

type DetailsProps = { summaryText: ReactNode } & Omit<
  PolymorphicComponentProps<'details'>,
  'as'
>;

const Details = ({
  children,
  className,
  summaryText,
  ...props
}: DetailsProps) => {
  const ref = useRef<HTMLDetailsElement>(null);
  const detailsStyles = clsx(styles.ComponentsMDX, styles.Details, className);

  return (
    <Polymorphic ref={ref} as="details" className={detailsStyles} {...props}>
      <summary className={styles.Summary}>{summaryText}</summary>
      {children}
    </Polymorphic>
  );
};

export default Details;
