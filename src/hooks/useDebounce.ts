import { useEffect, useState } from 'react';

export const useDebounce = <T>(value: T, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const setTimeOutId = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(setTimeOutId);
  }, [value, delay]);

  return [debouncedValue];
};
