import { clsx } from 'clsx';

import { IBMPlexSans } from '@/assets/fonts';
import { Header } from '@/components/Header';
import { ErrorBoundary, Fallback } from '@/components/Shared/Errors';

import styles from './Layout.module.css';
import LayoutError from './LayoutError';

type Props = {
  children: React.ReactNode;
};

const FallbackContainer = () => {
  return (
    <LayoutError>
      <Fallback />
    </LayoutError>
  );
};

const Layout = (props: Props) => {
  return (
    <>
      <Header />
      <ErrorBoundary fallback={<FallbackContainer />}>
        <main className={clsx(IBMPlexSans.className, styles.Layout)}>
          {props.children}
        </main>
      </ErrorBoundary>
    </>
  );
};

export default Layout;
