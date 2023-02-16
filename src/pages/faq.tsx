import { MDXProvider } from '@mdx-js/react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'react-i18next';

import SrOnly from '@/components/Shared/SrOnly/SrOnly';
import FaqEN from '@/content/en/faq.mdx';
import FaqIT from '@/content/it/faq.mdx';
import FaqSL from '@/content/sl/faq.mdx';
import LayoutMDX from '@/layouts/LayoutMDX';
import type { Locale } from '@/types/i18n';

import nextI18nextConfig from '../../next-i18next.config.js';

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
  const { t } = useTranslation('common');

  return (
    <>
      <SrOnly.H1>{t(`navLinks.faq`)}</SrOnly.H1>
      <MDXProvider components={{}}>
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

FAQ.getLayout = function getLayout(page: React.ReactNode) {
  return <LayoutMDX>{page}</LayoutMDX>;
};

export default FAQ;
