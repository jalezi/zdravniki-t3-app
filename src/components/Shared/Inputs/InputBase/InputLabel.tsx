import { clsx } from 'clsx';

import { Polymorphic } from '@/components/Shared/Polymorphic';
import type { PolymorphicComponentProps } from '@/components/Shared/Polymorphic';

type InputLabelCustomProps = { text: string };

export type InputLabelProps = InputLabelCustomProps &
  Omit<PolymorphicComponentProps<'label', InputLabelCustomProps>, 'as'>;

const InputLabel = ({ className, text, ...props }: InputLabelProps) => {
  const inputLabelStyles = clsx(className);

  return (
    <Polymorphic as="label" className={inputLabelStyles} {...props}>
      {text}
    </Polymorphic>
  );
};

export default InputLabel;
