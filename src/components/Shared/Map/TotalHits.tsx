import { useTranslation } from 'next-i18next';

type TotalHitsProps = { count: number };

const TotalHits = function MapTotalHits({ count }: TotalHitsProps) {
  const { t } = useTranslation('map');
  const { t: tFooter } = useTranslation('common');

  const totalHits = t('totalHits', { count });
  const dataSource = tFooter`footer.dataSource`;
  const zzzs = tFooter`footer.zzzs`;
  const gurs = tFooter`footer.gurs`;

  return (
    <div className="leaflet-control-container total-hits">
      <div className="leaflet-top leaflet-right">
        <div className="leaflet-control">
          <span className="leaflet-bar">{totalHits}</span>
        </div>
      </div>
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

export default TotalHits;
