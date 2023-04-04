import { clsx } from 'clsx';

import { Polymorphic } from '@/components/Shared/Polymorphic';
import type { PolymorphicComponentProps } from '@/components/Shared/Polymorphic';

type InputErrorCustomProps = {
  as?: 'p' | 'label';
  text: string | undefined;
  className?: string;
};

export type InputErrorProps =
  | (
      | ({ as?: 'p' } & PolymorphicComponentProps<'p', InputErrorCustomProps>)
      | ({ as: 'label' } & PolymorphicComponentProps<
          'label',
          InputErrorCustomProps
        >)
    ) &
      InputErrorCustomProps;

const InputError = ({
  as = 'p',
  className,
  text,
  ...props
}: InputErrorProps) => {
  const inputErrorStyles = clsx(className);

  return (
    <Polymorphic as={as} className={inputErrorStyles} {...props}>
      {text}
    </Polymorphic>
  );
};

export default InputError;
