/** @type {import('next-sitemap').IConfig} */

const DEFAULT_SITE_URL = 'https://zdravniki.sledilnik.org';
const siteUrl = process.env.SITE_URL || DEFAULT_SITE_URL;

module.exports = {
  /** @type {import('next-sitemap').IConfig} */
  siteUrl,
  generateRobotsTxt: true,
  exclude: ['/server-sitemap.xml'],
  robotsTxtOptions: {
    additionalSitemaps: [
      `${siteUrl}/server-sitemap.xml`,
      `${siteUrl}/sl/server-sitemap.xml`,
      `${siteUrl}/en/server-sitemap.xml`,
      `${siteUrl}/it/server-sitemap.xml`,
    ],
  },
  alternateRefs: [
    {
      href: siteUrl + '/sl',
      hrefLang: 'sl',
    },
    {
      href: siteUrl + '/en',
      hrefLang: 'en',
    },
    {
      href: siteUrl + '/it',
      hrefLang: 'it',
    },
  ],
};
