/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  AdultsSvg,
  AllSvg,
  BanSvg,
  CheckSvg,
  ClinicSvg,
  DentistSvg,
  FamilyDrSvg,
  GynSvg,
  PedSvg,
  StudentsSvg,
} from '@/components/Shared/Icons';
import {
  drTypeWithAgeTransformSchema,
  drTypeWithExtraTransformSchema,
} from '@/lib/types/dr-type-page';

export const DR_GROUP = [
  { value: 'gp', Icon: FamilyDrSvg, translationKey: 'gp', href: '/gp/' },
  { value: 'ped', Icon: PedSvg, translationKey: 'ped', href: '/ped/' },
  { value: 'gyn', Icon: GynSvg, translationKey: 'gyn', href: '/gyn/' },
  { value: 'den', Icon: DentistSvg, translationKey: 'den', href: '/den/' },
];

const createAgeGroupHref = (drType: string | undefined, suffix = '') =>
  `/${drTypeWithAgeTransformSchema.parse(drType)}${suffix}/`;

const createExtraGroupHref = (drType: string | undefined, suffix = '') =>
  `/${drTypeWithExtraTransformSchema.parse(drType)}${suffix}/`;

const AGE_HREF_SUFFIX = {
  adults: '',
  y: '-y',
  s: '-s',
} as const;

const createAgeGroupIsActive = (
  drType: string | undefined,
  value: string | undefined
) => {
  const mainDrType = drTypeWithAgeTransformSchema.parse(drType);

  return (
    drType?.replace(mainDrType, '') ===
    AGE_HREF_SUFFIX[value as keyof typeof AGE_HREF_SUFFIX]
  );
};

export const EXTRA_HREF_SUFFIX = {
  normal: '',
  x: '-x',
} as const;

const createExtraIsActive = (
  drType: string | undefined,
  value: string | undefined
) => {
  const mainDrType = drTypeWithExtraTransformSchema.parse(drType);

  return (
    drType?.replace(mainDrType, '') ===
    EXTRA_HREF_SUFFIX[value as keyof typeof EXTRA_HREF_SUFFIX]
  );
};

export const AGE_GROUP = [
  {
    value: 'adults',
    Icon: AdultsSvg,
    translationKey: 'adults',
    createHref: createAgeGroupHref,
    isActive: createAgeGroupIsActive,
  },
  {
    value: 'y',
    Icon: PedSvg,
    translationKey: 'youth',
    createHref: createAgeGroupHref,
    isActive: createAgeGroupIsActive,
  },
  {
    value: 's',
    Icon: StudentsSvg,
    translationKey: 'students',
    createHref: createAgeGroupHref,
    isActive: createAgeGroupIsActive,
  },
] as const;

export const EXTRA_GROUP = [
  {
    value: 'normal',
    Icon: FamilyDrSvg,
    translationKey: 'extra.btn.normal',
    createHref: createExtraGroupHref,
    isActive: createExtraIsActive,
  },
  {
    value: 'x',
    Icon: ClinicSvg,
    translationKey: 'extra.btn.x',
    createHref: createExtraGroupHref,
    isActive: createExtraIsActive,
  },
] as const;

export const ACCEPTS_GROUP = [
  {
    value: 'y',
    Icon: CheckSvg,
    translationKey: 'accepts',
  },
  {
    value: 'n',
    Icon: BanSvg,
    translationKey: 'rejects',
  },
  {
    value: 'all',
    Icon: AllSvg,
    translationKey: 'all',
  },
] as const;
