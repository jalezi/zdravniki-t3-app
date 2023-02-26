import type { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useEffect } from 'react';

import nextI18nextConfig from '@/../../next-i18next.config.js';
import HomeSections from '@/components/HomeSections/HomeSections';
import { SL_CENTER, ZOOM } from '@/lib/constants/map';
import { drTypePageSchema } from '@/lib/types/dr-type-page';
import { parseHash, stringifyHash } from '@/lib/utils/url-hash';

const DrType: NextPage = () => {
  const router = useRouter();
  useEffect(() => {
    if (!router.isReady) return;
    const documentLocHash = document.location.hash;
    const parsedHash = parseHash(documentLocHash?.split('#')?.[1] ?? '');

    if (parsedHash.success) return;

    const newHash = stringifyHash(['all', [ZOOM, ...SL_CENTER], '']);
    let newPath = router.asPath;
    if (!documentLocHash) {
      newPath = `${router.asPath}${newHash}`;
      return void router.replace(newPath, newPath, {
        shallow: true,
        locale: router.locale,
      });
    }
    // ? notify user if hash is invalid
    newPath = router.asPath.replace(documentLocHash, newHash);
    void router.replace(newPath, newPath, {
      shallow: true,
      locale: router.locale,
    });
  }, [router]);

  return <HomeSections />;
};

export default DrType;

export const getServerSideProps: GetServerSideProps = async ctx => {
  const { type } = ctx.query;

  const drType = drTypePageSchema.safeParse(type);

  if (!drType.success) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      ...(await serverSideTranslations(
        ctx?.locale ?? 'sl',
        ['common', 'doctor'],

        nextI18nextConfig
      )),
      // Will be passed to the page component as props
    },
  };
};
