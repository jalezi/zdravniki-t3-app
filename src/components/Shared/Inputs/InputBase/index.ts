import Base from './InputBase';
import Description from './InputDescription';
import Error from './InputError';
import Label from './InputLabel';
import Wrapper from './InputWrapper';

export type { InputBaseProps } from './InputBase';
export type { InputDescriptionProps } from './InputDescription';
export type { InputErrorProps } from './InputError';
export type { InputLabelProps } from './InputLabel';
export type { InputWrapperProps } from './InputWrapper';

export const InputBase = {
  Input: Base,
  Wrapper: Wrapper,
  Label: Label,
  Description: Description,
  Error: Error,
};

export default InputBase;
