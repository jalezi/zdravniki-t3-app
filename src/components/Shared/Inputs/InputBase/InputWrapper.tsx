import { clsx } from 'clsx';

export type InputWrapperProps = {
  children: React.ReactNode;
  className?: string;
};

const InputWrapper = ({ children, className }: InputWrapperProps) => {
  const inputWrapperStyles = clsx(className);
  return <div className={inputWrapperStyles}>{children}</div>;
};

export default InputWrapper;
