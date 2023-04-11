import { clsx } from 'clsx';

import { IconButton } from '@/components/Shared/Buttons';
import { MinusCircleSvg, PlusCircleSvg } from '@/components/Shared/Icons';

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
          <MinusCircleSvg />
        </IconButton>
      )}
      {hasAdd && (
        <IconButton
          type="button"
          className={addStyles}
          onClick={onAdd}
          aria-label={`add ${label}`}
        >
          <PlusCircleSvg />
        </IconButton>
      )}
    </div>
  );
};

export default AddRemoveField;
