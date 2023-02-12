import styles from './TogglerContainer.module.css';

export const TogglerContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <div className={styles.TogglerContainer}>{children}</div>;
};
