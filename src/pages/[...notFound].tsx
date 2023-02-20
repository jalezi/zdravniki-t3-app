import type { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import nextI18nextConfig from '@/../next-i18next.config';
import LayoutError from '@/layouts/LayoutError';

import NotFoundPage from './404';

export default function CatchAllPage() {
  return <NotFoundPage />;
}

CatchAllPage.getLayout = function getLayout(page: React.ReactNode) {
  return <LayoutError>{page}</LayoutError>;
};

export const getServerSideProps: GetServerSideProps = async ctx => {
  return {
    props: {
      ...(await serverSideTranslations(
        ctx?.locale ?? 'sl',
        ['common'],
        nextI18nextConfig
      )),
      // Will be passed to the page component as props
    },
  };
};
