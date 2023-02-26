import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';

import { drTypeWithAgeSchema } from '@/lib/types/dr-type-page';
import { parseHash, stringifyHash } from '@/lib/utils/url-hash';

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
  const { query, asPath, replace, locale } = useRouter();
  const parsedHash = parseHash(asPath);
  const [accepts, setAccepts] = useState<'all' | 'y' | 'n' | null>(null);

  // FIX ME: this is a hack to make sure that the initial state is set; when set on initial useState declaration, on page refresh if not "all" will give hydration error.
  const initialAccepts = parsedHash.success ? parsedHash.data[0] : null;
  useEffect(() => {
    if (!initialAccepts) return;
    setAccepts(initialAccepts);
  }, [initialAccepts]);

  const onAcceptsChange = (value: 'all' | 'y' | 'n') => {
    setAccepts(value);
    if (!parsedHash.success) return;
    const newHash = stringifyHash([value, parsedHash.data[1], '']);
    const newPath = asPath.replace(document.location.hash, newHash);
    void replace(newPath, newPath, {
      shallow: true,
      locale,
    });
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
