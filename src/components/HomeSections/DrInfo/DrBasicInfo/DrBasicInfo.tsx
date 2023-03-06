import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import styles from './DrBasicInfo.module.css';
import { DrAddress } from '../DrAddress';
import { DrName } from '../DrName';
import { DrProvider } from '../DrProvider';

export type DrBasicInfoProps = {
  name: string;
  href: string;
  isExtra: boolean;
  drId: string;
  provider: string | null;
  address: string;
};

const DrBasicInfo = (props: DrBasicInfoProps) => {
  const router = useRouter();
  const { t } = useTranslation('doctor');
  const extraTooltip = t('extra.clinic.betterAccessibility', {
    returnObjects: true,
  }) satisfies { description: string; title: string };

  const extraTooltipText = extraTooltip.title;
  return (
    <div className={styles.BasicInfo}>
      <DrName name={props.name} locale={router.locale} href={props.href}>
        {props.isExtra ? (
          <DrName.ExtraIcon id={props.drId} tooltipContent={extraTooltipText} />
        ) : null}
      </DrName>
      <DrProvider provider={props.provider ? props.provider : 'Ni podatka'} />
      <DrAddress address={props.address ? props.address : 'Ni podatka'} />
    </div>
  );
};

export default DrBasicInfo;
