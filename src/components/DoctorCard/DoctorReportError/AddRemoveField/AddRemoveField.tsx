import { clsx } from 'clsx';

import { IconButton } from '@/components/Shared/Buttons';
import {
  MinusCircleFillSvg,
  PlusCircleFillSvg,
} from '@/components/Shared/Icons';

import styles from './AddRemoveField.module.css';

export type AddRemoveFieldProps = {
  label: string;
  onRemove: () => void;
  onAdd: () => void;
  hasRemove?: boolean;
  hasAdd?: boolean;
};

const AddRemoveField = ({
  label,
  hasRemove,
  hasAdd,
  onRemove,
  onAdd,
}: AddRemoveFieldProps) => {
  const containerStyles = clsx(
    styles.AddRemoveField,
    styles.AddRemoveField__container
  );
  const removeStyels = clsx(styles.Button, styles.Button__remove);
  const addStyles = clsx(styles.Button, styles.Button__add);

  return (
    <div className={containerStyles}>
      {hasRemove && (
        <IconButton
          type="button"
          className={removeStyels}
          onClick={onRemove}
          aria-label={`remove ${label}`}
        >
          <MinusCircleFillSvg />
        </IconButton>
      )}
      {hasAdd && (
        <IconButton
          type="button"
          className={addStyles}
          onClick={onAdd}
          aria-label={`add ${label}`}
        >
          <PlusCircleFillSvg />
        </IconButton>
      )}
    </div>
  );
};

export default AddRemoveField;
