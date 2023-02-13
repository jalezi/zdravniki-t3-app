// temporary file to test the new IconButtonTwo component

import Link from 'next/link';
import { useRef } from 'react';

import IconButton from './IconButton';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const WithError = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const linkRef = useRef<HTMLAnchorElement>(null);
  return (
    <div>
      {/* @ts-expect-error no href on default component => "button" */}
      <IconButton href="/">With Error One </IconButton>
      {/* @ts-expect-error no href on default component */}
      <IconButton as="a">With Error Two</IconButton>
      {/* @ts-expect-error wrong type on default component => "button" */}
      <IconButton type="wrongType">With Error Three</IconButton>
      {/* @ts-expect-error wrong ref type for default component => button */}
      <IconButton ref={linkRef}>With Error Four</IconButton>
      {/* @ts-expect-error wrong "as" prop */}
      <IconButton as="span">With Error Five</IconButton>;
      {/* @ts-expect-error "as" does not match ref type */}
      <IconButton as="a" ref={buttonRef}>
        With Error Six
      </IconButton>
      {/* @ts-expect-error "as" does not match ref type */}
      <IconButton as="button" ref={linkRef}>
        With Error Seven
      </IconButton>
      {/* @ts-expect-error missing href on Link */}
      <IconButton as={Link}>With Error Eight</IconButton>
    </div>
  );
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const NoErrorOneAnd = () => {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <div>
      <IconButton as="a" href="/">
        No Error One
      </IconButton>
      <IconButton type="button">No Error Two</IconButton>;
      <IconButton as="button" type="reset">
        No Error Three
      </IconButton>
      <IconButton as="a" href="/" ref={linkRef}>
        No Error Four
      </IconButton>
      <IconButton as="button" type="button" ref={buttonRef}>
        No Error Five
      </IconButton>
      <IconButton type="button">
        <div>No Error Six</div>
      </IconButton>
      <IconButton as={Link} href="/">
        No Error Seven
      </IconButton>
      <IconButton as={Link} href="/" passHref>
        <a>No Error Eight</a>
      </IconButton>
    </div>
  );
};
