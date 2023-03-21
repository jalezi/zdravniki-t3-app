import type { NextComponentType } from 'next';
import type { AppContext, AppInitialProps, AppLayoutProps } from 'next/app';
import Error from 'next/error.js';
import { appWithTranslation } from 'next-i18next';

import { ErrorBoundary } from '@/components/Shared/Errors';
import { api } from '@/lib/utils/api';

import nextI18nextConfig from '../../next-i18next.config.js';
import 'react-loading-skeleton/dist/skeleton.css';
import 'react-tooltip/dist/react-tooltip.css';
import 'leaflet/dist/leaflet.css';
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
    <ErrorBoundary fallback={<Error statusCode={500} />}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ErrorBoundary>
  );
};

export default api.withTRPC(appWithTranslation(MyApp, nextI18nextConfig));
