import type { GetServerSideProps, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import HomeSections from '@/components/HomeSections/HomeSections';

import nextI18nextConfig from '../../next-i18next.config.js';

const Home: NextPage = () => {
  return <HomeSections />;
};

export default Home;

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
