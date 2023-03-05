import { clsx } from 'clsx';

import { Polymorphic } from '@/components/Shared/Polymorphic';
import type { PolymorphicComponentProps } from '@/components/Shared/Polymorphic';

import styles from './Icon.module.css';

import { icons } from '.';

export type IconName = keyof typeof icons;

type CustomProps = { name: IconName } | { children: React.ReactNode };

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
    const { name, ...rest } = props;
    const Svg = icons[`${name}`];
    return (
      <Polymorphic as="span" className={iconStyles} {...rest}>
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
