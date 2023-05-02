import { clsx } from 'clsx';
import dynamic from 'next/dynamic';

import { IBMPlexSans } from '@/assets/fonts';

import styles from './LayoutMDX.module.css';

const Header = dynamic(() =>
  import('@/components/Header').then(mod => mod.Header)
);
const Footer = dynamic(() =>
  import('@/components/Footer').then(mod => mod.Footer)
);
const ScrollToTop = dynamic(() =>
  import('@/components/Shared/ScrollToTop').then(mod => mod.ScrollToTop)
);

type Props = {
  children: React.ReactNode;
};

const LayoutMDX = (props: Props) => {
  return (
    <>
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
