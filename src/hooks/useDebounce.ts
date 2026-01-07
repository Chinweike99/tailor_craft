import { useEffect, useState } from 'react';

/**
 * Debounces a value - useful for search inputs, filters, etc.
 * @param value - The value to debounce
 * @param delay - Delay in milliseconds (default: 500ms)
 */
export function useDebounce<T>(value: T, delay = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

/**
 * Throttles a function - useful for scroll handlers, resize handlers, etc.
 * @param callback - Function to throttle
 * @param delay - Delay in milliseconds (default: 300ms)
 */
export function useThrottle<T extends (...args: any[]) => any>(
  callback: T,
  delay = 300
): T {
  const [lastRun, setLastRun] = useState(Date.now());

  return ((...args: any[]) => {
    const now = Date.now();
    if (now - lastRun >= delay) {
      setLastRun(now);
      return callback(...args);
    }
  }) as T;
}
