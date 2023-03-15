import { clsx } from 'clsx';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';
import { useWindowSize } from 'usehooks-ts';

import { Chip } from '@/components/Shared/Chip';
import { BREAKPOINTS } from '@/lib/constants';
import useBoundStore from '@/lib/store/useBoundStore';
import { baseDrTypeSchema } from '@/lib/types/dr-type-page';

import styles from './DoctorOptions.module.css';
import { FilterGroups } from './FIlterGroups';
import { DrTypeChip } from '../../DrInfo/DrTypeChip';

const ACCEPTS_SVG = {
  y: 'CheckSvg',
  n: 'BanSvg',
  all: 'AllSvg',
} as const;

const DoctorOptions = () => {
  const [expanded, setExpanded] = useState(false);
  const { width } = useWindowSize();
  const isMediumMediaQuery = width >= BREAKPOINTS.md;
  const { query } = useRouter();
  const accepts = useBoundStore(state => state.accepts);

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
  const drTypeTranslated = t(drTypeParsed);

  const AcceptsSvg = ACCEPTS_SVG[`${accepts}`];

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
          <Chip iconName="FilterSvg" size="md" iconSize="lg" text="" />
          <span>Filter</span>
          <DrTypeChip.DrTypeChip
            drType={drTypeParsed}
            text={drTypeTranslated}
            size="md"
            iconSize="lg"
          />
          <hr />
          <Chip iconName={AcceptsSvg} size="md" iconSize="lg" text="" />
        </button>
      )}
    </div>
  );
};

export default DoctorOptions;
