import { clsx } from 'clsx';
import { useRef } from 'react';

import type { PolymorphicComponentProps } from '@/components/Shared/Polymorphic';
import { Polymorphic } from '@/components/Shared/Polymorphic';

import styles from './ComponentsMDX.module.css';

type DataTermProps = { text: string; term: string } & Omit<
  PolymorphicComponentProps<'span'>,
  'as'
>;

const DataTerm = ({ text, term, className, ...props }: DataTermProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const dataTermStyles = clsx(styles.ComponentsMDX, styles.DataTerm, className);

  const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById(`data-term-${term}`);
    if (element) {
      if ('open' in element && element.open === false) {
        element.open = true;
      }
      element.scrollIntoView();
    }
  };

  return (
    <a href={`#${term}`} onClick={onClick}>
      <Polymorphic ref={ref} as="span" className={dataTermStyles} {...props}>
        {text}
      </Polymorphic>
    </a>
  );
};

export default DataTerm;
