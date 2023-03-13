import { clsx } from 'clsx';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';
import { useWindowSize } from 'usehooks-ts';

import {
  AllSvg,
  DentistSvg,
  FamilyDrSvg,
  FilterSvg,
  GynSvg,
  PedSvg,
} from '@/components/Shared/Icons';
import { BREAKPOINTS } from '@/lib/constants';
import type { BaseDrType } from '@/lib/types/dr-type-page';
import { baseDrTypeSchema } from '@/lib/types/dr-type-page';

import styles from './DoctorOptions.module.css';
import { FilterGroups } from './FIlterGroups';

const DR_TYPE_SVG = {
  gp: FamilyDrSvg,
  ped: PedSvg,
  gyn: GynSvg,
  den: DentistSvg,
} satisfies Record<BaseDrType, React.FC>;

const DoctorOptions = () => {
  const [expanded, setExpanded] = useState(false);
  const { width } = useWindowSize();
  const isMediumMediaQuery = width >= BREAKPOINTS.md;
  const { query } = useRouter();
  const { t } = useTranslation('doctor');

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

  const drTypeParsed = baseDrTypeSchema.parse(query.type);
  const DrTypeSvg = DR_TYPE_SVG[`${drTypeParsed}`];
  const drTypeTranslated = t(drTypeParsed);

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
          <DrTypeSvg />
          <span>{drTypeTranslated}</span>
          <hr />
          <AllSvg />
        </button>
      )}
    </div>
  );
};

export default DoctorOptions;
