import { Button } from '@/components/Shared/Buttons';

import styles from './DoctorReportError.module.css';

type DoctorReportErrorActionsProps =
  | {
      onReset: () => void;
      onCancel: () => void;
      onSubmitText: string;
      onResetText: string;
      onCancelText: string;
    }
  | {
      onBack: () => void;
      onBackText: string;
      onConfirmText: string;
    };

const DoctorReportErrorActions = (props: DoctorReportErrorActionsProps) => {
  const hasOnSubmit = 'onSubmitText' in props;
  const hasOnReset = 'onResetText' in props && 'onReset' in props;
  const hasOnCancel = 'onCancelText' in props && 'onCancel' in props;

  const hasOnBack = 'onBackText' in props && 'onBack' in props;
  const hasOnConfirm = 'onConfirmText' in props;

  return (
    <div className={styles.DoctorReportError__action_container}>
      {hasOnSubmit && <Button type="submit">{props.onSubmitText}</Button>}
      {hasOnReset && (
        <Button type="button" onClick={props.onReset}>
          {props.onResetText}
        </Button>
      )}
      {hasOnCancel && (
        <Button type="button" onClick={props.onCancel}>
          {props.onCancelText}
        </Button>
      )}
      {hasOnBack && (
        <Button type="button" onClick={props.onBack}>
          {props.onBackText}
        </Button>
      )}
      {hasOnConfirm && <Button type="submit">{props.onConfirmText}</Button>}
    </div>
  );
};

export default DoctorReportErrorActions;
