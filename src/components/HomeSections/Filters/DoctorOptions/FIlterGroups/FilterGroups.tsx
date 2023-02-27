import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import { drTypeWithAgeSchema } from '@/lib/types/dr-type-page';

import styles from './FilterGroups.module.css';
import { FilterButton } from '../FilterButton';
import { ACCEPTS_GROUP, AGE_GROUP, DR_GROUP } from '../groups';

const AGE_HREF_SUFFIX = {
  adults: '',
  y: '-y',
  s: '-s',
} as const;

const FilterGroups = () => {
  const { t } = useTranslation('doctor');
  const { query } = useRouter();
  const [accepts, setAccepts] = useState<'all' | 'y' | 'n'>('all');

  const onAcceptsChange = (value: 'all' | 'y' | 'n') => {
    setAccepts(value);
  };

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
            href={item.href}
            passHref
            as={Link}
            isActive={query.type?.includes(item.value)}
          />
        ))}
      </div>
      {drTypeWithAgeSchema.safeParse(query.type).success ? (
        <div className={ageGroupStyles}>
          {AGE_GROUP.map(item => (
            <FilterButton
              key={item.value}
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              Icon={item.Icon}
              text={t(item.translationKey)}
              as={Link}
              href={item.createHref(
                query.type as string, // TODO: fix this
                AGE_HREF_SUFFIX[`${item.value}`]
              )}
              passHref
              isActive={item.isActive(query?.type as string, item.value)}
            />
          ))}
        </div>
      ) : null}
      <div className={acceptsGroupStyles}>
        {ACCEPTS_GROUP.map(item => (
          <FilterButton
            key={item.value}
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            Icon={item.Icon}
            text={t(item.translationKey)}
            as="button"
            type="button"
            isActive={item.value === accepts}
            onClick={() => onAcceptsChange(item.value)}
          />
        ))}
      </div>
    </>
  );
};

export default FilterGroups;
