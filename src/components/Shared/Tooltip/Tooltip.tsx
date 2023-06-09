import { clsx } from 'clsx';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import type { ITooltip as ReactTooltipProps } from 'react-tooltip';
import { z } from 'zod';

export { TooltipDivider } from './TooltipContent';
export { TooltipContent } from './TooltipContent';

import styles from './Tooltip.module.css';

const sizeSchema = z.enum(['xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl']);
type Size = z.infer<typeof sizeSchema>;

const weightSchema = z.enum(['500', '700']);
type Weight = z.infer<typeof weightSchema>;

const alignSchema = z.enum(['left', 'center', 'right']);
type Align = z.infer<typeof alignSchema>;

const customProps = z.object({
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

export type TooltipProps = ReactTooltipProps & CustomProps;

export const Tooltip = ({
  className,
  align = 'left',
  size = 'sm',
  weight = '500',
  ...props
}: TooltipProps) => {
  const reactTooltipProps = { ...props };

  const validAlign = alignSchema.safeParse(align);
  const validSize = sizeSchema.safeParse(size);
  const validWeight = weightSchema.safeParse(weight);

  const alignStyles = ALIGN_STYLES[`${validAlign.success ? align : 'left'}`];
  const sizeStyles = SIZE_STYLES[`${validSize.success ? size : 'sm'}`];
  const weightStyles = WEIGHT_STYLES[`${validWeight.success ? weight : '500'}`];

  const tooltipStyles = clsx(
    styles.Tooltip,
    alignStyles,
    weightStyles,
    sizeStyles,
    className
  );

  return <ReactTooltip className={tooltipStyles} {...reactTooltipProps} />;
};
