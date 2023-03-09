import { clsx } from 'clsx';

import { Chip } from '@/components/Shared/Chip';
import type { ChipProps } from '@/components/Shared/Chip';
import type { DrAccepts } from '@/lib/types/doctors';

import styles from './DrAcceptsOrRejectsChip.module.css';

const VariantStyles = {
  y: styles.Accepts,
  n: styles.Rejects,
} as const;

type DrAcceptsProps = { accepts: DrAccepts; id: string } & Omit<
  ChipProps,
  'iconName' | 'id'
>;

const DrAcceptsOrRejectsChip = ({
  accepts,
  id,
  text,
  ...props
}: DrAcceptsProps) => {
  const chipStyles = clsx(
    styles.DrAcceptsOrRejectsChip,
    VariantStyles[`${accepts}`]
  );

  return (
    <Chip
      className={chipStyles}
      iconName={accepts === 'y' ? 'CheckCircleSvg' : 'Ban2Svg'}
      size="xs"
      text={text}
      id={id}
      {...props}
    />
  );
};

export default DrAcceptsOrRejectsChip;
