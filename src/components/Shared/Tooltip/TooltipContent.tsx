import { clsx } from 'clsx';
import { z } from 'zod';

import styles from './Tooltip.module.css';
import type { PolymorphicComponentProps } from '../Polymorphic';
import { Polymorphic } from '../Polymorphic';

const allowedTags = z.enum(['p', 'span', 'div', 'ul', 'li']);

type AllowedTags = z.infer<typeof allowedTags>;

const sizeSchema = z.enum(['xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl']);
type Size = z.infer<typeof sizeSchema>;

const weightSchema = z.enum(['500', '700']);
type Weight = z.infer<typeof weightSchema>;

const alignSchema = z.enum(['left', 'center', 'right']);
type Align = z.infer<typeof alignSchema>;

const customProps = z.object({
  as: allowedTags.optional().default('p').optional(),
  align: alignSchema.optional().default('left').optional(),
  size: sizeSchema.optional().default('sm').optional(),
  weight: weightSchema.optional().default('500').optional(),
});

type CustomProps = z.infer<typeof customProps>;

const WEIGHT_STYLES = {
  500: styles.Regular,
  700: styles.Bold,
} satisfies Record<Weight, string | undefined>;

const SIZE_STYLES = {
  xxs: styles.XXSmall,
  xs: styles.XSmall,
  sm: styles.Small,
  md: styles.Medium,
  lg: styles.Large,
  xl: styles.XLarge,
  xxl: styles.XXLarge,
} satisfies Record<Size, string | undefined>;

const ALIGN_STYLES = {
  left: styles.Left,
  center: styles.Center,
  right: styles.Right,
} satisfies Record<Align, string | undefined>;

type TooltipContentProps = CustomProps &
  Omit<PolymorphicComponentProps<AllowedTags>, keyof CustomProps>;

export const TooltipContent = ({
  as = 'p',
  align = 'left',
  className,
  children,
  size = 'sm',
  weight = '500',
  ...props
}: TooltipContentProps) => {
  const validAlign = alignSchema.safeParse(align);
  const validSize = sizeSchema.safeParse(size);
  const validWeight = weightSchema.safeParse(weight);
  const validTag = allowedTags.safeParse(as);

  const alignStyles = ALIGN_STYLES[`${validAlign.success ? align : 'left'}`];
  const sizeStyles = SIZE_STYLES[`${validSize.success ? size : 'sm'}`];
  const weightStyles = WEIGHT_STYLES[`${validWeight.success ? weight : '500'}`];
  const tag = validTag.success ? as : 'p';

  const tooltipContentStyles = clsx(
    styles.TooltipContent,
    alignStyles,
    sizeStyles,
    weightStyles,
    className
  );

  return (
    <Polymorphic as={tag} className={tooltipContentStyles} {...props}>
      {children}
    </Polymorphic>
  );
};

export const TooltipDivider = () => <hr className={styles.Divider} />;
