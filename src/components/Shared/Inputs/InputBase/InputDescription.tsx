import { clsx } from 'clsx';

import { Polymorphic } from '@/components/Shared/Polymorphic';
import type { PolymorphicComponentProps } from '@/components/Shared/Polymorphic';

type InputDescriptionCustomProps = {
  text: string | undefined;
  className?: string;
};

export type InputDescriptionProps = InputDescriptionCustomProps &
  Exclude<PolymorphicComponentProps<'p', InputDescriptionCustomProps>, 'as'>;

const InputDescription = ({
  className,
  text,
  ...props
}: InputDescriptionProps) => {
  if (!text) return null;

  const inputDescriptionStyles = clsx(className);

  return (
    <Polymorphic as="p" className={inputDescriptionStyles} {...props}>
      {text}
    </Polymorphic>
  );
};

export default InputDescription;
