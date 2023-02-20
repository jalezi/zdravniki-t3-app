import { clsx } from 'clsx';

import { IBMPlexSans } from '@/assets/fonts';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Seo } from '@/components/Seo';

import styles from './LayoutError.module.css';

type Props = {
  children: React.ReactNode;
};

const LayoutError = (props: Props) => {
  return (
    <>
      <Seo />

      <Header />
      <main className={clsx(IBMPlexSans.className, styles.LayoutError)}>
        {props.children}
      </main>
      <Footer />
    </>
  );
};

export default LayoutError;
