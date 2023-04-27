import { clsx } from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import type { ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';
import { useEventListener } from 'usehooks-ts';

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
  const backToLink = useRef<HTMLAnchorElement>(null);
  const backOutlineRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const { asPath, replace } = useRouter();
  const isHashId = asPath.includes(`#${props?.id ?? ''}`);
  const basePath = asPath.split('/')[1];

  const { t } = useTranslation('faq');

  useEffect(() => {
    setIsOpen(ref.current?.open ?? false);
  }, []);

  useEffect(() => {
    if (isHashId && ref.current) {
      ref.current.open = true;
      setIsOpen(true);
    }
  }, [isHashId]);

  const styleBackToOutline = createBackToOutlineFunc({
    parentElement: ref.current,
    toElement: backToLink.current,
    outlineElement: backOutlineRef.current,
  });

  styleBackToOutline();
  useEventListener('resize', styleBackToOutline);

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

  // styles
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
  const detailsContentStyles = clsx(
    styles.ComponentsMDX,
    styles.DetailsContent
  );
  const iconStyles = clsx(
    styles.ComponentsMDX,
    styles.Icon,
    isOpen && styles.Close,
    !isOpen && styles.Open
  );
  const backOutlineStyles = clsx(styles.ComponentsMDX, styles.BackOutline);

  const dataBackAttribute = ref.current?.getAttribute('data-back');

  const showBackToButton =
    variant === 'glossary' &&
    dataBackAttribute &&
    isHashId &&
    basePath === 'faq';

  return (
    <div className={detailsWrapperStyles}>
      <Polymorphic ref={ref} as="details" className={detailsStyles} {...props}>
        <summary className={summaryStyles} onClick={summaryHandler}>
          <span>{summaryText}</span>
          <span className={summaryIconWrapperStyles}>
            <Icon size="xxl" className={iconStyles} name={iconName} />
          </span>
        </summary>
        <div className={detailsContentStyles}>
          {children}
          {showBackToButton && (
            <>
              <Button
                ref={backToLink}
                as={Link}
                href={`/${basePath}/#${
                  ref.current?.getAttribute('data-back') ?? ''
                }`}
                replace
                onClick={backHandler}
                className={clsx(styles.ComponentsMDX, styles.BackTo)}
              >
                {t('buttons.back')}
              </Button>
              <div ref={backOutlineRef} className={backOutlineStyles} />
            </>
          )}
        </div>
      </Polymorphic>
      {props.id && <HeadingAnchor headingText={props.id} />}
    </div>
  );
};

export default Details;

type BaseElements = {
  parentElement: HTMLElement | null;
  toElement: HTMLElement | null;
  outlineElement: HTMLElement | null;
};

type NonNullableBaseElements = {
  [K in keyof BaseElements]-?: NonNullable<BaseElements[K]>;
};

type CalculateBackToOutlineRect = {
  fromElement: HTMLElement;
} & Omit<NonNullableBaseElements, 'outlineElement'>;

function calculateBackToOutlineRect(elements: CalculateBackToOutlineRect) {
  const { fromElement, parentElement, toElement } = elements;

  const fromRect = fromElement.getBoundingClientRect();
  const parentRect = parentElement.getBoundingClientRect();
  const toRect = toElement.getBoundingClientRect();

  const width = parentRect.right - fromRect.left;
  const bottom = toRect.height / 2;
  const height = parentRect.bottom - fromRect.bottom - bottom;

  return {
    width,
    bottom,
    height,
  };
}

function setBackToOutlineStyles(
  element: HTMLElement,
  elements: CalculateBackToOutlineRect
) {
  const { fromElement, parentElement } = elements;

  const { width, bottom, height } = calculateBackToOutlineRect(elements);

  element.style.width = `calc(${width}px + 0.5em)`;
  element.style.bottom = `${bottom}px`;
  element.style.left = `${
    parentElement.getBoundingClientRect().width - width
  }px`;
  element.style.height = `${height + 2}px`;

  element.style.clipPath = `polygon(${
    fromElement.getBoundingClientRect().width
  }px  -2px, calc(100% + 2px) -2px, calc(100% + 2px) 102%, calc(100% - 1em) 100%)`;
}

function createBackToOutlineFunc(elements: BaseElements) {
  return () => {
    const { parentElement, toElement, outlineElement } = elements;
    const dataBackAttribute = parentElement?.getAttribute('data-back');
    if (!parentElement || !toElement || !outlineElement || !dataBackAttribute)
      return;

    const dataTerm = document.getElementById(dataBackAttribute);
    if (!dataTerm) return;

    setBackToOutlineStyles(outlineElement, {
      fromElement: dataTerm,
      parentElement,
      toElement,
    });
  };
}
