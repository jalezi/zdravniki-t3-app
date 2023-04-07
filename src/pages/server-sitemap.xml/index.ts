// https://github.com/iamvishnusankar/next-sitemap#readme

import type { GetServerSideProps } from 'next';
import { getServerSideSitemapLegacy } from 'next-sitemap';

import { DR_TYPE_LABELS } from '@/lib/types/dr-type-page';
import { getSiteUrl } from '@/lib/utils/common';
import { fetchDrAndInstDataAndParse } from '@/lib/utils/fetch-and-parse';
import { toSlug } from '@/lib/utils/zod';

const siteUrl = getSiteUrl();

export const getServerSideProps: GetServerSideProps = async ctx => {
  // Method to source urls from cms
  // const urls = await fetch('https//example.com/api')

  const { locale } = ctx;

  const localeValidated = locale === 'default' ? '' : locale;

  const siteLocaleUrl = localeValidated
    ? `${siteUrl}/${localeValidated}`
    : siteUrl;

  const home = {
    loc: siteLocaleUrl,
    lastmod: new Date().toISOString(),
    // changefreq
    // priority
  };

  const typePages = DR_TYPE_LABELS.map(type => ({
    loc: `${siteLocaleUrl}/${type}`,
    lastmod: new Date().toISOString(),
    // changefreq
    // priority
  }));

  const typePagesLocale = DR_TYPE_LABELS.map(type => ({
    loc: `${siteLocaleUrl}/${type}`,
    lastmod: new Date().toISOString(),
    // changefreq
    // priority
  }));

  const { doctorsParsedFromCsv, institutionsParsedFromCsv } =
    await fetchDrAndInstDataAndParse();

  const drPages = doctorsParsedFromCsv.data.map(dr => {
    const hasInstitution =
      !!dr.id_inst &&
      institutionsParsedFromCsv.data.find(val => val.id_inst === dr.id_inst);

    if (!hasInstitution) {
      return null;
    }

    const drSlug = toSlug(dr.doctor);

    const drPath = `${dr.type}/${drSlug}/${dr.id_inst}`;

    return {
      loc: `${siteLocaleUrl}/${drPath}`,
      lastmod: new Date().toISOString(),
      // changefreq
      // priority
    };
  });

  const drPagesValidated = drPages.filter(Boolean);

  const fields = [
    home,
    ...typePages,
    ...typePagesLocale.map(type => type).flat(1),
    ...drPagesValidated,
  ];

  return getServerSideSitemapLegacy(ctx, fields);
};

// Default export to prevent next.js errors
// eslint-disable-next-line @typescript-eslint/no-empty-function
export default function Sitemap() {}
