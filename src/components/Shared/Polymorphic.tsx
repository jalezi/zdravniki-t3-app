import { type ComponentPropsWithRef, forwardRef } from 'react';

type PolymorphicRef<C extends React.ElementType> =
  ComponentPropsWithRef<C>['ref'];
type AsProp<C extends React.ElementType> = {
  as?: C;
};

type PropsToOmit<C extends React.ElementType, P> = keyof (AsProp<C> & P);

export type PolymorphicComponentProps<
  C extends React.ElementType,
  Props = object,
> = React.PropsWithChildren<
  Props &
    AsProp<C> &
    Omit<React.ComponentPropsWithoutRef<C>, PropsToOmit<C, Props>>
>;

export type PolymorphicComponentPropsWithRef<
  C extends React.ElementType,
  Props = object,
> = PolymorphicComponentProps<C, Props> & { ref?: PolymorphicRef<C> };

export const Polymorphic = forwardRef(
  <C extends React.ElementType, Props>(
    { as, children, ...rest }: PolymorphicComponentPropsWithRef<C, Props>,
    ref?: PolymorphicRef<C>
  ) => {
    const Component = as || 'div';

    return (
      <Component ref={ref} {...rest}>
        {children}
      </Component>
    );
  }
);

Polymorphic.displayName = 'Polymorphic';

export default Polymorphic;
