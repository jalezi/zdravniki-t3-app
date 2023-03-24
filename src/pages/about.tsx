import { MDXProvider } from '@mdx-js/react';
import dynamic from 'next/dynamic.js';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { componentsMap } from '@/layouts/componentsMap';
import type { Locale } from '@/lib/types/i18n.js';

import nextI18nextConfig from '../../next-i18next.config.js';

const LayoutMDX = dynamic(() => import('@/layouts/LayoutMDX'));
const Seo = dynamic(() => import('@/components/Seo').then(mod => mod.Seo));

const AboutEN = dynamic(() => import('@/assets/content/en/about.mdx'));
const AboutIT = dynamic(() => import('@/assets/content/it/about.mdx'));
const AboutSL = dynamic(() => import('@/assets/content/sl/about.mdx'));

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
  const { t } = useTranslation('seo');
  const title = t('title.about');
  return (
    <LayoutMDX>
      <Seo title={title} />
      <MDXProvider components={componentsMap}>
        <LanguagePageMDX name={locale} />
      </MDXProvider>
    </LayoutMDX>
  );
}

export async function getStaticProps({ locale }: { locale: Locale }) {
  if (locale === 'default') {
    return { notFound: true };
  }

  return {
    props: {
      ...(await serverSideTranslations(
        locale,
        ['common', 'about', 'seo'],
        nextI18nextConfig
      )),
      locale,
      // Will be passed to the page component as props
    },
  };
}

export default About;
