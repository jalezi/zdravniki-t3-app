import { useTranslation } from 'next-i18next';

import { CircleChart } from '@/components/Shared/CircleChart';
import type { PolymorphicComponentProps } from '@/components/Shared/Polymorphic';
import { Tooltip } from '@/components/Shared/Tooltip';
import { formatPercent } from '@/lib/utils/common';

import styles from './DrAvailability.module.css';

export type DrAvailabilityProps = {
  id: string;
  value: number;
  tooltipContent: React.ReactNode;
} & Omit<PolymorphicComponentProps<'span'>, 'children' | 'as'>;

export const DrAvailability = ({
  id,
  value,
  tooltipContent,
}: DrAvailabilityProps) => {
  const firstValue = value > 1 ? 1 : value;
  const secondValue = value > 1 ? value - 1 : 0;

  return (
    <span id={id} className={styles.DrAvailability}>
      <CircleChart value={firstValue} className={styles.Large} />
      {secondValue > 0 && (
        <CircleChart value={secondValue} className={styles.Small} />
      )}
      <Tooltip.Tooltip anchorSelect={'#' + id} place="bottom">
        {tooltipContent}
      </Tooltip.Tooltip>
    </span>
  );
};

const Availability = ({
  value,
  ...rest
}: Omit<DrAvailabilityProps, 'tooltipContent'>) => {
  const { t } = useTranslation('doctor');

  const title = t('zzzs.doctorAvailabilityWithPercent', {
    number: formatPercent(value),
  });

  const description = t('zzzs.doctorAvailabilityDescription');

  const tooltip = (
    <>
      <Tooltip.TooltipContent as="p" weight="700">
        {title}
      </Tooltip.TooltipContent>
      <Tooltip.TooltipDivider />
      <Tooltip.TooltipContent as="p" weight="500">
        {description}
      </Tooltip.TooltipContent>
    </>
  );

  return <DrAvailability tooltipContent={tooltip} value={value} {...rest} />;
};

export default Availability;
