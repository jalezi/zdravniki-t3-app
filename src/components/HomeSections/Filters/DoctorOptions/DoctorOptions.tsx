import { clsx } from 'clsx';
import { useState } from 'react';

import { AllSvg, FamilyDrSvg, FilterSvg } from '@/components/Shared/Icons';

import styles from './DoctorOptions.module.css';

const DoctorOptions = () => {
  const [expanded, setExpanded] = useState(false);

  const drOptContainerStyles = clsx(
    styles.DoctorOptions__container,
    expanded && styles.Expanded
  );

  const drOptContentStyles = clsx(
    styles.DoctorOptions__content,
    expanded && styles.Expanded
  );

  const drOptionTogglerStyles = clsx(
    styles.DoctorOptions__toggler,
    expanded && styles.Expanded
  );

  const onToggleClick = () => setExpanded(prev => !prev);

  return (
    <div id="dr-opt-container" className={drOptContainerStyles}>
      <div id="dr-opt-content" className={drOptContentStyles}>
        content
      </div>
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
