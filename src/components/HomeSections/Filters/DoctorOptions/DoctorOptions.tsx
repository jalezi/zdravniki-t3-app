import { clsx } from 'clsx';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useWindowSize } from 'usehooks-ts';

import { FilterButton } from '@/components/HomeSections/Filters/DoctorOptions/FilterButton';
import { AllSvg, FamilyDrSvg, FilterSvg } from '@/components/Shared/Icons';
import { BREAKPOINTS } from '@/lib/constants';

import styles from './DoctorOptions.module.css';

type DoctorOptionsContentProps = {
  expanded: boolean;
};

const DoctorOptionsContent = ({ expanded }: DoctorOptionsContentProps) => {
  const { width } = useWindowSize();

  const isMediumMediaQuery = width >= BREAKPOINTS.md;
  const shouldApplyExpanded = isMediumMediaQuery ? false : expanded;

  const drOptContentStyles = clsx(
    styles.DoctorOptions__content,
    shouldApplyExpanded && styles.Expanded
  );

  const drOptGroupStyles = clsx(styles.DoctorOptions__content_group);
  return (
    <div id="dr-opt-content" className={drOptContentStyles}>
      <div className={drOptGroupStyles}>
        <FilterButton
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          Icon={FamilyDrSvg}
          text="družinski zdravnik"
          href="/"
          passHref
          as={Link}
          isActive
        />
        <FilterButton
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          Icon={FamilyDrSvg}
          text="ginekolog"
          href="/"
          passHref
          as={Link}
        />
      </div>
      <div className={drOptGroupStyles}>Group 2</div>
      <div className={drOptGroupStyles}>Group 3</div>
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

  const drOptContainerStyles = clsx(styles.DoctorOptions__container);
  const drOptionTogglerStyles = clsx(styles.DoctorOptions__toggler);

  const onToggleClick = () => setExpanded(prev => !prev);

  return (
    <div id="dr-opt-container" className={drOptContainerStyles}>
      <DoctorOptionsContent
        key={isMediumMediaQuery.toString()}
        expanded={expanded}
      />
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
    </div>
  );
};

export default DoctorOptions;
