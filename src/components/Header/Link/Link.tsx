import { clsx } from 'clsx';
import { useRouter } from 'next/router';
import React from 'react';

import { Button } from '@/components/Shared/Buttons';
import type {
  InternalAnchorProps,
  InternalNextJsLinkProps,
} from '@/types/Buttons';

import styles from './Link.module.css';

type Props = InternalNextJsLinkProps | InternalAnchorProps;

const Link = ({ as = 'a', children, ...props }: Props) => {
  const { asPath } = useRouter();
  const regularStyles = clsx(styles.Link, props.className);

  if (as === 'a') {
    const { href, ...anchorProps } = props as Omit<
      InternalAnchorProps,
      'as' | 'children'
    >;

    return (
      <Button as={as} href={href} {...anchorProps} className={regularStyles}>
        {children}
      </Button>
    );
  }

  const asPathWithoutHash = asPath.split('#')[0];

  const isActive = asPathWithoutHash === props.href;

  const linkProps = props as Omit<InternalNextJsLinkProps, 'as' | 'children'>;
  const activeStyles = clsx(regularStyles, isActive && styles.Active);
  return (
    <Button as={as} {...linkProps} className={activeStyles}>
      {children}
    </Button>
  );
};

export default Link;
