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
export const Table = (props: object) => {
  const style = appendClassNames(styles.Table as string);

  return <Polymorphic as="table" className={style} {...props} />;
};

export const THead = (props: object) => {
  const style = appendClassNames(styles.THead as string);

  return <Polymorphic as="thead" className={style} {...props} />;
};

export const TBody = (props: object) => {
  const style = appendClassNames(styles.TBody as string);

  return <Polymorphic as="tbody" className={style} {...props} />;
};

export const Tr = (props: object) => {
  const style = appendClassNames(styles.Tr as string);

  return <Polymorphic as="tr" className={style} {...props} />;
};

export const Th = (props: object) => {
  const style = appendClassNames(styles.Th as string);

  return <Polymorphic as="th" className={style} {...props} />;
};

export const Td = (props: object) => {
  const style = appendClassNames(styles.Td as string);

  return <Polymorphic as="td" className={style} {...props} />;
};
