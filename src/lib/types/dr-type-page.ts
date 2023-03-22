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

export const DR_TYPE_LABELS = [
  'gp',
  'gp-x',
  'ped',
  'den',
  'den-y',
  'den-s',
  'gyn',
] as const;

export const pageDrTypeSchema = z.enum(DR_TYPE_LABELS);

export type PageDrType = z.infer<typeof pageDrTypeSchema>;

export const baseDrTypeSchema = pageDrTypeSchema.transform(type => {
  if (type === 'den-s' || type === 'den-y') {
    return 'den';
  }
  return type;
});

export type BaseDrType = z.infer<typeof baseDrTypeSchema>;

export const drTypeWithAgeSchema = z.enum(['den', 'den-s', 'den-y']);

export const drTypeWithAgeTransformSchema = drTypeWithAgeSchema.transform(
  value => {
    if (value.includes('den')) return 'den';
    return '';
  }
);

export const drTypeWithExtraSchema = z.enum(['gp', 'gp-x']);

export const drTypeWithExtraTransformSchema = drTypeWithExtraSchema.transform(
  value => {
    if (value.includes('gp')) return 'gp';
    return '';
  }
);
