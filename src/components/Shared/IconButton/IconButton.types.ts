import type Link from 'next/link';
import type { LinkProps } from 'next/link';
import type { ComponentPropsWithRef } from 'react';

// not sure why I had to include "className"; it should be already included in "ComponentPropsWithRef" and "LinkProps"
type NextJsLinkProps = Omit<LinkProps, 'as'> & {
  linkAs?: Pick<LinkProps, 'as'>['as'];
  className?: string;
  children?: React.ReactNode;
};

type InternalNextJsLinkProps = NextJsLinkProps & {
  as: typeof Link;
  className?: string;
  ref?: ComponentPropsWithRef<typeof Link>['ref'];
};

type InternalAnchorProps = Omit<ComponentPropsWithRef<'a'>, 'href' | 'ref'> &
  Required<Pick<ComponentPropsWithRef<'a'>, 'href'>> & {
    as: 'a';
    className?: string;
    ref?: ComponentPropsWithRef<'a'>['ref'];
  };

type InternalButtonProps = Omit<
  ComponentPropsWithRef<'button'>,
  'type' | 'ref'
> &
  Required<Pick<ComponentPropsWithRef<'button'>, 'type'>> & {
    as?: 'button';
    ref?: ComponentPropsWithRef<'button'>['ref'];
  };

export type InternalProps =
  | InternalNextJsLinkProps
  | InternalButtonProps
  | InternalAnchorProps;
