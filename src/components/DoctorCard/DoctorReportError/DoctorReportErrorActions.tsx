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
    }
  | {
      onDone: () => void;
      onTryAgain: () => void;
      onDoneText: string;
      onTryAgainText: string;
    }
  | {
      onClose: () => void;
      onCloseText: string;
    };

const DoctorReportErrorActions = (props: DoctorReportErrorActionsProps) => {
  const hasOnSubmit = 'onSubmitText' in props;
  const hasOnReset = 'onResetText' in props && 'onReset' in props;
  const hasOnCancel = 'onCancelText' in props && 'onCancel' in props;

  const hasOnBack = 'onBackText' in props && 'onBack' in props;
  const hasOnConfirm = 'onConfirmText' in props;

  const hasOnTryAgain = 'onTryAgainText' in props && 'onTryAgain' in props;
  const hasOnDone = 'onDoneText' in props && 'onDone' in props;

  const hasOnClose = 'onCloseText' in props && 'onClose' in props;

  const submitStyles = clsx(styles.Button, styles.Contained);
  const resetStyles = clsx(styles.Button, styles.Text);
  const cancelStyles = clsx(styles.Button, styles.Outlined);

  const backStyles = clsx(styles.Button, styles.Text);
  const confirmStyles = clsx(styles.Button, styles.Contained);

  const tryAgaingStyles = clsx(styles.Button, styles.Contained);
  const doneStyles = clsx(styles.Button, styles.Text);

  const closeStyles = clsx(styles.Button, styles.Text, styles.Right);

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
      {hasOnDone && (
        <Button type="button" onClick={props.onDone} className={doneStyles}>
          {props.onDoneText}
        </Button>
      )}
      {hasOnTryAgain && (
        <Button
          type="button"
          onClick={props.onTryAgain}
          className={tryAgaingStyles}
        >
          {props.onTryAgainText}
        </Button>
      )}
      {hasOnClose && (
        <Button type="button" onClick={props.onClose} className={closeStyles}>
          {props.onCloseText}
        </Button>
      )}
    </div>
  );
};

export default DoctorReportErrorActions;
