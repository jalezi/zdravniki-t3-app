import { clsx } from 'clsx';

import type { ChipProps } from '@/components/Shared/Chip';
import { Chip } from '@/components/Shared/Chip';
import type { IconName } from '@/components/Shared/Icons';
import type { BaseDrType } from '@/lib/types/dr-type-page';

import styles from './DrTypeChip.module.css';

export type ExtraChipProps = {
  hasText?: boolean;
  variant?: 'text' | 'contained';
} & Omit<ChipProps, 'iconName'>;

export const ExtraChip = ({
  iconSize = 'xl',
  id,
  size = 'sm',
  text,
  variant = 'text',
  className,
}: ExtraChipProps) => {
  const chipStyles = clsx(
    styles.DrTypeChip,
    styles.Extra,
    variant === 'contained' && styles.WithBg,
    className
  );

  return (
    <Chip
      id={id}
      iconName="ClinicSvg"
      size={size}
      iconSize={iconSize}
      text={text}
      className={chipStyles}
    />
  );
};
export const FloatingChip = ({
  iconSize = 'xl',
  id,
  size = 'sm',
  text,
  variant = 'text',
  className,
}: ExtraChipProps) => {
  const chipStyles = clsx(
    styles.DrTypeChip,
    styles.Floating,
    variant === 'contained' && styles.WithBg,
    className
  );

  return (
    <Chip
      id={id}
      iconName="FloatingSvg"
      size={size}
      iconSize={iconSize}
      text={text}
      className={chipStyles}
    />
  );
};

const DR_TYPE_SVG = {
  gp: 'FamilyDrSvg',
  'gp-f': 'FamilyDrSvg',
  'gp-x': 'FamilyDrSvg',
  ped: 'PedSvg',
  gyn: 'GynSvg',
  den: 'DentistSvg',
} satisfies Record<BaseDrType, IconName>;

type DrTypeChipProps = {
  drType: BaseDrType;
  text: string;
  size?: ChipProps['size'];
  iconSize?: ChipProps['iconSize'];
  variant?: 'text' | 'contained';
};

export const DrTypeChip = ({
  drType,
  text,
  size = 'sm',
  iconSize = 'xl',
  variant = 'text',
}: DrTypeChipProps) => {
  const DrTypeSvg = DR_TYPE_SVG[`${drType}`];

  const chipStyles = clsx(
    styles.DrTypeChip,
    variant === 'contained' && styles.WithBg
  );

  return (
    <Chip
      iconName={DrTypeSvg}
      size={size}
      iconSize={iconSize}
      text={text}
      className={chipStyles}
    />
  );
};
