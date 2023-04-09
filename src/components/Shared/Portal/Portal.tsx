import type { ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import FocusLock from 'react-focus-lock';

import styles from './Portal.module.css';

interface PortalProps {
  children: ReactNode;
  anchorSelector?: string;
  noOverlay?: boolean;
}

const Overlay = ({ children }: { children: ReactNode }) => (
  <div className={styles.Overlay}>{children}</div>
);

const Portal = ({
  children,
  anchorSelector = '#portal',
  noOverlay,
}: PortalProps) => {
  const ref = useRef<Element | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    ref.current = document.querySelector<HTMLElement>(anchorSelector);
    document.body.style.overflow = 'hidden';
    setMounted(true);
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [anchorSelector]);

  const overlay = noOverlay ? <> {children} </> : <Overlay>{children}</Overlay>;

  return mounted && ref.current
    ? createPortal(<FocusLock returnFocus>{overlay}</FocusLock>, ref.current)
    : null;
};

Portal.defaultProps = {
  anchorSelector: '#portal',
};

export default Portal;
