import { clsx } from 'clsx';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useDebounce } from 'usehooks-ts';

import { IconButton } from '@/components/Shared/Buttons';
import { ListSvg, MapSvg } from '@/components/Shared/Icons';
import { parseHash, stringifyHash } from '@/lib/utils/url-hash';

import { DoctorOptions } from './DoctorOptions';
import styles from './Filters.module.css';
import { SearchInput } from './SearchInput';
import type { View } from '../types';

type Props = { onLayoutChange: () => void; view: View };

const getNewPath = (asPath: string, searchValue: string) => {
  let newPath: string | null = null;
  const parsedHash = parseHash(asPath);
  if (parsedHash.success) {
    const [accepts, mapData] = parsedHash.data;
    const newHash = stringifyHash([accepts, mapData, searchValue]);

    if (decodeURI(newHash) !== decodeURI(document.location.hash)) {
      newPath = asPath.replace(document.location.hash, decodeURI(newHash));
    }
  }

  return newPath;
};

const Filters = ({ onLayoutChange, view }: Props) => {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { asPath, locale, replace } = useRouter();

  const [searchValue, setSearchValue] = useState('');
  const debouncedSearchValue = useDebounce(searchValue, 500);

  const newPath = useMemo(
    () =>
      debouncedSearchValue === searchValue
        ? getNewPath(asPath, debouncedSearchValue)
        : null,
    [asPath, debouncedSearchValue, searchValue]
  );

  useEffect(() => {
    if (!newPath) return;
    void replace(newPath, newPath, { locale, shallow: true });
  }, [locale, newPath, replace]);

  const onSearchChange = (value: string) => {
    setSearchValue(value);
  };

  const onToggleViewClick = () => {
    onLayoutChange();
    buttonRef.current?.blur();
  };

  const toggleViewContaineStyles = clsx(styles.ToggleViewContainer);
  const iconButtonStyles = clsx(
    styles.Btn,
    view === 'map' && styles.Map,
    view === 'list' && styles.List
  );

  return (
    <div id="filters-container" className={styles.Filters}>
      <DoctorOptions />
      <div id="filters-search-container" className={styles.SearchContainer}>
        <SearchInput
          ref={searchInputRef}
          value={searchValue}
          onChange={onSearchChange}
        />

        <div id="toggle-view-container" className={toggleViewContaineStyles}>
          <IconButton
            ref={buttonRef}
            type="button"
            onClick={onToggleViewClick}
            className={iconButtonStyles}
            aria-label={`"Toggle view" to ${view === 'map' ? 'list' : 'map'}`}
          >
            <MapSvg />
            <ListSvg />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default Filters;
