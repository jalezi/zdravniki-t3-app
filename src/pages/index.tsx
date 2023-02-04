import { type NextPage } from 'next';
import Link from 'next/link';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { useTranslation } from 'next-i18next';
import type { Locale } from '../types/i18n';

import nextI18nextConfig from '../../next-i18next.config.js';

const Home: NextPage = () => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { t } = useTranslation('common');

  return (
    <main>
      <h1>{t`test`}</h1>
      <button>button</button>
      <br />
      <Link href="/about">about</Link>
    </main>
  );
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
