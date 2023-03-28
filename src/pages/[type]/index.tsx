import type { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import nextI18nextConfig from '@/../../next-i18next.config.js';
import { pageDrTypeSchema } from '@/lib/types/dr-type-page';

const Layout = dynamic(() => import('@/layouts/Layout'));

const HomeSections = dynamic(
  () => import('@/components/HomeSections/HomeSections')
);

const Seo = dynamic(() => import('@/components/Seo/Seo'));

const DrTypePage = () => {
  const { query } = useRouter();
  const { t } = useTranslation('seo');
  const titles = t('title', { returnObjects: true });

  const type = query.type;

  if (!pageDrTypeSchema.safeParse(type).success) {
  }

  const title = titles[type as keyof typeof titles];

  return (
    <Layout>
      <Seo title={title} />
      <HomeSections />
    </Layout>
  );
};

export default DrTypePage;

export const getServerSideProps: GetServerSideProps = async ctx => {
  const { type } = ctx.query;

  const drType = pageDrTypeSchema.safeParse(type);

  if (!drType.success) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      ...(await serverSideTranslations(
        ctx?.locale ?? 'sl',
        ['common', 'doctor', 'map', 'seo'],

        nextI18nextConfig
      )),
      // Will be passed to the page component as props
    },
  };
};
