import { MDXProvider } from '@mdx-js/react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import SrOnly from '@/components/Shared/SrOnly/SrOnly';
import AboutEN from '@/content/en/about.mdx';
import AboutIT from '@/content/it/about.mdx';
import AboutSL from '@/content/sl/about.mdx';
import LayoutMDX from '@/layouts/LayoutMDX';
import type { Locale } from '@/types/i18n';

import nextI18nextConfig from '../../next-i18next.config.js';

const AboutIntlMap = {
  default: AboutSL,
  it: AboutIT,
  sl: AboutSL,
  en: AboutEN,
} as const;

const LanguagePageMDX = function LanguagePageMDX({ name }: { name: Locale }) {
  const Page = AboutIntlMap[`${name}`];
  return <Page id="about-mdx" />;
};

function About({ locale }: { locale: Locale }) {
  return (
    <>
      <MDXProvider components={{ h1: SrOnly.H1 }}>
        <LanguagePageMDX name={locale} />
      </MDXProvider>
    </>
  );
}

export async function getStaticProps({ locale }: { locale: Locale }) {
  if (locale === 'default') {
    return { notFound: true };
  }

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'], nextI18nextConfig)),
      locale,
      // Will be passed to the page component as props
    },
  };
}

About.getLayout = function getLayout(page: React.ReactNode) {
  return <LayoutMDX>{page}</LayoutMDX>;
};

export default About;
