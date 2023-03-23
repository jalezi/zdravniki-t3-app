import clsx from 'clsx';
import { useTranslation } from 'next-i18next';

import { Seo } from '@/components/Seo';

import styles from './Fallback.module.css';
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

  const fallbackStyles = clsx(styles.Fallback, className);

  return (
    <>
      <Seo title={title} />
      <Polymorphic className={fallbackStyles} {...rest}>
        <div className={styles.ContainerError}>
          <div className={styles.ContainerError__text_container}>
            <h2 className={styles.ContainerError__title}>{fallback.heading}</h2>
            <p className={styles.ContainerError__message}>{fallback.text}</p>
          </div>
          <Button
            as="a"
            href="/gp/"
            className={styles.ContainerError__button_outside}
          >
            {fallback.link}
          </Button>
        </div>
      </Polymorphic>
    </>
  );
};

export default Fallback;
