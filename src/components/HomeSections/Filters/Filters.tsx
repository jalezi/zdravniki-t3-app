import { clsx } from 'clsx';
import { useRef, useState } from 'react';

import { IconButton } from '@/components/Shared/Buttons';
import { ListSvg, MapSvg } from '@/components/Shared/Icons';

import { DoctorOptions } from './DoctorOptions';
import styles from './Filters.module.css';
import { SearchInput } from './SearchInput';
import type { View } from '../types';

type Props = { onLayoutChange: () => void; view: View };

const Filters = ({ onLayoutChange, view }: Props) => {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const [searchValue, setSearchValue] = useState('');

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
