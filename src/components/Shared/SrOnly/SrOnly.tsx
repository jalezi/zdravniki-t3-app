import type { PolymorphicComponentProps } from '../Polymorphic';
import { Polymorphic } from '../Polymorphic';

type Props = PolymorphicComponentProps<React.ElementType>;

const SrOnly = ({ children, ...props }: Props) => {
  return (
    <Polymorphic className="sr-only" {...props}>
      {children}
    </Polymorphic>
  );
};

const H1 = (props: Props) => {
  return <SrOnly as="h1">{props.children}</SrOnly>;
};

SrOnly.H1 = H1;
export default SrOnly;
