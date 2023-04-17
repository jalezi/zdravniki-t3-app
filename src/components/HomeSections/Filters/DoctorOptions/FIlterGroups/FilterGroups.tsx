import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useEffect } from 'react';
import { useWindowSize } from 'usehooks-ts';

import { BREAKPOINTS } from '@/lib/constants';
import useBoundStore from '@/lib/store/useBoundStore';
import {
  drTypeAcceptsOrRejectSchema,
  drTypeWithAgeSchema,
  drTypeWithExtraSchema,
} from '@/lib/types/dr-type-page';
import { getDefaultFontSize } from '@/lib/utils/common';
import { parseHash } from '@/lib/utils/url-hash';

import styles from './FilterGroups.module.css';
import { FilterButton } from '../FilterButton';
import {
  ACCEPTS_GROUP,
  AGE_GROUP,
  DR_GROUP,
  EXTRA_GROUP,
  EXTRA_HREF_SUFFIX,
} from '../groups';

const AGE_HREF_SUFFIX = {
  adults: '',
  y: '-y',
  s: '-s',
} as const;

const FilterGroups = () => {
  const { t } = useTranslation('doctor');
  const { query } = useRouter();
  const accepts = useBoundStore(state => state.accepts);
  const setAccepts = useBoundStore(state => state.setAccepts);
  const fontSize = getDefaultFontSize() ?? 16;
  const { width } = useWindowSize();
  const isLargeMediumQuery = width >= (BREAKPOINTS.lg * fontSize) / 16;

  useEffect(() => {
    const documentLocHash = document.location.hash;
    const parsedHash = parseHash(documentLocHash);
    if (parsedHash.success) {
      const [accepts, _mapData, _search] = parsedHash.data;
      setAccepts(accepts);
    }
  }, [setAccepts]);

  const onAcceptsChange = (value: 'all' | 'y' | 'n') => {
    setAccepts(value);
  };

  const drGroupStyles = clsx(styles.FilterGroups, styles.DrGroup);
  const ageGroupStyles = clsx(styles.FilterGroups, styles.AgeGroup);
  const acceptsGroupStyles = clsx(styles.FilterGroups, styles.AcceptsGroup);
  const extraGroupStyles = clsx(styles.FilterGroups, styles.ExtraGroup);

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
            alwaysText={isLargeMediumQuery}
          />
        ))}
      </div>
      {drTypeWithAgeSchema.safeParse(query.type).success ? (
        <div className={ageGroupStyles}>
          {AGE_GROUP.map(item => (
            <FilterButton
              key={item.value}
              Icon={item.Icon}
              text={t(item.translationKey)}
              as={Link}
              href={item.createHref(
                query.type as string, // TODO: fix this
                AGE_HREF_SUFFIX[`${item.value}`]
              )}
              passHref
              isActive={item.isActive(query?.type as string, item.value)}
              aria-label={
                item.isActive(query?.type as string, item.value)
                  ? undefined
                  : item.translationKey
              }
            />
          ))}
        </div>
      ) : null}

      {drTypeWithExtraSchema.safeParse(query.type).success ? (
        <div className={extraGroupStyles}>
          {EXTRA_GROUP.map(item => (
            <FilterButton
              key={item.value}
              Icon={item.Icon}
              text={t(item.translationKey)}
              as={Link}
              href={item.createHref(
                query.type as string,
                EXTRA_HREF_SUFFIX[item.value]
              )}
              isActive={item.isActive(query?.type as string, item.value)}
              aria-label={
                item.isActive(query?.type as string, item.value)
                  ? undefined
                  : item.translationKey
              }
            />
          ))}
        </div>
      ) : null}
      {drTypeAcceptsOrRejectSchema.safeParse(query.type).success ? (
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
              aria-label={
                item.value === accepts ? undefined : item.translationKey
              }
            />
          ))}
        </div>
      ) : null}
    </>
  );
};

export default FilterGroups;
