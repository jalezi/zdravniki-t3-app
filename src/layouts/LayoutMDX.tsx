import { clsx } from 'clsx';

import { IBMPlexSans } from '@/assets/fonts';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Seo } from '@/components/Seo';
import { ScrollToTop } from '@/components/Shared/ScrollToTop';

import styles from './LayoutMDX.module.css';

type Props = {
  children: React.ReactNode;
};

const LayoutMDX = (props: Props) => {
  return (
    <>
      <Seo />

      <Header />
      <main className={clsx(IBMPlexSans.className, styles.LayoutMDX)}>
        <div className={clsx(styles.ContainerMDX)}>
          <div className={styles.ContentMDX}>
            {props.children}
            <ScrollToTop elementRef={undefined} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default LayoutMDX;
