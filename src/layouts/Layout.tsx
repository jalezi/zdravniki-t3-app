import { IBM_Plex_Sans } from '@next/font/google';

import { Seo } from '@/components/Seo';

const IBMPlexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700'],
  style: ['italic', 'normal'],
});

type Props = {
  children: React.ReactNode;
};

const Layout = (props: Props) => {
  return (
    <>
      <Seo />
      <header className={IBMPlexSans.className}>Header</header>
      <main className={IBMPlexSans.className}>{props.children}</main>
    </>
  );
};

export default Layout;
