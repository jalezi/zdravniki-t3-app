import { clsx } from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import { Button, IconButton } from '@/components/Shared/Buttons';
import { DotsVertSvg, Icon } from '@/components/Shared/Icons';
import { Tooltip } from '@/components/Shared/Tooltip';
import { MAX_ZOOM } from '@/lib/constants/map';
import useBoundStore from '@/lib/store/useBoundStore';
import type { Doctor } from '@/server/api/routers/doctors';

import styles from './DrActions.module.css';
import Phone from './Phone';

type DrActionsCommonProps = {
  drHref: Doctor['href'];
  drId: Doctor['fakeId'];
  phones: Doctor['phones'];
  className?: string;
};

type DrActionsDefaultProps = {
  geoLocation: Doctor['location']['geoLocation'];
  variant?: 'default';
};

type DrActionsPopupProps = {
  geoLocation?: undefined;
  variant: 'popup';
};

export type DrActionsProps =
  | DrActionsCommonProps & (DrActionsDefaultProps | DrActionsPopupProps);

//  Drole Katja gp [ '04 51 51 151', '051 395 675' ]

const DrActions = ({
  drHref,
  drId,
  phones,
  className,
  variant = 'default',
  ...rest
}: DrActionsProps) => {
  const router = useRouter();
  const map = useBoundStore(state => state.map);
  const { t } = useTranslation('doctor');

  const actionsStyles = clsx(
    styles.DrActions,
    variant === 'popup' && styles.Row,
    className
  );

  const actionsId = `${drId}_actions_${variant}`;
  const phoneId = `${drId}_phone_${variant}`;

  const isDefault = variant === 'default';
  const geoLocation = isDefault ? rest.geoLocation : undefined;

  const handleFlyTo = geoLocation
    ? () => {
        if (map) {
          map.flyTo({ lat: geoLocation.lat, lng: geoLocation.lng }, MAX_ZOOM);
        }
      }
    : undefined;

  return (
    <div className={actionsStyles}>
      <div className={styles.IconContainer}>
        <IconButton
          id={actionsId}
          type="button"
          aria-label="More"
          aria-haspopup="true"
          className={clsx(styles.MoreMenu, styles.IconButton)}
        >
          <DotsVertSvg />
        </IconButton>
        <Tooltip.Tooltip
          noArrow={true}
          anchorSelect={`#${actionsId}`}
          openOnClick
          clickable={true}
          place="bottom"
          className={styles.Tooltip}
        >
          <ul role="group" className={styles.Tooltip__group}>
            <Tooltip.TooltipContent
              as="li"
              size="sm"
              className={styles.Tooltip__item}
            >
              {isDefault && (
                <Button type="button" container="span" onClick={handleFlyTo}>
                  <Icon
                    name="MapMarkerSvg"
                    className={styles.Tooltip__icon}
                    size="lg"
                  />
                  {t('info.showOnMap')}
                </Button>
              )}
            </Tooltip.TooltipContent>
            <Tooltip.TooltipContent
              as="li"
              size="sm"
              className={styles.Tooltip__item}
            >
              <Button
                as={Link}
                href={drHref + '?edit=true'}
                passHref
                locale={router.locale}
                container="span"
              >
                <Icon
                  name="AlertSvg"
                  className={styles.Tooltip__icon}
                  size="lg"
                />
                {t('reportError.linkText')}
              </Button>
            </Tooltip.TooltipContent>
            <Tooltip.TooltipDivider />
            <Tooltip.TooltipContent
              as="li"
              size="sm"
              className={styles.Tooltip__item}
            >
              <Button
                as={Link}
                href={drHref}
                passHref
                locale={router.locale}
                container="span"
              >
                <Icon
                  name="IdCardSvg"
                  className={styles.Tooltip__icon}
                  size="lg"
                />
                {t('info.more')}
              </Button>
            </Tooltip.TooltipContent>
          </ul>
        </Tooltip.Tooltip>
      </div>
      <div className={styles.IconContainer}>
        <Phone
          id={phoneId}
          href={phones[0] ? `tel: ${phones[0]}` : undefined}
          className={clsx(styles.Phone, styles.IconButton)}
          tooltipContent={
            phones[0] ? (
              <ul>
                {phones.map((phone, i) => (
                  <Tooltip.TooltipContent
                    key={`${phone}_${i}`}
                    as="li"
                    size="sm"
                    className={styles.Tooltip__item}
                  >
                    {phone}
                  </Tooltip.TooltipContent>
                ))}
              </ul>
            ) : undefined
          }
        />
      </div>
    </div>
  );
};

export default DrActions;
