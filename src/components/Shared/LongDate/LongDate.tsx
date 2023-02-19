import { useTranslation } from 'next-i18next';
import type { ElementType } from 'react';

import styles from './LongDate.module.css';
import type { PolymorphicComponentProps } from '../Polymorphic';
import { Polymorphic } from '../Polymorphic';

type LongDateProps = {
  timestamp: number | 'error';
  as?: PolymorphicComponentProps<ElementType>['as'];
};

const LongDate = ({ timestamp, as = 'strong' }: LongDateProps) => {
  const { t } = useTranslation('common');

  const longDateStyles = styles.LongDate;

  if (!timestamp || timestamp === 'error') {
    return (
      <Polymorphic
        as={as}
        className={longDateStyles}
      >{t`timestamps.noData`}</Polymorphic>
    );
  }

  const date = t('timestamps.datetime', {
    val: new Date(timestamp),
    formatParams: {
      val: {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      },
    },
  });

  const time = t('timestamps.datetime', {
    val: new Date(timestamp),
    formatParams: {
      val: { hour: 'numeric', minute: 'numeric', hour12: false },
    },
  });

  return (
    <Polymorphic as={as} className={longDateStyles}>
      {date} {t('timestamps.at')} {time}
    </Polymorphic>
  );
};

export default LongDate;
