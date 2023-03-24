import type { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import nextI18nextConfig from '@/../next-i18next.config';

const LayoutError = dynamic(() => import('@/layouts/LayoutError'));
const NotFoundPage = dynamic(() => import('./404'));
const Seo = dynamic(() => import('@/components/Seo/Seo'));

export default function CatchAllPage() {
  const { t } = useTranslation('seo');
  const title = t('title.pageNotFound');
  return (
    <LayoutError>
      <Seo title={title} />
      <NotFoundPage />;
    </LayoutError>
  );
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  return {
    props: {
      ...(await serverSideTranslations(
        ctx?.locale ?? 'sl',
        ['common', 'seo'],
        nextI18nextConfig
      )),
      // Will be passed to the page component as props
    },
  };
};
