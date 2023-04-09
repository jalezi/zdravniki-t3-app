import type { RefObject } from 'react';
import { useCallback, useEffect } from 'react';

const useKeyboardNavigation = (
  shouldContinue: boolean,
  cb: (e: KeyboardEvent) => void,
  parent: RefObject<HTMLElement>,
  querySelector = "[data-keep-focus='true']"
) => {
  const handleKeyDown = useCallback(
    // eslint-disable-next-line sonarjs/cognitive-complexity
    (event: KeyboardEvent, element: HTMLElement) => {
      if (event.metaKey || event.ctrlKey || event.altKey) {
        return;
      }

      if (['Escape', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
        cb(event);
        return;
      }

      const focusableElements = [
        ...element.querySelectorAll(querySelector),
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
        case 'Enter':
          event.preventDefault();
          activeElement.click();
          // todo - handle enter
          break;
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
    [cb, querySelector]
  );

  useEffect(() => {
    const parentElement = parent.current;

    if (!parentElement || !shouldContinue) {
      return;
    }

    if (parentElement) {
      parent.current.addEventListener('keydown', event =>
        handleKeyDown(event, parentElement)
      );
    }

    return () => {
      if (parentElement) {
        parentElement.removeEventListener('keydown', event =>
          handleKeyDown(event, parentElement)
        );
      }
    };
  }, [handleKeyDown, shouldContinue, parent]);
};

export default useKeyboardNavigation;
