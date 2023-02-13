import { clsx } from 'clsx';
import { forwardRef } from 'react';

import styles from './Overlay.module.css';

type OverlayProps = { show: boolean };

const Overlay = ({ show }: OverlayProps, ref: React.Ref<HTMLDivElement>) => {
  const overlayStyles = clsx(styles.Overlay, show && styles.menuOpen);

  return <div ref={ref} className={overlayStyles} tabIndex={-1} />;
};

export default forwardRef(Overlay);
