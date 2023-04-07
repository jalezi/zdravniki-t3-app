/** @type {import('next-sitemap').IConfig} */

const getSiteUrl = () => {
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  if (process.env.SITE_URL) return process.env.SITE_URL;
  return `http://localhost:${process.env.PORT ?? 3000}`;
};

const siteUrl = getSiteUrl();

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
