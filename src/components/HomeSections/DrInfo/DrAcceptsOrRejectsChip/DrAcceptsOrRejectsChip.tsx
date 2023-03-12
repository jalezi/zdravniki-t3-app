import { clsx } from 'clsx';
import { useTranslation } from 'next-i18next';

import { Chip } from '@/components/Shared/Chip';
import type { ChipProps } from '@/components/Shared/Chip';
import { Tooltip } from '@/components/Shared/Tooltip';
import type { DrAccepts } from '@/lib/types/doctors';
import { formatDate, formatNumberRound } from '@/lib/utils/common';
import type { Doctor } from '@/server/api/routers/doctors';

import styles from './DrAcceptsOrRejectsChip.module.css';

const VariantStyles = {
  y: styles.Accepts,
  n: styles.Rejects,
} as const;

type DrAcceptsProps = {
  accepts: DrAccepts;
  id: string;
  tooltipContent: React.ReactNode;
} & Omit<ChipProps, 'iconName' | 'id'>;

export const DrAcceptsOrRejectsChip = ({
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
      <Tooltip.Tooltip anchorSelect={'#' + id} place="bottom">
        {tooltipContent}
      </Tooltip.Tooltip>
    </>
  );
};

type Load = Doctor['load'];

export type AcceptsOrRejectsProps = {
  load: Load;
  override: Doctor['override'];
} & Omit<DrAcceptsProps, 'tooltipContent' | 'text'>;

const AcceptsOrRejects = ({
  accepts,
  load,
  override,
  ...rest
}: AcceptsOrRejectsProps) => {
  const { t } = useTranslation('doctor');

  const acceptsTranslation =
    accepts === 'y' ? t('zzzs.accepts') : t('zzzs.rejects');

  const title = t('zzzs.headQuotient');
  const changeOn = t('info.changedOn');

  const { isAcceptsOverride, isAvailabilityOverride, isDateOverride, note } =
    override;
  const hasOverride = [
    isAcceptsOverride,
    isAvailabilityOverride,
    isDateOverride,
  ].some(Boolean);

  const date = isDateOverride && formatDate(override.date, 'en');

  const tooltip = (
    <>
      <Tooltip.TooltipContent as="p" align="center" weight="700">
        {title}
      </Tooltip.TooltipContent>
      <Tooltip.TooltipContent as="p" align="center" weight="700" size="lg">
        {formatNumberRound(load)}
      </Tooltip.TooltipContent>
      {hasOverride && (
        <>
          <Tooltip.TooltipDivider />
          <Tooltip.TooltipContent as="p" weight="500">
            {note}
          </Tooltip.TooltipContent>
          {isDateOverride && (
            <Tooltip.TooltipContent as="p" weight="500">
              {changeOn}
              {date}
            </Tooltip.TooltipContent>
          )}
        </>
      )}
    </>
  );

  return (
    <DrAcceptsOrRejectsChip
      accepts={accepts}
      text={acceptsTranslation}
      tooltipContent={tooltip}
      {...rest}
    />
  );
};

export default AcceptsOrRejects;
