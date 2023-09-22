import { useTranslation } from 'next-i18next';

const DataSource = function MapTotalHits() {
  const { t } = useTranslation('common');

  const footterTrans = t('footer', { returnObjects: true });
  const { dataSource, zzzs, gurs } = footterTrans;

  return (
    <div className="leaflet-control-container data-source">
      <div className="leaflet-bottom leaflet-left">
        <div className="leaflet-control-attribution leaflet-control">
          {dataSource}:{' '}
          <a href="https://www.zzzs.si" target="_blank" rel="noreferrer">
            <abbr title={zzzs}>ZZZS</abbr>
          </a>
          ,{' '}
          <a
            href="https://www.gov.si/drzavni-organi/organi-v-sestavi/geodetska-uprava/"
            target="_blank"
            rel="noreferrer"
          >
            <abbr title={gurs}>GURS</abbr>
          </a>
        </div>
      </div>
    </div>
  );
};

export default DataSource;
