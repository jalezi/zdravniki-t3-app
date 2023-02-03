import { type NextPage } from 'next';
import Link from 'next/link';

import nextI18NextConfig from '../../next-i18next.config.js';

type Locale = 'sl' | 'en' | 'it';

import { useTranslation } from 'next-i18next';
import { Seo } from '../components/Seo';

const Home: NextPage = () => {
  const { t } = useTranslation('common');
  return (
    <>
      <Seo />
      <header>{t`test`}</header>
      <main>
        <h1>h1</h1>
        <button>button</button>
        <br />
        <Link href="#">dummy link</Link>
      </main>
    </>
  );
};

export default Home;

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export async function getStaticProps({ locale }: { locale: Locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'], nextI18NextConfig)),
      // Will be passed to the page component as props
    },
  };
}
