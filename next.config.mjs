// @ts-check

import nextMDX from '@next/mdx';

import pkg from './next-i18next.config.js';
const { i18n } = pkg;

// https://mdxjs.com/docs/getting-started/#nextjs,   https://mdxjs.com/docs/getting-started/#types
const withMDX = nextMDX({
  // By default only the .mdx extension is supported.
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
    /* providerImportSource: …, otherOptions… */
    providerImportSource: '@mdx-js/react',
  },
});

/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
!process.env.SKIP_ENV_VALIDATION && (await import('./src/env/server.mjs'));

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,

  /**
   * If you have the "experimental: { appDir: true }" setting enabled, then you
   * must comment the below `i18n` config out.
   *
   * @see https://github.com/vercel/next.js/issues/41980
   */
  i18n: { ...i18n, localeDetection: false },
  trailingSlash: true,
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      type: 'asset',
      resourceQuery: /url/, // *.svg?url
    }),
      config.module.rules.push({
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        resourceQuery: { not: [/url/] }, // exclude react component if *.svg?url
        use: ['@svgr/webpack'],
      });

    return config;
  },
};
export default withMDX(config);
