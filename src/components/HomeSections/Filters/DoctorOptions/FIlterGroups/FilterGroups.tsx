import clsx from 'clsx';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';

import styles from './FilterGroups.module.css';
import { FilterButton } from '../FilterButton';
import { ACCEPTS_GROUP, AGE_GROUP, DR_GROUP } from '../groups';

const FilterGroups = () => {
  const { t } = useTranslation('doctor');

  const drGroupStyles = clsx(styles.FilterGroups, styles.DrGroup);
  const ageGroupStyles = clsx(styles.FilterGroups, styles.AgeGroup);
  const acceptsGroupStyles = clsx(styles.FilterGroups, styles.AcceptsGroup);
  return (
    <>
      <div className={drGroupStyles}>
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
      <div className={ageGroupStyles}>
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
      <div className={acceptsGroupStyles}>
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
    </>
  );
};

export default FilterGroups;
