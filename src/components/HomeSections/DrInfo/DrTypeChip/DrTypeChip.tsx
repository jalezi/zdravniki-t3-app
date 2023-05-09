import { clsx } from 'clsx';
import z from 'zod';

import type { ChipProps } from '@/components/Shared/Chip';
import { Chip } from '@/components/Shared/Chip';
import type { IconName } from '@/components/Shared/Icons';
import type { BaseDrType } from '@/lib/types/dr-type-page';

import styles from './DrTypeChip.module.css';

type ExtendedBaseDrType = BaseDrType | 'gp-x' | 'gp-f' | 'den-y' | 'den-s';

export const dentistSchema = z.enum(['den', 'den-y', 'den-s']);
type DentistDrType = z.infer<typeof dentistSchema>;

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
  'den-y': 'DentistSvg',
  'den-s': 'DentistSvg',
} satisfies Record<ExtendedBaseDrType, IconName>;

export const AGE_GROUP_SVG = {
  den: 'AdultsSvg',
  'den-y': 'YouthSvg',
  'den-s': 'StudentsSvg',
} satisfies Record<DentistDrType, IconName>;

type DrTypeChipProps = {
  drType: ExtendedBaseDrType;
  text: string;
  textAge?: string;
  size?: ChipProps['size'];
  iconSize?: ChipProps['iconSize'];
  variant?: 'text' | 'contained';
  textOverflowHidden?: boolean;
  className?: string;
  classNameFirst?: string;
  classNameSecond?: string;
};

export const DrTypeChip = ({
  drType,
  text,
  textAge,
  size = 'sm',
  iconSize = 'xl',
  variant = 'text',
  textOverflowHidden = false,
  className,
  classNameFirst,
  classNameSecond,
}: DrTypeChipProps) => {
  const DrTypeSvg = DR_TYPE_SVG[`${drType}`];

  const dentistDrType = dentistSchema.safeParse(drType);

  const DentistDrTypeSvg = dentistDrType.success
    ? AGE_GROUP_SVG[`${dentistDrType.data}`]
    : null;

  const wrapperStyles = clsx(styles.DrTypeChipWrapper, className);

  const firstChipStyles = clsx(
    styles.DrTypeChip,
    variant === 'contained' && styles.WithBg,
    dentistDrType.success && styles.First,
    classNameFirst
  );
  const secondChipStyles = clsx(
    styles.DrTypeChip,
    variant === 'contained' && styles.WithBg,
    dentistDrType.success && styles.Second,
    classNameSecond
  );

  const textStyles = clsx(
    styles.DrTypeChipText,
    textOverflowHidden && styles.TextOverflowHidden
  );

  return (
    <span className={wrapperStyles}>
      <Chip
        iconName={DrTypeSvg}
        size={size}
        iconSize={iconSize}
        text={text}
        className={firstChipStyles}
        textClassName={textStyles}
      />
      {dentistDrType.success && DentistDrTypeSvg && (
        <Chip
          iconName={DentistDrTypeSvg}
          iconOnEnd
          size={size}
          iconSize={iconSize}
          text={textAge}
          className={secondChipStyles}
          textClassName={textStyles}
        />
      )}
    </span>
  );
};
