import AboutEN from '@/assets/content/en/about.mdx';
import FaqEN from '@/assets/content/en/faq.mdx';
import AboutIT from '@/assets/content/it/about.mdx';
import FaqIT from '@/assets/content/it/faq.mdx';
import AboutSL from '@/assets/content/sl/about.mdx';
import FaqSL from '@/assets/content/sl/faq/index.mdx';
import type { Locale } from '@/lib/types/i18n';

const AboutIntlMap = {
  default: AboutSL,
  it: AboutIT,
  sl: AboutSL,
  en: AboutEN,
} as const;

const FAQIntlMap = {
  default: FaqSL,
  it: FaqIT,
  sl: FaqSL,
  en: FaqEN,
} as const;

const PagesIntlMap = {
  about: AboutIntlMap,
  faq: FAQIntlMap,
} as const;

const LanguagePageMDX = function LanguagePageMDX({
  slug,
  name,
}: {
  slug: keyof typeof PagesIntlMap;
  name: Locale;
}) {
  const Page = PagesIntlMap[`${slug}`][`${name}`];
  return <Page id={`${slug}-mdx`} />;
};

export default LanguagePageMDX;
