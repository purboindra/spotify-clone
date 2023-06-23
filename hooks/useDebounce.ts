import { useEffect, useState } from "react";

function useDebounce<T>(value: T, delay?: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay || 500);

    // DISPOSE TIME OUT
    return () => {
      clearTimeout(timer);
    };
  }, [delay, value]);

  return debouncedValue;
}

export default useDebounce;
