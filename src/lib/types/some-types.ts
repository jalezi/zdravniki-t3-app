import type Link from 'next/link';
import { z } from 'zod';

export type ExternaLink = {
  as: 'a';
  hasLocale: false;
  isActive?: undefined;
  target: '_blank';
  rel: 'noopener noreferrer';
  href: string;
  label: string;
};

export type PageLink = {
  as: typeof Link;
  hasLocale: true;
  isActive?: ((asPath: string | undefined) => boolean) | undefined;
  passHref: true;
  href: string;
  label: string;
};

export const drPagesSchema = z.enum([
  'gp',
  'ped',
  'den',
  'den-y',
  'den-s',
  'gyn',
]);

export const drPagesTransformSchema = drPagesSchema.transform(value => {
  if (value === 'ped') {
    return 'gp-y';
  }
  return value;
});

// gp has also "-y" suffix but we have both links in separate filter group
export const drTypeWithAgeSchema = z.enum(['den', 'den-s', 'den-y']);

export const drTypeWithAgeTransformSchema = drTypeWithAgeSchema.transform(
  value => {
    if (value.includes('den')) return 'den';
    return '';
  }
);
