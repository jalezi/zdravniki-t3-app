import { clsx } from 'clsx';
import { useState } from 'react';

import styles from '@/layouts/Layout.module.css';

const HomeSections = () => {
  const [layoutVisible, setLayoutVisible] = useState<
    'loading' | 'map' | 'list'
  >('loading');

  const onLayoutChange = () => {
    setLayoutVisible(prev => (prev === 'map' ? 'list' : 'map'));
  };

  const loadingStyles = clsx(
    styles.Loading,
    styles.Absolute,
    layoutVisible !== 'loading' && styles.Hidden
  );

  const mapStyles = clsx(
    styles.MapSection,
    styles.Absolute,
    layoutVisible === 'map' && styles.Visible
  );

  const listStyles = clsx(
    styles.ListSection,
    styles.Absolute,
    layoutVisible === 'list' && styles.Visible
  );

  return (
    <>
      <div id="loading" className={loadingStyles}>
        Loading
      </div>
      <section id="map" className={mapStyles}>
        Map
      </section>
      <section id="list" className={listStyles}>
        List
      </section>
      <section id="filters" className={styles.FiltersSection}>
        <button type="button" onClick={onLayoutChange}>
          show hide
        </button>
      </section>
    </>
  );
};

export default HomeSections;
