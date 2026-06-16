import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import { setSerializer, usePersistedState } from './usePersistedState.ts';

describe('usePersistedState', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('initializes from the provided default when nothing is stored', () => {
    const { result } = renderHook(() => usePersistedState('fy-test-key', 42));
    expect(result.current[0]).toBe(42);
  });

  it('persists updates to localStorage and reads them back', () => {
    const { result, unmount } = renderHook(() => usePersistedState('fy-test-key', 0));

    act(() => {
      result.current[1](7);
    });
    expect(result.current[0]).toBe(7);
    unmount();

    const { result: secondRender } = renderHook(() => usePersistedState('fy-test-key', 0));
    expect(secondRender.current[0]).toBe(7);
  });

  it('round-trips a Set<number> using the custom serializer', () => {
    const { result } = renderHook(() =>
      usePersistedState<Set<number>>('fy-test-set', () => new Set([1, 2]), setSerializer)
    );

    act(() => {
      result.current[1]((prev) => new Set([...prev, 3]));
    });

    expect(result.current[0]).toEqual(new Set([1, 2, 3]));

    const stored = window.localStorage.getItem('fy-test-set');
    expect(stored).toBe(JSON.stringify([1, 2, 3]));
  });
});
