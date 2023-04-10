import { clsx } from 'clsx';

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

  const submitStyles = clsx(styles.Button, styles.Contained);
  const resetStyles = clsx(styles.Button, styles.Text);
  const cancelStyles = clsx(styles.Button, styles.Outlined);

  const backStyles = clsx(styles.Button, styles.Text);
  const confirmStyles = clsx(styles.Button, styles.Contained);

  return (
    <div className={styles.DoctorReportError__action_container}>
      {hasOnSubmit && (
        <Button type="submit" className={submitStyles}>
          {props.onSubmitText}
        </Button>
      )}
      {hasOnReset && (
        <Button type="button" onClick={props.onReset} className={resetStyles}>
          {props.onResetText}
        </Button>
      )}
      {hasOnCancel && (
        <Button type="button" onClick={props.onCancel} className={cancelStyles}>
          {props.onCancelText}
        </Button>
      )}
      {hasOnBack && (
        <Button type="button" onClick={props.onBack} className={backStyles}>
          {props.onBackText}
        </Button>
      )}
      {hasOnConfirm && (
        <Button type="submit" className={confirmStyles}>
          {props.onConfirmText}
        </Button>
      )}
    </div>
  );
};

export default DoctorReportErrorActions;
