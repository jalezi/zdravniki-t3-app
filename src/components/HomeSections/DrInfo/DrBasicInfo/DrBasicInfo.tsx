import { clsx } from 'clsx';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import { Tooltip } from '@/components/Shared/Tooltip';
import type { Clinic } from '@/lib/types/doctors';
import { baseDrTypeSchema } from '@/lib/types/dr-type-page';

import styles from './DrBasicInfo.module.css';
import { DrAddress } from '../DrAddress';
import { DrName } from '../DrName';
import { DrProvider } from '../DrProvider';
import { DrTypeChip } from '../DrTypeChip';

const CLINIC_CHIP_MAP = {
  default: null,
  extra: DrTypeChip.ExtraChip,
  floating: DrTypeChip.FloatingChip,
} as const;

const CLINIC_TOOLTIP_MAP = {
  default: null,
  extra: Tooltip.Tooltip,
  floating: Tooltip.Tooltip,
} as const;

export type DrBasicInfoProps = {
  name: string;
  href: string;
  drId: string;
  provider: string | null;
  address: string;
  clinic: Clinic;
  className?: string;
  variant?: 'list' | 'popup' | 'page';
};

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

  const chipId = {
    default: undefined,
    extra: extraId,
    floating: floatingId,
  } as const;

  const ClinicChip = CLINIC_CHIP_MAP[props.clinic];
  const clinicChipId = chipId[props.clinic];

  const ClinicTooltip = CLINIC_TOOLTIP_MAP[props.clinic];
  const clinicTooltip = {
    page: {
      default: null,
      extra: extra.description,
      floating: floating.description,
    }[props.clinic],
    list: {
      default: null,
      extra: extra.title,
      floating: floating.title,
    }[props.clinic],
    popup: {
      default: null,
      extra: extra.title,
      floating: floating.title,
    }[props.clinic],
  } as const;

  const clinicText = {
    default: undefined,
    extra: extra.title,
    floating: floating.title,
  }[props.clinic];

  return (
    <div className={basicStyles}>
      <DrName
        name={props.name}
        locale={router.locale}
        href={props.href}
        variant={variant}
      >
        {variant === 'list' && ClinicChip ? (
          <ClinicChip id={clinicChipId} />
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
          {ClinicChip ? (
            <ClinicChip id={clinicChipId} variant="contained" />
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
          {ClinicChip ? (
            <ClinicChip
              id={clinicChipId}
              text={clinicText}
              variant="contained"
            />
          ) : null}
        </div>
      ) : null}
      {ClinicTooltip && clinicChipId ? (
        <ClinicTooltip anchorSelect={`#${clinicChipId}`} place="bottom">
          <Tooltip.TooltipContent as="p" weight="500">
            {clinicTooltip[`${variant}`]}
          </Tooltip.TooltipContent>
        </ClinicTooltip>
      ) : null}

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
