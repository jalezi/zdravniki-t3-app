import { MDXProvider } from '@mdx-js/react';
import dynamic from 'next/dynamic.js';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { LanguagePageMDX } from '@/components/LanguagePageMDX';
import { componentsMap } from '@/layouts/componentsMap';
import LayoutMDX from '@/layouts/LayoutMDX';
import type { Locale } from '@/lib/types/i18n.js';

import nextI18nextConfig from '../../next-i18next.config.js';

const Seo = dynamic(() => import('@/components/Seo').then(mod => mod.Seo));

function FAQ({ locale }: { locale: Locale }) {
  const { t } = useTranslation('seo');
  const title = t('title.faq');
  return (
    <LayoutMDX>
      <Seo title={title} />
      <MDXProvider components={componentsMap}>
        <LanguagePageMDX slug="faq" name={locale} />
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
        ['common', 'seo', 'faq', 'abbreviations'],
        nextI18nextConfig
      )),
      locale,
      // Will be passed to the page component as props
    },
  };
}

export default FAQ;
