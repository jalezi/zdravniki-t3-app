import Link from 'next/link';

import { Icon } from '@/components/Shared/Icons';
import Tooltips from '@/components/Shared/Tooltips';
import { Typography } from '@/components/Shared/Typography';

import styles from './DrName.module.css';

type TooltipProps = {
  tooltipContent?: React.ReactNode;
};

type ExtraProps = { id: string } & TooltipProps;

export type DrNameProps = { href: string; locale?: string; name: string } & {
  children?: React.ReactNode;
};

const ExtraIcon = ({ id, tooltipContent }: ExtraProps) => {
  return (
    <>
      <Icon name="ClinicSvg" id={id} className={styles.Extra} />
      <Tooltips.Tooltip anchorSelect={`#${id}`} place="bottom">
        {tooltipContent}
      </Tooltips.Tooltip>
    </>
  );
};

const DrName = ({ href, name, locale, children }: DrNameProps) => {
  return (
    <Typography as="h2" element="h3" translate="no" className={styles.DrName}>
      {href ? (
        <Link
          href={href}
          passHref
          hrefLang={locale ? locale : undefined}
          locale={locale}
        >
          {name}
        </Link>
      ) : (
        <span>{name}</span>
      )}
      {children}
    </Typography>
  );
};

DrName.ExtraIcon = ExtraIcon;

export default DrName;
