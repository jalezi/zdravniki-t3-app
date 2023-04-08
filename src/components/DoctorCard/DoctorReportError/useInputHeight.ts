import { useEffect } from 'react';

const useInputHeight = (element: HTMLElement | null) => {
  useEffect(() => {
    if (!element) return;

    const setHeight = () => {
      element.style.height = 'auto';
      element.style.height = `${element.scrollHeight}px`;
    };
    element.addEventListener('input', setHeight);

    return () => element.removeEventListener('input', setHeight);
  }, [element]);
};

export default useInputHeight;
