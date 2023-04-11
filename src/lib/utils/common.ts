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
  if (process.env.NEXT_PUBLIC_VERCEL_URL)
    return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
  return `http://localhost:${process.env.PORT ?? 3000}`;
};

type FakePromiseResult = {
  status: 'ok';
  error: null;
};

// fake promise to simulate a server call; it should resolve / reject in ration 50/50
/**
 *
 * @param timeout - timeout in ms
 * @param ratio - ratio of success, 0.5 means 50% of success; 0.1 means 10% of success; 0.9 means 90% of success
 * @returns
 */
export const fakePromise = async (
  timeout = 2000,
  ratio = 0.5
): Promise<FakePromiseResult> => {
  if (ratio > 1 || ratio < 0)
    throw new Error('Ratio should be between 0 and 1');

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      Math.random() < ratio
        ? resolve({ status: 'ok', error: null })
        : reject({ status: 'error', error: 'Something went wrong' });
    }, timeout);
  });
};
