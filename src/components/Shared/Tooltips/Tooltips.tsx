import { clsx } from 'clsx';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import type { ITooltip as ReactTooltipProps } from 'react-tooltip';
import { z } from 'zod';

import styles from './Tooltips.module.css';

const sizeSchema = z.enum(['sm']);
type Size = z.infer<typeof sizeSchema>;

const customProps = z.object({
  size: sizeSchema.optional().default('sm').optional(),
});
type CustomProps = z.infer<typeof customProps>;

export type TooltipProps = ReactTooltipProps & CustomProps;

const CLASS_NAME = {
  sm: styles.Small,
} satisfies Record<Size, string | undefined>;

export const Tooltip = ({ className, size = 'sm', ...props }: TooltipProps) => {
  const reactTooltipProps = { ...props };

  const validSize = sizeSchema.safeParse(size);
  const sizeStyles = CLASS_NAME[`${validSize.success ? size : 'sm'}`];

  const tooltipStyles = clsx(styles.Tooltip, sizeStyles, className);

  return <ReactTooltip className={tooltipStyles} {...reactTooltipProps} />;
};
