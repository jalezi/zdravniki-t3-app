import { Analytics } from '@vercel/analytics/react'; // @vercel/analytics is automatically added to your project when you deploy to Vercel
import type { NextComponentType } from 'next';
import type { AppContext, AppInitialProps, AppLayoutProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';

import { ErrorBoundary, Fallback } from '@/components/Shared/Errors';
import { api } from '@/lib/utils/api';

import nextI18nextConfig from '../../next-i18next.config.js';
import 'react-loading-skeleton/dist/skeleton.css';
import 'react-tooltip/dist/react-tooltip.css';
import 'leaflet/dist/leaflet.css';
import 'the-new-css-reset';
import '@/lib/styles/variables.css';
import '@/lib/styles/globals.css';
import '@/lib/styles/leaflet.css';

// todo: change about page visitors personal data & cookies if we use analytics

const MyApp: NextComponentType<AppContext, AppInitialProps, AppLayoutProps> = ({
  Component,
  pageProps,
}: AppLayoutProps) => {
  return (
    <>
      <ErrorBoundary fallback={<Fallback />}>
        <Component {...pageProps} />
      </ErrorBoundary>
      <Analytics />
    </>
  );
};

export default api.withTRPC(appWithTranslation(MyApp, nextI18nextConfig));
