import styles from './Filters.module.css';

type Props = { onLayoutChange: () => void };

const Filters = ({ onLayoutChange }: Props) => {
  return (
    <div id="filters-container" className={styles.Filters}>
      <div id="filters-first-container">Info</div>
      <div
        id="filters-second-container"
        className={styles.FiltersSecondContainer}
      >
        <input type="search" placeholder="search..." />
        <button type="button" onClick={onLayoutChange}>
          show hide
        </button>
      </div>
    </div>
  );
};

export default Filters;
