import { clsx } from 'clsx';

import { IBMPlexSans } from '@/assets/fonts';
import { Header } from '@/components/Header';
import { Seo } from '@/components/Seo';

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
          <div className={styles.ContentMDX}>{props.children}</div>
        </div>
      </main>
    </>
  );
};

export default LayoutMDX;
