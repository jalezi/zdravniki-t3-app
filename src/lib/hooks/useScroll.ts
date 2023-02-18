import { useRef, useState } from 'react';
import { useEventListener } from 'usehooks-ts';

const useScroll = (scrollMargin: number) => {
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const [isScrolled, setIsScrolled] = useState<boolean | null>(null);
  const handleScroll = (
    e: HTMLElementEventMap['scroll'] & { currentTarget: { scrollY: number } }
  ) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    const { currentTarget } = e;

    if (currentTarget) {
      if (currentTarget.scrollY > scrollMargin) {
        setIsScrolled(true);
        timeoutRef.current = setTimeout(() => setIsScrolled(false), 400);
      }

      if (currentTarget?.scrollY <= scrollMargin) {
        setIsScrolled(false);
      }
    }
  };

  useEventListener('scroll', handleScroll as () => void);
  return { isScrolled };
};

export default useScroll;
