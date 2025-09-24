/**
 * Safely sets a CSS style property on an element.
 * Handles null checks and type safety.
 */
export const safelySetStyle = (
  element: Element | null, 
  property: string, 
  value: string
): void => {
  if (element && 'style' in element) {
    const htmlElement = element as HTMLElement;
    // Use CSS object property assignment with type casting
    (htmlElement.style as unknown as Record<string, string>)[property] = value;
  }
};
