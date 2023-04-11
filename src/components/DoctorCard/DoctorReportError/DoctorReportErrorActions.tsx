import { clsx } from 'clsx';

import { Button } from '@/components/Shared/Buttons';

import styles from './DoctorReportError.module.css';

type DoctorReportErrorActionsProps =
  | {
      formStatus: 'initial';
      onReset: () => void;
      onCancel: () => void;
      onSubmitText: string;
      onResetText: string;
      onCancelText: string;
    }
  | {
      formStatus: 'validate';
      onBack: () => void;
      onBackText: string;
      onConfirmText: string;
    }
  | {
      formStatus: 'error';
      onDone: () => void;
      onTryAgain: () => void;
      onDoneText: string;
      onTryAgainText: string;
    }
  | {
      formStatus: 'success';
      onClose: () => void;
      onCloseText: string;
    };

const DoctorReportErrorActions = (props: DoctorReportErrorActionsProps) => {
  const submitStyles = clsx(styles.Button, styles.Contained);
  const resetStyles = clsx(styles.Button, styles.Text, styles.Right);
  const cancelStyles = clsx(styles.Button, styles.Outlined);

  const backStyles = clsx(styles.Button, styles.Text);
  const confirmStyles = clsx(styles.Button, styles.Contained);

  const tryAgaingStyles = clsx(styles.Button, styles.Contained);
  const doneStyles = clsx(styles.Button, styles.Text);

  const closeStyles = clsx(styles.Button, styles.Text, styles.Right);

  return (
    <div className={styles.DoctorReportError__action_container}>
      {props.formStatus === 'initial' && (
        <>
          <Button type="submit" className={submitStyles}>
            {props.onSubmitText}
          </Button>
          <Button type="button" onClick={props.onReset} className={resetStyles}>
            {props.onResetText}
          </Button>
          <Button
            type="button"
            onClick={props.onCancel}
            className={cancelStyles}
          >
            {props.onCancelText}
          </Button>
        </>
      )}

      {props.formStatus === 'validate' && (
        <>
          <Button type="button" onClick={props.onBack} className={backStyles}>
            {props.onBackText}
          </Button>
          <Button type="submit" className={confirmStyles}>
            {props.onConfirmText}
          </Button>
        </>
      )}

      {props.formStatus === 'error' && (
        <>
          <Button type="button" onClick={props.onDone} className={doneStyles}>
            {props.onDoneText}
          </Button>
          <Button
            type="button"
            onClick={props.onTryAgain}
            className={tryAgaingStyles}
          >
            {props.onTryAgainText}
          </Button>
        </>
      )}

      {props.formStatus === 'success' && (
        <Button type="button" onClick={props.onClose} className={closeStyles}>
          {props.onCloseText}
        </Button>
      )}
    </div>
  );
};

export default DoctorReportErrorActions;
