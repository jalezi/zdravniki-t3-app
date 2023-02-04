/** @type {["default", "sl", "en", "it"]} */
const locales = ['default', 'sl', 'en', 'it'];

module.exports = {
  i18n: {
    defaultLocale: 'default',
    locales,
  },
  // https://github.com/i18next/next-i18next/issues/1552#issuecomment-981156476
  localePath:
    typeof window === 'undefined'
      ? // eslint-disable-next-line @typescript-eslint/no-var-requires
        require('path').resolve('./public/locales')
      : '/public/locales/',
  fallbackLang: {
    default: ['sl'],
  },
};
