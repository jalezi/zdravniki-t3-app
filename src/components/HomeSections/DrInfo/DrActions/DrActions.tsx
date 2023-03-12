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
};

const DrActions = ({ drId, phone, className }: DrActionsProps) => {
  const actionsStyles = clsx(styles.DrActions, className);

  return (
    <div className={actionsStyles}>
      <IconButton type="button">
        <DotsVertSvg />
      </IconButton>
      <Phone
        id={drId + '_phone'}
        href={phone ? `tel: ${phone}` : undefined}
        tooltipContent={phone}
      />
    </div>
  );
};

export default DrActions;
