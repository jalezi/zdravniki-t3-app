import { clsx } from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import type { ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';

import { Button } from '@/components/Shared/Buttons';
import { Icon } from '@/components/Shared/Icons';
import type { PolymorphicComponentProps } from '@/components/Shared/Polymorphic';
import { Polymorphic } from '@/components/Shared/Polymorphic';

import styles from './ComponentsMDX.module.css';
import HeadingAnchor from './HeadingAnchor';

type DetailsProps = {
  summaryText: ReactNode;
  variant?: 'question' | 'glossary';
} & Omit<PolymorphicComponentProps<'details'>, 'as'>;

const Details = ({
  children,
  className,
  summaryText,
  variant = 'question',
  ...props
}: DetailsProps) => {
  const ref = useRef<HTMLDetailsElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const { asPath, replace } = useRouter();
  const isHashId = asPath.includes(`#${props?.id ?? ''}`);

  useEffect(() => {
    setIsOpen(ref.current?.open ?? false);
  }, []);

  useEffect(() => {
    if (isHashId && ref.current) {
      ref.current.open = true;
      setIsOpen(true);
    }
  }, [isHashId]);

  const iconName = isOpen ? 'MinusCircleSvg' : 'PlusCircleSvg';
  const summaryHandler = async () => {
    setIsOpen(!ref.current?.open ?? false);
    const basePath = asPath.split('/')[1];

    if (basePath === 'faq') {
      const newAsPath = ref.current?.open
        ? `/${basePath}`
        : `/${basePath}/#${props?.id ?? ''}`;

      await replace(newAsPath);
    }
  };

  const backHandler = () => {
    if (ref.current) {
      ref.current.removeAttribute('data-back');
      ref.current.open = false;
      setIsOpen(false);
    }
  };

  const detailsWrapperStyles = clsx(
    styles.ComponentsMDX,
    styles.DetailsWrapper
  );
  const detailsStyles = clsx(styles.ComponentsMDX, styles.Details, className);
  const summaryStyles = clsx(styles.ComponentsMDX, styles.Summary);
  const summaryIconWrapperStyles = clsx(
    styles.ComponentsMDX,
    styles.SummaryIconWrapper
  );
  const iconStyles = clsx(
    styles.ComponentsMDX,
    styles.Icon,
    isOpen && styles.Close,
    !isOpen && styles.Open
  );

  return (
    <div className={detailsWrapperStyles}>
      <Polymorphic ref={ref} as="details" className={detailsStyles} {...props}>
        <summary className={summaryStyles} onClick={summaryHandler}>
          <span>{summaryText}</span>
          <span className={summaryIconWrapperStyles}>
            <Icon size="xxl" className={iconStyles} name={iconName} />
          </span>
        </summary>
        <div className={styles.DetailsContent}>
          {children}
          {variant === 'glossary' && ref.current?.hasAttribute('data-back') && (
            <Button
              as={Link}
              href={`/faq/#${ref.current?.getAttribute('data-back') ?? ''}`}
              replace
              onClick={backHandler}
              className={clsx(styles.ComponentsMDX, styles.BackTo)}
            >
              nazaj
            </Button>
          )}
        </div>
      </Polymorphic>
      {props.id && <HeadingAnchor headingText={props.id} />}
    </div>
  );
};

export default Details;
