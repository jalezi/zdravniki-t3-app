import { clsx } from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import { Button, IconButton } from '@/components/Shared/Buttons';
import { DotsVertSvg, Icon, PhoneSvg } from '@/components/Shared/Icons';
import { Tooltip } from '@/components/Shared/Tooltip';
import { MAX_ZOOM } from '@/lib/constants/map';
import useBoundStore from '@/lib/store/useBoundStore';
import type { Doctor } from '@/server/api/routers/doctors';

import styles from './DrActions.module.css';

type DrActionsCommonProps = {
  drHref: Doctor['href'];
  drId: Doctor['fakeId'];
  phones: Doctor['phones'];
  email: Doctor['email'];
  websites: Doctor['websites'];
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
  email,
  phones,
  websites,
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

  const _phones = phones.filter(Boolean);
  const _websites = websites.filter(Boolean);

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
        <IconButton
          id={phoneId}
          type="button"
          aria-label="More"
          aria-haspopup="true"
          className={clsx(styles.MoreMenu, styles.IconButton)}
        >
          <PhoneSvg />
        </IconButton>
        <Tooltip.Tooltip
          noArrow={true}
          anchorSelect={`#${phoneId}`}
          openOnClick
          clickable={true}
          place="bottom"
          className={styles.Tooltip}
        >
          <ul role="group" className={styles.Tooltip__group}>
            {_phones.length > 0 &&
              _phones.map((phone, index) => (
                <Tooltip.TooltipContent
                  key={`${phone}-${index}}`}
                  as="li"
                  size="sm"
                  className={styles.Tooltip__item}
                >
                  <Button
                    as={Link}
                    href={`tel:${phone}`}
                    passHref
                    container="span"
                  >
                    <Icon
                      name="PhoneSvg"
                      className={styles.Tooltip__icon}
                      size="lg"
                    />
                    {phone}
                  </Button>
                </Tooltip.TooltipContent>
              ))}
            {_websites.length > 0 &&
              _websites.map((website, index) => (
                <Tooltip.TooltipContent
                  key={`${website}-${index}}`}
                  as="li"
                  size="sm"
                  className={styles.Tooltip__item}
                >
                  <Button
                    as="a"
                    href={website}
                    container="span"
                    target="_blank"
                    rel="noopener noreferrer"
                    title={website}
                  >
                    <Icon
                      name="LinkSvg"
                      className={styles.Tooltip__icon}
                      size="lg"
                    />
                    <span className={styles.Elipsis}>{website}</span>
                  </Button>
                </Tooltip.TooltipContent>
              ))}
            {email && (
              <Tooltip.TooltipContent
                as="li"
                size="sm"
                className={styles.Tooltip__item}
              >
                <Button as="a" href={`mailto:${email}`} container="span">
                  <Icon
                    name="EmailSvg"
                    className={styles.Tooltip__icon}
                    size="lg"
                  />
                  <span className={styles.Elipsis}>{email}</span>
                </Button>
              </Tooltip.TooltipContent>
            )}
          </ul>
        </Tooltip.Tooltip>
      </div>
    </div>
  );
};

export default DrActions;
