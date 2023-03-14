import { useTranslation } from 'next-i18next';

import { Icon } from '@/components/Shared/Icons';

import styles from './NoResults.module.css';

const NoResult = () => {
  const { t } = useTranslation('doctor');
  return (
    <div className={styles.NoResults}>
      <Icon name="InfoSvg" className={styles.Icon} />
      <p>{t('info.noResults')}</p>
    </div>
  );
};

export default NoResult;
