import { clsx } from 'clsx';

import { Header } from '@/components/Header';
import { Seo } from '@/components/Seo';
import { IBMPlexSans } from '@/fonts';

import styles from './Layout.module.css';

type Props = {
  children: React.ReactNode;
};

const Layout = (props: Props) => {
  return (
    <>
      <Seo />

      <Header />
      <main className={clsx(IBMPlexSans.className, styles.Layout)}>
        {props.children}
      </main>
    </>
  );
};

export default Layout;
