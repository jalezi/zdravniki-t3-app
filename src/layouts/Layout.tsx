import { Header } from '@/components/Header';
import { Seo } from '@/components/Seo';
import { IBMPlexSans } from '@/fonts';

type Props = {
  children: React.ReactNode;
};

const Layout = (props: Props) => {
  const tempMainStyle = { paddingTop: 'var(--header-height-sm)' };

  return (
    <>
      <Seo />
      <Header />
      <main className={IBMPlexSans.className} style={tempMainStyle}>
        {props.children}
      </main>
    </>
  );
};

export default Layout;
