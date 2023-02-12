import styles from './HamburgerContainer.module.css';

export const HamburgerContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <div className={styles.HamburgerContainer}>{children}</div>;
};
