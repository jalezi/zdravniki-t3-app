import { useTranslation } from 'next-i18next';

import { IconButton } from '@/components/Shared/Buttons';
import { PhoneNoneSvg, PhoneSvg } from '@/components/Shared/Icons';
import { Tooltip } from '@/components/Shared/Tooltip';
import type { Doctor } from '@/server/api/routers/doctors';

type Phone = Doctor['phone'];

export type PhoneButtonProps = {
  id: string;
  href?: string;
  tooltipContent: Phone;
};

export const PhoneButton = ({ id, href, tooltipContent }: PhoneButtonProps) => {
  const aOrButtonAttrs = href
    ? ({ as: 'a', href } as const)
    : ({ type: 'button', ['aria-disabled']: true } as const);

  return (
    <>
      <IconButton
        id={id}
        {...aOrButtonAttrs}
        aria-label={href ? 'Call doctor' : 'No phone number'}
      >
        {href ? <PhoneSvg /> : <PhoneNoneSvg />}
      </IconButton>
      <Tooltip.Tooltip anchorSelect={'#' + id} place="bottom">
        {tooltipContent}
      </Tooltip.Tooltip>
    </>
  );
};

const Phone = ({ tooltipContent, ...rest }: PhoneButtonProps) => {
  const { t } = useTranslation('doctor');
  const tooltip = tooltipContent ? tooltipContent : t('info.noPhone');

  return <PhoneButton tooltipContent={tooltip} {...rest} />;
};

export default Phone;
