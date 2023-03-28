import { clsx } from 'clsx';

import { IconButton } from '@/components/Shared/Buttons';
import { Icon } from '@/components/Shared/Icons';

import styles from './DoctorReportError.module.css';

type DoctorReportErrorContainerProps = {
  children: React.ReactNode;
  onClose: () => void;
};

const DoctorReportErrorContainer = ({
  children,
  onClose,
}: DoctorReportErrorContainerProps) => {
  const doctorReportErrorStyles = clsx(styles.DoctorReportError__container);

  return (
    <div className={doctorReportErrorStyles}>
      {children}
      <div className={styles.Cancel}>
        <IconButton type="button" onClick={onClose} className={styles.Cancel}>
          <Icon name="CloseSvg" size="md" />
        </IconButton>
      </div>
    </div>
  );
};

export default DoctorReportErrorContainer;
