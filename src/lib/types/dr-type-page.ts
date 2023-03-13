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

export const pageDrTypeSchema = z.enum([
  'gp',
  'ped',
  'den',
  'den-y',
  'den-s',
  'gyn',
]);

export type PageDrType = z.infer<typeof pageDrTypeSchema>;

export const baseDrTypeSchema = pageDrTypeSchema.transform(type => {
  if (type === 'den-s' || type === 'den-y') {
    return 'den';
  }
  return type;
});

export type BaseDrType = z.infer<typeof baseDrTypeSchema>;

export const drTypePageCoerceSchema = pageDrTypeSchema.transform(value => {
  if (value === 'gp') {
    return ['gp', 'gp-x'];
  }

  if (value === 'ped') {
    return ['ped', 'ped-x'];
  }

  return [value];
});

// gp has also "-y" suffix but we have both links in separate filter group
export const drTypeWithAgeSchema = z.enum(['den', 'den-s', 'den-y']);

export const drTypeWithAgeTransformSchema = drTypeWithAgeSchema.transform(
  value => {
    if (value.includes('den')) return 'den';
    return '';
  }
);
