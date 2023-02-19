import { clsx } from 'clsx';

import useScroll from '@/lib/hooks/useScroll';

import styles from './TogglerContainer.module.css';

export const TogglerContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { isScrolled } = useScroll(100, 500);

  const togglerContainerStyles = clsx(
    styles.TogglerContainer,
    isScrolled && styles.Shrunk
  );

  return <div className={togglerContainerStyles}>{children}</div>;
};
