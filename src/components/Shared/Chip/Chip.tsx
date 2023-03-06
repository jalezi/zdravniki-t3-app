import { clsx } from 'clsx';

import type { IconName } from '@/components/Shared/Icons';
import { Icon } from '@/components/Shared/Icons';
import type { PolymorphicComponentProps } from '@/components/Shared/Polymorphic';
import { Polymorphic } from '@/components/Shared/Polymorphic';

import styles from './Chip.module.css';

const SizeStyles = {
  xs: styles.Chip__xs,
  sm: styles.Chip__sm,
  md: styles.Chip__md,
  lg: styles.Chip__lg,
} as const;

export type ChipSize = keyof typeof SizeStyles;
type CustomChipProps = { iconName?: IconName; text: string; size?: ChipSize };
export type ChipProps = CustomChipProps &
  Omit<PolymorphicComponentProps<'span'>, 'children' | 'as'>;

const Chip = ({
  size = 'sm',
  className,
  iconName,
  text,
  ...props
}: ChipProps) => {
  const chipStyles = clsx(styles.Chip, SizeStyles[`${size}`], className);

  return (
    <Polymorphic as="span" className={chipStyles} {...props}>
      {iconName ? <Icon name={iconName} /> : null}
      {text}
    </Polymorphic>
  );
};

export default Chip;
