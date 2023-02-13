// temporary file to test the new IconButtonTwo component

import Link from 'next/link';
import { useRef } from 'react';

import Button from './Button';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const WithError = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const linkRef = useRef<HTMLAnchorElement>(null);
  return (
    <div>
      {/* @ts-expect-error no href on default component => "button" */}
      <Button href="/">With Error One </Button>
      {/* @ts-expect-error no href on default component */}
      <Button as="a">With Error Two</Button>
      {/* @ts-expect-error wrong type on default component => "button" */}
      <Button type="wrongType">With Error Three</Button>
      {/* @ts-expect-error wrong ref type for default component => button */}
      <Button ref={linkRef}>With Error Four</Button>
      {/* @ts-expect-error wrong "as" prop */}
      <Button as="span">With Error Five</Button>;
      {/* @ts-expect-error "as" does not match ref type */}
      <Button as="a" ref={buttonRef}>
        With Error Six
      </Button>
      {/* @ts-expect-error "as" does not match ref type */}
      <Button as="button" ref={linkRef}>
        With Error Seven
      </Button>
      {/* @ts-expect-error missing href on Link */}
      <Button as={Link}>With Error Eight</Button>
    </div>
  );
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const NoErrorOneAnd = () => {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <div>
      <Button as="a" href="/">
        No Error One
      </Button>
      <Button type="button">No Error Two</Button>;
      <Button as="button" type="reset">
        No Error Three
      </Button>
      <Button as="a" href="/" ref={linkRef}>
        No Error Four
      </Button>
      <Button as="button" type="button" ref={buttonRef}>
        No Error Five
      </Button>
      <Button type="button">
        <div>No Error Six</div>
      </Button>
      <Button as={Link} href="/">
        No Error Seven
      </Button>
      <Button as={Link} href="/" passHref>
        <a>No Error Eight</a>
      </Button>
    </div>
  );
};
