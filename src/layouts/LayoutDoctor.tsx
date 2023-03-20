import { clsx } from 'clsx';

import { IBMPlexSans } from '@/assets/fonts';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Seo } from '@/components/Seo';

import styles from './LayoutDoctor.module.css';

type Props = {
  children: React.ReactNode;
};

const LayoutDoctor = (props: Props) => {
  return (
    <>
      <Seo />

      <Header />
      <main className={clsx(IBMPlexSans.className, styles.LayoutDoctor)}>
        <div className={clsx(styles.ContainerDoctor)}>{props.children}</div>
      </main>
      <Footer position="doctor" />
    </>
  );
};

export default LayoutDoctor;
