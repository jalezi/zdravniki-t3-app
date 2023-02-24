import { clsx } from 'clsx';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';
import { useWindowSize } from 'usehooks-ts';

import { FilterButton } from '@/components/HomeSections/Filters/DoctorOptions/FilterButton';
import { AllSvg, FamilyDrSvg, FilterSvg } from '@/components/Shared/Icons';
import { BREAKPOINTS } from '@/lib/constants';

import styles from './DoctorOptions.module.css';
import { ACCEPTS_GROUP, AGE_GROUP, DR_GROUP } from './groups';

type DoctorOptionsContentProps = {
  expanded: boolean;
};

const DoctorOptionsContent = ({ expanded }: DoctorOptionsContentProps) => {
  const { width } = useWindowSize();
  const { t } = useTranslation('doctor');

  const isMediumMediaQuery = width >= BREAKPOINTS.md;
  const shouldApplyExpanded = isMediumMediaQuery ? false : expanded;

  const drOptContentStyles = clsx(
    styles.DoctorOptionsContent,
    shouldApplyExpanded && styles.Expanded
  );

  const drOptGroupStyles = clsx(styles.DoctorOptionsContentGroup);
  return (
    <div id="dr-opt-content" className={drOptContentStyles}>
      <div className={drOptGroupStyles}>
        {DR_GROUP.map(item => (
          <FilterButton
            key={item.value}
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            Icon={item.Icon}
            text={t(item.translationKey)}
            href="/"
            passHref
            as={Link}
            isActive={item.value === 'gp'}
          />
        ))}
      </div>
      <div className={drOptGroupStyles}>
        {AGE_GROUP.map(item => (
          <FilterButton
            key={item.value}
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            Icon={item.Icon}
            text={t(item.translationKey)}
            as="button"
            type="button"
            isActive={item.value === 'adults'}
          />
        ))}
      </div>
      <div className={drOptGroupStyles}>
        {ACCEPTS_GROUP.map(item => (
          <FilterButton
            key={item.value}
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            Icon={item.Icon}
            text={t(item.translationKey)}
            as="button"
            type="button"
            isActive={item.value === 'y'}
          />
        ))}
      </div>
    </div>
  );
};

const DoctorOptions = () => {
  const [expanded, setExpanded] = useState(false);
  const { width } = useWindowSize();
  const isMediumMediaQuery = width >= BREAKPOINTS.md;

  useEffect(() => {
    if (isMediumMediaQuery) {
      setExpanded(false);
    }
  }, [isMediumMediaQuery]);

  const drOptContainerStyles = clsx(styles.DoctorOptionsContainer);
  const drOptionTogglerStyles = clsx(styles.DoctorOptionsToggler);

  const onToggleClick = () => setExpanded(prev => !prev);

  return (
    <div id="dr-opt-container" className={drOptContainerStyles}>
      <DoctorOptionsContent
        key={isMediumMediaQuery.toString()}
        expanded={expanded}
      />
      {isMediumMediaQuery ? null : (
        <button
          id="dr-opt-toggler"
          type="button"
          onClick={onToggleClick}
          className={drOptionTogglerStyles}
        >
          <FilterSvg />
          <span>Filter</span>
          <FamilyDrSvg />
          <span>družinski zdravnik</span>
          <hr />
          <AllSvg />
        </button>
      )}
    </div>
  );
};

export default DoctorOptions;
