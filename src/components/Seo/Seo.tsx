import Head from 'next/head';
import { useTranslation } from 'next-i18next';

const defaultSeoData = {
  title: 'Zdravniki - Sledilnik',
  description:
    'Zdravniki Sledilnik Slovenija - zbrani, preverjeni, ažurirani, analizirani in pregledni podatki o prostih zdravnikih v Sloveniji',
  keywords: '',
};
const SOCIAL_IMG_URL = 'https://zdravniki.sledilnik.org/social.png';

const SOCIAL_COLOR = '#09AFDA';
const CANONICAL_URL = 'https://zdravniki.sledilnik.org/';

type SeoProps = {
  title?: string;
  description?: string;
  keywords?: string;
};

function Seo(props: SeoProps) {
  const { t } = useTranslation('seo');

  const subtitle = t('subtitle') ?? defaultSeoData.title;
  const title = props.title ? `${props.title} - ${subtitle}` : `${subtitle}`;
  const description =
    (props.description || t('description')) ?? defaultSeoData.description;
  const keywords = (props.keywords || t('keywords')) ?? defaultSeoData.keywords;

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords ? <meta name="keywords" content={keywords} /> : null}
      <link rel="icon" href="/favicon.ico" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/manifest.json" />
      <link
        rel="mask-icon"
        href="/safari-pinned-tab.svg"
        color={SOCIAL_COLOR}
      />
      <meta name="msapplication-TileColor" content={SOCIAL_COLOR} />
      <meta name="theme-color" content={SOCIAL_COLOR} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@sledilnik" />
      <meta name="twitter:creator" content="@sledilnik" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={SOCIAL_IMG_URL} />
      <meta property="og:image" content={SOCIAL_IMG_URL} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <link rel="canonical" href={CANONICAL_URL} />
    </Head>
  );
}

export default Seo;
