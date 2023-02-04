import { type AppType } from 'next/app';
import { appWithTranslation } from 'next-i18next';

import { api } from '@/utils/api';

import 'the-new-css-reset';
import '@/styles/globals.css';
import Layout from '../layouts/Layout';

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};

export default api.withTRPC(appWithTranslation(MyApp));
