import { clsx } from 'clsx';

import { Polymorphic } from '@/components/Shared/Polymorphic';
import type { PolymorphicComponentProps } from '@/components/Shared/Polymorphic';

import styles from './Icon.module.css';

import { icons } from '.';
import type { IconName } from '.';

const IconsStyles = {
  xxs: styles.Icon__xxs,
  xs: styles.Icon__xs,
  sm: styles.Icon__sm,
  md: styles.Icon__md,
  lg: styles.Icon__lg,
  xl: styles.Icon__xl,
  xxl: styles.Icon__xxl,
} as const;

export type IconSize = keyof typeof IconsStyles;

type CustomProps =
  | { name: IconName; size?: IconSize }
  | { children: React.ReactNode };

export type IconProps = CustomProps &
  Omit<PolymorphicComponentProps<'span'>, 'children'>;

/**
 *
 * @description Use name or children to render an icon
 *
 */
const Icon = ({ className, ...props }: IconProps) => {
  const iconStyles = clsx(styles.Icon, className);

  if ('name' in props) {
    const { name, size = 'sm', ...rest } = props;
    const iconStylesWithSize = clsx(iconStyles, IconsStyles[`${size}`]);
    const Svg = icons[`${name}`];
    return (
      <Polymorphic as="span" className={iconStylesWithSize} {...rest}>
        <Svg />
      </Polymorphic>
    );
  }

  const { children, ...rest } = props;
  return (
    <Polymorphic as="span" className={iconStyles} {...rest}>
      {children}
    </Polymorphic>
  );
};

export default Icon;
