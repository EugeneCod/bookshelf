import { useEffect, useState } from 'react';

export const useDebounce = (searchQuery: string, delay: number): string => {
  const [value, setValue] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => setValue(searchQuery), delay);
    return () => clearTimeout(handler);
  }, [delay, searchQuery]);

  return value;
};
