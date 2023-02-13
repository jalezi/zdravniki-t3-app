import { useCallback } from 'react';
import { useEventListener } from 'usehooks-ts';

const useKeyboardNavigation = (showNavigation: boolean, cb: () => void) => {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!showNavigation) {
        return;
      }

      if (['Escape', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
        cb();
        return;
      }

      const focusableElements = [
        ...document.querySelectorAll("[data-keep-focus='true']"),
      ] as HTMLElement[];

      const length = focusableElements.length;
      if (length === 0 || length === 1) {
        return;
      }

      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[
        focusableElements.length - 1
      ] as HTMLElement;

      const activeElement = document.activeElement as HTMLElement;
      const activeElementIndex = [...focusableElements].indexOf(activeElement);

      let nextElement: HTMLElement | undefined;

      switch (event.key) {
        case 'Tab':
          // keep focus inside the focusableElements
          if (activeElementIndex === 0 && event.shiftKey) {
            lastElement.focus();
            event.preventDefault();
            break;
          }

          if (activeElementIndex === length - 1 && !event.shiftKey) {
            firstElement.focus();
            event.preventDefault();
            break;
          }

          break;
        case 'ArrowUp': {
          // focus last or previous
          if (activeElementIndex === 0) {
            lastElement.focus();
            event.preventDefault();
            break;
          }
          nextElement = focusableElements[activeElementIndex - 1];
          nextElement?.focus();
          event.preventDefault();
          break;
        }
        case 'ArrowDown': {
          // focus first or next
          if (activeElementIndex === focusableElements.length - 1) {
            firstElement.focus();
            event.preventDefault();
            break;
          }
          nextElement = focusableElements[activeElementIndex + 1];
          nextElement?.focus();
          event.preventDefault();
          break;
        }

        default:
          return;
      }
    },
    [cb, showNavigation]
  );

  useEventListener('keydown', handleKeyDown);
};

export default useKeyboardNavigation;
