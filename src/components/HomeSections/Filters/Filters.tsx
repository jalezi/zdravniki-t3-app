import { clsx } from 'clsx';

import { IconButton } from '@/components/Shared/Buttons';
import { ListSvg, MapSvg } from '@/components/Shared/Icons';

import styles from './Filters.module.css';
import type { View } from '../types';

type Props = { onLayoutChange: () => void; view: View };

const Filters = ({ onLayoutChange, view }: Props) => {
  const toggleViewContaineStyles = clsx(
    styles.ToggleViewContainer,
    view === 'loading' && styles.Loading
  );
  const iconButtonStyles = clsx(
    styles.Btn,
    view !== 'list' && styles.Map,
    view === 'list' && styles.List
  );

  return (
    <div id="filters-container" className={styles.Filters}>
      <div id="filters-first-container">Info</div>
      <div
        id="filters-second-container"
        className={styles.FiltersSecondContainer}
      >
        <div id="search-container">
          <label>
            <input type="search" placeholder="search..." />
          </label>
        </div>
        <div id="toggle-view-container" className={toggleViewContaineStyles}>
          <IconButton
            type="button"
            onClick={onLayoutChange}
            className={iconButtonStyles}
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
