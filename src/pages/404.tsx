import type { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { SrOnly } from '@/components/Shared/SrOnly';
import styles from '@/layouts/LayoutError.module.css';

const NotFoundPage = () => (
  <>
    <SrOnly as="h1">404 - Not Found</SrOnly>
    <div id="error" className={styles.ContainerError}>
      <h2>404 - Not Found</h2>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </div>
  </>
);

export default NotFoundPage;

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'sl', ['common'])),
  },
});
