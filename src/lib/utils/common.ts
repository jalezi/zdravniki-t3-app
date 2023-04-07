import type { Locale } from '@/lib/types/i18n';

const LocaleLangMap = {
  sl: 'sl-SL',
  en: 'en-GB',
  it: 'it-IT',
  default: 'sl-SL',
} satisfies Record<Locale, string>;

export const formatDate = (date: string, locale: Locale = 'sl') => {
  return new Intl.DateTimeFormat(LocaleLangMap[`${locale}`]).format(
    new Date(date)
  );
};

export const formatNumber = (number: number, locale: Locale = 'sl') => {
  return new Intl.NumberFormat(LocaleLangMap[`${locale}`]).format(number);
};

// round on two decimals and locale number
export const formatNumberRound = (number: number, locale: Locale = 'sl') => {
  return new Intl.NumberFormat(LocaleLangMap[`${locale}`], {
    maximumFractionDigits: 2,
  }).format(number);
};

// locale percent, max 2 decimals
export const formatPercent = (number: number, locale: Locale = 'sl') => {
  return new Intl.NumberFormat(LocaleLangMap[`${locale}`], {
    style: 'percent',
    maximumFractionDigits: 2,
  }).format(number);
};

export const getSiteUrl = () => {
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  if (process.env.SITE_URL) return process.env.SITE_URL;
  return `http://localhost:${process.env.PORT ?? 3000}`;
};
