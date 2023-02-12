import { clsx } from 'clsx';
import React from 'react';

import styles from './Overlay.module.css';

type Props = { show: boolean };

const Overlay = ({ show }: Props) => {
  const overlayStyles = clsx(styles.Overlay, show && styles.menuOpen);

  return <div className={overlayStyles} />;
};

export default Overlay;
