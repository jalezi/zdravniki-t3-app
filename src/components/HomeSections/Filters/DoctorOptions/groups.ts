/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  AdultsSvg,
  AllSvg,
  BanSvg,
  CheckSvg,
  DentistSvg,
  FamilyDrSvg,
  GynSvg,
  PedSvg,
  StudentsSvg,
} from '@/components/Shared/Icons';

export const DR_GROUP = [
  { value: 'gp', Icon: FamilyDrSvg, translationKey: 'gp' },
  { value: 'ped', Icon: PedSvg, translationKey: 'ped' },
  { value: 'gyn', Icon: GynSvg, translationKey: 'gyn' },
  { value: 'den', Icon: DentistSvg, translationKey: 'den' },
];

export const AGE_GROUP = [
  {
    value: 'adults',
    Icon: AdultsSvg,
    translationKey: 'adults',
  },
  {
    value: 'y',
    Icon: PedSvg,
    translationKey: 'youth',
  },
  {
    value: 's',
    Icon: StudentsSvg,
    translationKey: 'students',
  },
];

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
];
