import { Button } from '@/components/Shared/Buttons';

import styles from './DoctorReportError.module.css';

type DoctorReportErrorActionsProps = {
  onReset: () => void;
  onCancel: () => void;
  onSubmitText: string;
  onResetText: string;
  onCancelText: string;
};

const DoctorReportErrorActions = (props: DoctorReportErrorActionsProps) => {
  return (
    <div className={styles.DoctorReportError__action_container}>
      <Button type="submit">{props.onSubmitText}</Button>
      <Button type="button" onClick={props.onReset}>
        {props.onResetText}
      </Button>
      <Button type="button" onClick={props.onCancel}>
        {props.onCancelText}
      </Button>
    </div>
  );
};

export default DoctorReportErrorActions;
