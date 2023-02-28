import type { NextComponentType } from 'next';
import type { AppContext, AppInitialProps, AppLayoutProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';

import { api } from '@/lib/utils/api';

import nextI18nextConfig from '../../next-i18next.config.js';
import 'the-new-css-reset';
import '@/lib/styles/variables.css';
import '@/lib/styles/globals.css';
import '@/lib/styles/leaflet.css';
import Layout from '../layouts/Layout';

const MyApp: NextComponentType<AppContext, AppInitialProps, AppLayoutProps> = ({
  Component,
  pageProps,
}: AppLayoutProps) => {
  const getLayout = Component?.getLayout;

  if (getLayout) {
    return getLayout(<Component {...pageProps} />) as JSX.Element;
  }

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};

export default api.withTRPC(appWithTranslation(MyApp, nextI18nextConfig));
