import { clsx } from 'clsx';

import type { IconName } from '@/components/Shared/Icons';
import { Icon } from '@/components/Shared/Icons';
import type { PolymorphicComponentProps } from '@/components/Shared/Polymorphic';
import { Polymorphic } from '@/components/Shared/Polymorphic';

import styles from './Chip.module.css';
import type { IconSize } from '../Icons/Icon';

const SizeStyles = {
  xs: styles.Chip__xs,
  sm: styles.Chip__sm,
  md: styles.Chip__md,
  lg: styles.Chip__lg,
  xl: styles.Chip__xl,
  xxl: styles.Chip__xxl,
} as const;

export type ChipSize = keyof typeof SizeStyles;
type CustomChipProps = {
  iconName?: IconName;
  text: string;
  size?: ChipSize;
  iconSize?: IconSize;
};
export type ChipProps = CustomChipProps &
  Omit<PolymorphicComponentProps<'span'>, 'children' | 'as'>;

const Chip = ({
  size = 'sm',
  className,
  iconName,
  iconSize,
  text,
  ...props
}: ChipProps) => {
  const chipStyles = clsx(styles.Chip, SizeStyles[`${size}`], className);

  return (
    <Polymorphic as="span" className={chipStyles} {...props}>
      {iconName ? <Icon name={iconName} size={iconSize ?? size} /> : null}
      <span>{text}</span>
    </Polymorphic>
  );
};

export default Chip;
