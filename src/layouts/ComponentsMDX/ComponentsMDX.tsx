import { clsx } from 'clsx';

import { Polymorphic } from '@/components/Shared/Polymorphic';

import styles from './ComponentsMDX.module.css';

const appendClassNames = (...className: string[]) =>
  clsx(styles.ComponentsMDX, ...className);

export const H2 = (props: object) => {
  const style = appendClassNames(styles.H2 as string);

  return <Polymorphic as="h2" className={style} {...props} />;
};

export const H3 = (props: object) => {
  const style = appendClassNames(styles.H3 as string);

  return <Polymorphic as="h3" className={style} {...props} />;
};

export const H4 = (props: object) => {
  const style = appendClassNames(styles.H4 as string);

  return <Polymorphic as="h4" className={style} {...props} />;
};

export const P = (props: object) => {
  const style = appendClassNames(styles.P as string);

  return <Polymorphic as="p" className={style} {...props} />;
};

export const Ul = (props: object) => {
  const style = appendClassNames(styles.Ul as string);

  return <Polymorphic as="ul" className={style} {...props} />;
};

export const Ol = (props: object) => {
  const style = appendClassNames(styles.Ol as string);

  return <Polymorphic as="ol" className={style} {...props} />;
};

export const Strong = (props: object) => {
  const style = appendClassNames(styles.Strong as string);

  return <Polymorphic as="strong" className={style} {...props} />;
};

export const A = (props: object) => {
  const style = appendClassNames(styles.A as string);

  return <Polymorphic as="a" className={style} target="_blank" {...props} />;
};
