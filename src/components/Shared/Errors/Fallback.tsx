import clsx from 'clsx';
import { useTranslation } from 'next-i18next';

import { Seo } from '@/components/Seo';

import { Button } from '../Buttons';
import type { PolymorphicComponentProps } from '../Polymorphic';
import { Polymorphic } from '../Polymorphic';

type FallbackProps = Omit<PolymorphicComponentProps<'div'>, 'as'>;

const Fallback = (props: FallbackProps) => {
  const { t } = useTranslation('common');
  const { t: tSeo } = useTranslation('seo');
  const title = tSeo('title.500');
  const fallback = t('fallback', { returnObjects: true }) satisfies {
    heading: string;
    link: string;
    text: string;
  };

  const { className, ...rest } = props;

  const fallbackStyles = clsx(className);

  return (
    <>
      <Seo title={title} />
      <Polymorphic className={fallbackStyles} {...rest}>
        <h1>{fallback.heading}</h1>
        <p>{fallback.text}</p>
        <Button as="a" href="/">
          {fallback.link}
        </Button>
      </Polymorphic>
    </>
  );
};

export default Fallback;
