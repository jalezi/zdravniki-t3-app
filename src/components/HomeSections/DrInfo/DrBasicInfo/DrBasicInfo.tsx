import { clsx } from 'clsx';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import { Tooltip } from '@/components/Shared/Tooltip';
import type { Clinic } from '@/lib/types/doctors';
import { ageGroupSchema, pageDrTypeSchema } from '@/lib/types/dr-type-page';

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

const CLINIC_CHIP_VARIANT_MAP = {
  list: undefined,
  page: 'contained',
  popup: 'contained',
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

  const drTypeParsed = pageDrTypeSchema.parse(router.query.type);
  const drAgeGroup = ageGroupSchema.parse(drTypeParsed);
  const drTypeTranslated = t(drTypeParsed);
  const drAgeGroupTranslated = drTypeParsed.includes('den')
    ? t(drAgeGroup)
    : undefined;

  const extra = t('extra.clinic.betterAccessibility', {
    returnObjects: true,
  }) satisfies { title: string; description: string };

  const floating = t('extra.clinic.floating', {
    returnObjects: true,
  }) satisfies { title: string; description: string };

  const basicStyles = clsx(
    styles.BasicInfo,
    variant === 'list' && styles.List,
    variant === 'popup' && styles.Popup,
    variant === 'page' && styles.Page,
    props.className
  );

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
    default: null,
    extra: extra.description,
    floating: floating.description,
  }[props.clinic];

  const clinicText = {
    default: undefined,
    extra: extra.title,
    floating: floating.title,
  }[props.clinic];

  const clinicChip = ClinicChip ? (
    <ClinicChip
      id={clinicChipId}
      variant={CLINIC_CHIP_VARIANT_MAP[`${variant}`]}
      text={variant === 'page' ? clinicText : undefined}
    />
  ) : null;

  const drTypeChip =
    variant === 'list' ? null : (
      <DrTypeChip.DrTypeChip
        drType={drTypeParsed}
        text={drTypeTranslated}
        textAge={drAgeGroupTranslated}
        variant="contained"
        iconSize="lg"
      />
    );

  return (
    <div className={basicStyles}>
      <DrName
        name={props.name}
        locale={router.locale}
        href={props.href}
        variant={variant}
      >
        {variant === 'list' ? clinicChip : null}
      </DrName>
      {variant === 'popup' || variant === 'page' ? (
        <div className={styles.TypeContainer}>
          {drTypeChip}
          {clinicChip}
        </div>
      ) : null}
      {ClinicTooltip && clinicChipId ? (
        <ClinicTooltip anchorSelect={`#${clinicChipId}`} place="bottom">
          <Tooltip.TooltipContent as="p" weight="500">
            {clinicTooltip}
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
