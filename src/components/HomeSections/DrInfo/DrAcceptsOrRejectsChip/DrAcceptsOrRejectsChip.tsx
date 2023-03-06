import { clsx } from 'clsx';

import { Chip } from '@/components/Shared/Chip';
import type { ChipProps } from '@/components/Shared/Chip';
import Tooltips from '@/components/Shared/Tooltips';
import type { DrAccepts } from '@/lib/types/doctors';

import styles from './DrAcceptsOrRejectsChip.module.css';

const VariantStyles = {
  y: styles.Accepts,
  n: styles.Rejects,
} as const;

type TooltipProps = {
  tooltipContent?: React.ReactNode;
};

type DrAcceptsProps = { accepts: DrAccepts; id: string } & TooltipProps &
  Omit<ChipProps, 'iconName' | 'id'>;

const DrAcceptsOrRejectsChip = ({
  accepts,
  id,
  text,
  tooltipContent,
  ...props
}: DrAcceptsProps) => {
  const chipStyles = clsx(
    styles.DrAcceptsOrRejectsChip,
    VariantStyles[`${accepts}`]
  );

  return (
    <>
      <Chip
        className={chipStyles}
        iconName={accepts === 'y' ? 'CheckCircleSvg' : 'Ban2Svg'}
        size="xs"
        text={text}
        id={id}
        {...props}
      />
      {tooltipContent ? (
        <Tooltips.Tooltip anchorSelect={`#${id}`} place="bottom">
          {tooltipContent}
        </Tooltips.Tooltip>
      ) : null}
    </>
  );
};

export default DrAcceptsOrRejectsChip;
