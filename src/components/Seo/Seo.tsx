import Head from 'next/head';

const defaultSeoData = {
  title: 'Zdravniki - Sledilnik',
  description:
    'Zdravniki Sledilnik Slovenija - zbrani, preverjeni, ažurirani, analizirani in pregledni podatki o prostih zdravnikih v Sloveniji',
  keywords: '',
};
const socialImgUrl = 'https://zdravniki.sledilnik.org/social.png';

const socialColor = '#09AFDA';
const canonicalURL = 'https://zdravniki.sledilnik.org/';

function Seo() {
  const { title, description, keywords } = defaultSeoData;

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
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
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color={socialColor} />
      <meta name="msapplication-TileColor" content={socialColor} />
      <meta name="theme-color" content={socialColor} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@sledilnik" />
      <meta name="twitter:creator" content="@sledilnik" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={socialImgUrl} />
      <meta property="og:image" content={socialImgUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <link rel="canonical" href={canonicalURL} />
    </Head>
  );
}

export default Seo;
