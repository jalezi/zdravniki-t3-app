import { clsx } from 'clsx';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import { Tooltip } from '@/components/Shared/Tooltip';
import { baseDrTypeSchema } from '@/lib/types/dr-type-page';

import styles from './DrBasicInfo.module.css';
import { DrAddress } from '../DrAddress';
import { DrName } from '../DrName';
import { DrProvider } from '../DrProvider';
import { DrTypeChip } from '../DrTypeChip';

export type DrBasicInfoProps = {
  name: string;
  href: string;
  isExtra: boolean;
  drId: string;
  provider: string | null;
  address: string;

  className?: string;
  variant?: 'default' | 'popup' | 'page';
};

const DrBasicInfo = ({ variant = 'default', ...props }: DrBasicInfoProps) => {
  const router = useRouter();
  const { t } = useTranslation('doctor');

  const drTypeParsed = baseDrTypeSchema.parse(router.query.type);
  const drTypeTranslated = t(drTypeParsed);

  const extra = t('extra.clinic.betterAccessibility', {
    returnObjects: true,
  }) satisfies { title: string; description: string };

  const basicStyles = clsx(styles.BasicInfo, props.className);

  const extraId = `${props.drId}_extra_${variant}`;

  return (
    <div className={basicStyles}>
      <DrName name={props.name} locale={router.locale} href={props.href}>
        {variant === 'default' && props.isExtra ? (
          <DrTypeChip.ExtraChip id={extraId} />
        ) : null}
      </DrName>
      {variant === 'popup' ? (
        <div className={styles.TypeContainer}>
          <DrTypeChip.DrTypeChip
            drType={drTypeParsed}
            text={drTypeTranslated}
            variant="contained"
            iconSize="lg"
          />
          {props.isExtra ? (
            <DrTypeChip.ExtraChip id={extraId} variant="contained" />
          ) : null}
        </div>
      ) : null}

      <Tooltip.Tooltip anchorSelect={`#${extraId}`} place="bottom">
        {extra?.title}
      </Tooltip.Tooltip>
      <div>
        <DrProvider provider={props.provider ? props.provider : 'Ni podatka'} />
        <DrAddress address={props.address ? props.address : 'Ni podatka'} />
      </div>
    </div>
  );
};

export default DrBasicInfo;
