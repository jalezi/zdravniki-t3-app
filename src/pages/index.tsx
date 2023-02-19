import { type NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import HomeSections from '@/components/HomeSections/HomeSections';
import type { Locale } from '@/lib/types/i18n.js';

import nextI18nextConfig from '../../next-i18next.config.js';

const Home: NextPage = () => {
  return <HomeSections />;
};

export default Home;

export async function getStaticProps({ locale }: { locale: Locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'], nextI18nextConfig)),
      // Will be passed to the page component as props
    },
  };
}
