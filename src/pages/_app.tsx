import { type AppType } from 'next/app';

import { IBM_Plex_Sans } from '@next/font/google';

import { api } from '../utils/api';

import 'the-new-css-reset';
import '../styles/globals.css';

const IBMPlexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700'],
  style: ['italic', 'normal'],
});

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <header className={IBMPlexSans.className}>Header</header>
      <div className={IBMPlexSans.className}>
        <Component {...pageProps} />
      </div>
    </>
  );
};

export default api.withTRPC(MyApp);
