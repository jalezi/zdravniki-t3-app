import { clsx } from 'clsx';
import Link from 'next/link';
import { useRef } from 'react';

import type { PolymorphicComponentProps } from '@/components/Shared/Polymorphic';
import { Polymorphic } from '@/components/Shared/Polymorphic';

import styles from './ComponentsMDX.module.css';

type DataTermProps = { text: string; term: string; linkId: string } & Omit<
  PolymorphicComponentProps<'span'>,
  'as'
>;

const DataTerm = ({ text, term, className, ...props }: DataTermProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const dataTermStyles = clsx(styles.ComponentsMDX, styles.DataTerm, className);

  const onClick = () => {
    const element = document.getElementById(`${term}`);
    if (element) {
      if ('open' in element && element.open === false) {
        element.open = true;
      }
      props.id && element.setAttribute('data-back', props.id);
      element.scrollIntoView();
    }
  };

  return (
    <Link href={`#${term}`} replace onClick={onClick}>
      <Polymorphic ref={ref} as="span" className={dataTermStyles} {...props}>
        {text}
      </Polymorphic>
    </Link>
  );
};

export default DataTerm;
