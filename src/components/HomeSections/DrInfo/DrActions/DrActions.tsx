import { clsx } from 'clsx';

import { IconButton } from '@/components/Shared/Buttons';
import { DotsVertSvg } from '@/components/Shared/Icons';

import styles from './DrActions.module.css';
import type { PhoneButtonProps } from './Phone';
import Phone from './Phone';

export type DrActionsProps = {
  drId: string;
  phone: PhoneButtonProps['tooltipContent'];
  className?: string;
  variant?: 'default' | 'popup' | 'page';
};

const DrActions = ({
  drId,
  phone,
  className,
  variant = 'default',
}: DrActionsProps) => {
  const actionsStyles = clsx(
    styles.DrActions,
    variant === 'popup' && styles.Row,
    className
  );

  const phoneId = `${drId}_phone_${variant}`;

  return (
    <div className={actionsStyles}>
      <IconButton type="button" aria-label="More">
        <DotsVertSvg />
      </IconButton>
      <Phone
        id={phoneId}
        href={phone ? `tel: ${phone}` : undefined}
        tooltipContent={phone}
      />
    </div>
  );
};

export default DrActions;
