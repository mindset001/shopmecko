/**
 * Safely sets a CSS style property on an element.
 * Handles null checks and type safety.
 */
export const safelySetStyle = (element: Element | null, property: string, value: string): void => {
  if (element && 'style' in element) {
    (element as HTMLElement).style[property as any] = value;
  }
};
