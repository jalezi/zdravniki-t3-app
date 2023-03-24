import type { GetStaticProps } from 'next';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import image from '@/../public/assets/images/doctor-404@2x.png';
import styles from '@/layouts/LayoutError.module.css';

const LayoutError = dynamic(() => import('@/layouts/LayoutError'));
const Button = dynamic(() =>
  import('@/components/Shared/Buttons').then(mod => mod.Button)
);
const Seo = dynamic(() => import('@/components/Seo/Seo'));

const NotFoundPage = () => {
  const { t } = useTranslation('common');
  const { t: tSeo } = useTranslation('seo');
  const title = tSeo('title.pageNotFound');
  const { locale } = useRouter();

  return (
    <LayoutError>
      <Seo title={title} />
      <div id="error" className={styles.ContainerError}>
        <div className={styles.ContainerError__text_container}>
          <h1 className={styles.ContainerError__title}>
            {t('notFound.heading')}
          </h1>
          <p className={styles.ContainerError__message}>{t('notFound.text')}</p>
          <Button
            as={'a'}
            href="/"
            className={styles.ContainerError__button_inside}
          >
            {t('navLinks.home')}
          </Button>
        </div>
        <div className={styles.ContainerError__image_container}>
          <Image alt="not found" src={image} fill />
        </div>
        <Button
          as={Link}
          passHref
          href="/gp/"
          locale={locale}
          className={styles.ContainerError__button_outside}
        >
          {t('navLinks.home')}
        </Button>
      </div>
    </LayoutError>
  );
};

export default NotFoundPage;

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'sl', ['common', 'seo'])),
  },
});
