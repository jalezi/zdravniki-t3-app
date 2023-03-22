import { clsx } from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { Button, IconButton } from '@/components/Shared/Buttons';
import { DotsVertSvg, Icon } from '@/components/Shared/Icons';
import { Tooltip } from '@/components/Shared/Tooltip';

import styles from './DrActions.module.css';
import type { PhoneButtonProps } from './Phone';
import Phone from './Phone';

export type DrActionsProps = {
  drHref: string;
  drId: string;
  phone: PhoneButtonProps['tooltipContent'];
  variant?: 'default' | 'popup' | 'page';
  className?: string;
};

const DrActions = ({
  drHref,
  drId,
  phone,
  className,
  variant = 'default',
}: DrActionsProps) => {
  const router = useRouter();

  const actionsStyles = clsx(
    styles.DrActions,
    variant === 'popup' && styles.Row,
    className
  );

  const actionsId = `${drId}_actions_${variant}`;
  const phoneId = `${drId}_phone_${variant}`;

  return (
    <div className={actionsStyles}>
      <div className={styles.MoreMenu}>
        <IconButton
          id={actionsId}
          type="button"
          aria-label="More"
          aria-haspopup="true"
        >
          <DotsVertSvg />
        </IconButton>
        <Tooltip.Tooltip
          noArrow={true}
          anchorSelect={`#${actionsId}`}
          events={['click']}
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
              <Button type="button" container="span">
                <Icon
                  name="MapMarkerSvg"
                  className={styles.Tooltip__icon}
                  size="lg"
                />
                Pokaži na zemljevidu
              </Button>
            </Tooltip.TooltipContent>
            <Tooltip.TooltipContent
              as="li"
              size="sm"
              className={styles.Tooltip__item}
            >
              <Button
                as={Link}
                href="#"
                passHref
                locale={router.locale}
                container="span"
              >
                <Icon
                  name="AlertSvg"
                  className={styles.Tooltip__icon}
                  size="lg"
                />
                Prijavi napako v objavljenih podatkih
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
                Več
              </Button>
            </Tooltip.TooltipContent>
          </ul>
        </Tooltip.Tooltip>
      </div>
      <Phone
        id={phoneId}
        href={phone ? `tel: ${phone}` : undefined}
        tooltipContent={phone}
      />
    </div>
  );
};

export default DrActions;
