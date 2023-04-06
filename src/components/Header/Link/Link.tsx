import { clsx } from 'clsx';
import { useRouter } from 'next/router';
import React from 'react';

import { Button } from '@/components/Shared/Buttons';
import type {
  InternalAnchorProps,
  InternalNextJsLinkProps,
} from '@/lib/types/Buttons';

import styles from './Link.module.css';

type Props = {
  isActive: ((asPath: string | undefined) => boolean) | undefined;
} & (InternalNextJsLinkProps | InternalAnchorProps);

const Link = ({ as = 'a', children, isActive, ...props }: Props) => {
  const { asPath } = useRouter();
  const regularStyles = clsx(styles.Link, props.className);

  const radius = 'xxs';

  if (as === 'a') {
    const { href, ...anchorProps } = props as Omit<
      InternalAnchorProps,
      'as' | 'children'
    >;

    return (
      <Button
        as={as}
        href={href}
        radius={radius}
        {...anchorProps}
        className={regularStyles}
      >
        {children}
      </Button>
    );
  }

  const asPathWithoutHash = asPath.split('#')[0];

  const applyActive =
    isActive?.(asPathWithoutHash) ?? asPathWithoutHash === props.href;

  const linkProps = props as Omit<InternalNextJsLinkProps, 'as' | 'children'>;
  const activeStyles = clsx(regularStyles, applyActive && styles.Active);
  return (
    <Button as={as} radius={radius} {...linkProps} className={activeStyles}>
      {children}
    </Button>
  );
};

export default Link;
