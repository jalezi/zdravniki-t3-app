import { clsx } from 'clsx';
import { useTranslation } from 'next-i18next';

import styles from './Map.module.css';

type TotalHitsProps = { count: number };

const TotalHits = function MapTotalHits({ count }: TotalHitsProps) {
  const { t } = useTranslation('map');

  const controlContainerStyles = clsx(
    'leaflet-control-container',
    styles.TotalHits
  );

  const barStyles = clsx('leaflet-bar', styles.TotalHitsBar);

  const totalHits = t('totalHits', { count });

  return (
    <div className={controlContainerStyles}>
      <div className="leaflet-top leaflet-right">
        <div className="leaflet-control">
          <span className={barStyles}>{totalHits}</span>
        </div>
      </div>
    </div>
  );
};

export default TotalHits;
