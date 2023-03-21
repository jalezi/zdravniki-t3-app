import type { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import nextI18nextConfig from '@/../../next-i18next.config.js';
import HomeSections from '@/components/HomeSections/HomeSections';
import { Seo } from '@/components/Seo';
import { pageDrTypeSchema } from '@/lib/types/dr-type-page';

const DrTypePage: NextPage = () => {
  const { query } = useRouter();
  const { t } = useTranslation('seo');

  const type = query.type as string;

  const title = t(`title.${type}`);

  return (
    <>
      <Seo title={title} />
      <HomeSections />
    </>
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
