import { useCallback, useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initial: T) {
  const [state, setState] = useState<T>(() => {
    try {
      if (typeof window === "undefined") return initial;
      const raw = window.localStorage.getItem(key);
      if (raw == null) return initial;
      const parsed = JSON.parse(raw) as T;
      return parsed ?? initial;
    } catch {
      return initial;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(state));
    } catch {
      /* quota / private mode */
    }
  }, [key, state]);

  const set = useCallback((value: T | ((prev: T) => T)) => {
    setState((prev) => (typeof value === "function" ? (value as (p: T) => T)(prev) : value));
  }, []);

  return [state, set] as const;
}
