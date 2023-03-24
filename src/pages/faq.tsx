import { MDXProvider } from '@mdx-js/react';
import dynamic from 'next/dynamic.js';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { componentsMap } from '@/layouts/componentsMap';
import type { Locale } from '@/lib/types/i18n.js';

import nextI18nextConfig from '../../next-i18next.config.js';

const LayoutMDX = dynamic(() => import('../layouts/LayoutMDX'));
const Seo = dynamic(() => import('@/components/Seo').then(mod => mod.Seo));

const FaqEN = dynamic(() => import('@/assets/content/en/faq.mdx'));
const FaqIT = dynamic(() => import('@/assets/content/it/faq.mdx'));
const FaqSL = dynamic(() => import('@/assets/content/sl/faq.mdx'));

const FAQIntlMap = {
  default: FaqSL,
  it: FaqIT,
  sl: FaqSL,
  en: FaqEN,
} as const;

const LanguagePageMDX = function LanguagePageMDX({ name }: { name: Locale }) {
  const Page = FAQIntlMap[`${name}`];
  return <Page id="FAQ-mdx" />;
};

function FAQ({ locale }: { locale: Locale }) {
  const { t } = useTranslation('seo');
  const title = t('title.faq');
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
        ['common', 'seo'],
        nextI18nextConfig
      )),
      locale,
      // Will be passed to the page component as props
    },
  };
}

export default FAQ;
