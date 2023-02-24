import { clsx } from 'clsx';
import { useEffect, useState } from 'react';
import { useWindowSize } from 'usehooks-ts';

import { AllSvg, FamilyDrSvg, FilterSvg } from '@/components/Shared/Icons';
import { BREAKPOINTS } from '@/lib/constants';

import styles from './DoctorOptions.module.css';
import { FilterGroups } from './FIlterGroups';

const DoctorOptions = () => {
  const [expanded, setExpanded] = useState(false);
  const { width } = useWindowSize();
  const isMediumMediaQuery = width >= BREAKPOINTS.md;

  useEffect(() => {
    if (isMediumMediaQuery) {
      setExpanded(false);
    }
  }, [isMediumMediaQuery]);

  const shouldApplyExpanded = isMediumMediaQuery ? false : expanded;

  const drOptContainerStyles = clsx(styles.DoctorOptionsContainer);
  const drOptionTogglerStyles = clsx(styles.DoctorOptionsToggler);
  const drOptContentStyles = clsx(
    styles.DoctorOptionsContent,
    shouldApplyExpanded && styles.Expanded
  );

  const onToggleClick = () => setExpanded(prev => !prev);

  return (
    <div id="dr-opt-container" className={drOptContainerStyles}>
      <div id="dr-opt-content" className={drOptContentStyles}>
        <FilterGroups key={isMediumMediaQuery.toString()} />
      </div>
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
