import { useRef, useEffect, useCallback } from "react";

export const useRefCallback = <T extends Function>(fn?: T): T => {
  const ref = useRef<T | undefined>(fn);

  useEffect(() => {
    ref.current = fn;
  }, [fn]);

  return useCallback(
    (...args: any[]) => ref.current?.(...args),
    []
  ) as unknown as T;
};
