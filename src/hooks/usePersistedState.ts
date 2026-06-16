import { useEffect, useState, type Dispatch, type SetStateAction } from 'react';

interface Serializer<T> {
  stringify: (value: T) => string;
  parse: (raw: string) => T;
}

const defaultSerializer: Serializer<unknown> = {
  stringify: JSON.stringify,
  parse: JSON.parse,
};

export const setSerializer: Serializer<Set<number>> = {
  stringify: (value) => JSON.stringify(Array.from(value)),
  parse: (raw) => new Set(JSON.parse(raw) as number[]),
};

export function usePersistedState<T>(
  key: string,
  initialValue: T | (() => T),
  serializer: Serializer<T> = defaultSerializer as Serializer<T>
): [T, Dispatch<SetStateAction<T>>] {
  const [state, setState] = useState<T>(() => {
    try {
      const raw = window.localStorage.getItem(key);
      if (raw !== null) return serializer.parse(raw);
    } catch {
      // ignore corrupt storage and fall back to initialValue
    }
    return initialValue instanceof Function ? initialValue() : initialValue;
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, serializer.stringify(state));
    } catch {
      // storage may be unavailable (private mode, quota exceeded) — fail silently
    }
  }, [key, state, serializer]);

  return [state, setState];
}
