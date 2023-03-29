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
  isFloating: boolean;
  drId: string;
  provider: string | null;
  address: string;

  className?: string;
  variant?: 'list' | 'popup' | 'page';
};

// eslint-disable-next-line sonarjs/cognitive-complexity
const DrBasicInfo = ({ variant = 'list', ...props }: DrBasicInfoProps) => {
  const router = useRouter();
  const { t } = useTranslation('doctor');

  const drTypeParsed = baseDrTypeSchema.parse(router.query.type);
  const drTypeTranslated = t(drTypeParsed);

  const extra = t('extra.clinic.betterAccessibility', {
    returnObjects: true,
  }) satisfies { title: string; description: string };

  const floating = t('extra.clinic.floating', {
    returnObjects: true,
  }) satisfies { title: string; description: string };

  const basicStyles = clsx(styles.BasicInfo, props.className);

  const extraId = `${props.drId}_extra_${variant}`;
  const floatingId = `${props.drId}_floating_${variant}`;

  return (
    <div className={basicStyles}>
      <DrName
        name={props.name}
        locale={router.locale}
        href={props.href}
        variant={variant}
      >
        {variant === 'list' && props.isExtra ? (
          <DrTypeChip.ExtraChip id={extraId} />
        ) : null}
        {variant === 'list' && props.isFloating ? (
          <DrTypeChip.FloatingChip id={floatingId} />
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
          {props.isFloating ? (
            <DrTypeChip.FloatingChip id={floatingId} variant="contained" />
          ) : null}
        </div>
      ) : null}

      {variant === 'page' ? (
        <div className={styles.TypeContainer}>
          <DrTypeChip.DrTypeChip
            drType={drTypeParsed}
            text={drTypeTranslated}
            variant="contained"
            iconSize="lg"
          />
          {props.isExtra ? (
            <DrTypeChip.ExtraChip
              id={extraId}
              text={extra?.title}
              variant="contained"
            />
          ) : null}
          {props.isFloating ? (
            <DrTypeChip.FloatingChip
              id={floatingId}
              text={floating?.title}
              variant="contained"
            />
          ) : null}
        </div>
      ) : null}

      {props.isExtra && (
        <Tooltip.Tooltip anchorSelect={`#${extraId}`} place="bottom">
          {variant === 'page' ? extra.description : extra?.title}
        </Tooltip.Tooltip>
      )}
      {props.isFloating && (
        <Tooltip.Tooltip anchorSelect={`#${floatingId}`} place="bottom">
          {variant === 'page' ? floating.description : floating?.title}
        </Tooltip.Tooltip>
      )}
      <div>
        <DrProvider
          provider={props.provider ? props.provider : 'Ni podatka'}
          variant={variant}
        />
        <DrAddress
          address={props.address ? props.address : 'Ni podatka'}
          variant={variant}
        />
      </div>
    </div>
  );
};

export default DrBasicInfo;
