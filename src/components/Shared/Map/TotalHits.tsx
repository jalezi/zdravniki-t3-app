import { useTranslation } from 'next-i18next';

type TotalHitsProps = { count: number };

const TotalHits = function MaptotalHits({ count }: TotalHitsProps) {
  const { t } = useTranslation('map');

  const totalHits = t('totalHits', { count });

  return (
    <div className="leaflet-control-container total-hits">
      <div className="leaflet-control leaflet-top leaflet-right">
        <div className="leaflet-control">
          <span className="leaflet-bar">{totalHits}</span>
        </div>
      </div>
    </div>
  );
};

export default TotalHits;
