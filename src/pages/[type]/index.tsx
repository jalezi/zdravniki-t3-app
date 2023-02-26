import type { GetServerSideProps, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import nextI18nextConfig from '@/../../next-i18next.config.js';
import HomeSections from '@/components/HomeSections/HomeSections';
import { drTypePageSchema } from '@/lib/types/dr-type-page';

const DrType: NextPage = () => {
  return <HomeSections />;
};

export default DrType;

export const getServerSideProps: GetServerSideProps = async ctx => {
  const { type } = ctx.query;

  const drType = drTypePageSchema.safeParse(type);

  if (!drType.success) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      ...(await serverSideTranslations(
        ctx?.locale ?? 'sl',
        ['common', 'doctor'],

        nextI18nextConfig
      )),
      // Will be passed to the page component as props
    },
  };
};
