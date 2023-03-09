import { clsx } from 'clsx';

import { IconButton } from '@/components/Shared/Buttons';
import { DotsVertSvg, PhoneNoneSvg, PhoneSvg } from '@/components/Shared/Icons';
import type { Doctor } from '@/server/api/routers/doctors';

import styles from './DrActions.module.css';

type Phone = Doctor['phone'];

export type DrActionsProps = {
  drId: string;
  phone: Phone;
  className?: string;
};

const DrActions = ({ drId, phone, className }: DrActionsProps) => {
  const aOrButtonAttrs = phone
    ? ({ as: 'a', href: `tel: ${phone}` } as const)
    : ({ type: 'button', disabled: true } as const);

  const actionsStyles = clsx(styles.DrActions, className);

  return (
    <div className={actionsStyles}>
      <IconButton type="button">
        <DotsVertSvg />
      </IconButton>
      <IconButton id={drId + '_phone'} {...aOrButtonAttrs}>
        {phone ? <PhoneSvg /> : <PhoneNoneSvg />}
      </IconButton>
    </div>
  );
};

export default DrActions;
