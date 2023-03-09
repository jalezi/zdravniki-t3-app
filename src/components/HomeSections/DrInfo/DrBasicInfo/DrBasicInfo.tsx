import { clsx } from 'clsx';
import { useRouter } from 'next/router';

import styles from './DrBasicInfo.module.css';
import { DrAddress } from '../DrAddress';
import { DrName } from '../DrName';
import { DrProvider } from '../DrProvider';

export type DrBasicInfoProps = {
  name: string;
  href: string;
  isExtra: boolean;
  drId: string;
  provider: string | null;
  address: string;
  className?: string;
};

const DrBasicInfo = (props: DrBasicInfoProps) => {
  const router = useRouter();

  const basicStyles = clsx(styles.BasicInfo, props.className);

  return (
    <div className={basicStyles}>
      <DrName name={props.name} locale={router.locale} href={props.href}>
        {props.isExtra ? <DrName.ExtraIcon id={props.drId} /> : null}
      </DrName>
      <DrProvider provider={props.provider ? props.provider : 'Ni podatka'} />
      <DrAddress address={props.address ? props.address : 'Ni podatka'} />
    </div>
  );
};

export default DrBasicInfo;
