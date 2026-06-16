import type { ReactNode } from 'react';
import { CREATORS } from '../data/creators.ts';
import { setSerializer, usePersistedState } from '../hooks/usePersistedState.ts';
import { AppContext } from './context.ts';

export function AppProvider({ children }: { children: ReactNode }) {
  const [followedIds, setFollowedIds] = usePersistedState<Set<number>>(
    'fy-followed-ids',
    () => new Set(CREATORS.filter((c) => c.following).map((c) => c.id)),
    setSerializer
  );
  const [loadedIds, setLoadedIds] = usePersistedState<Set<number>>(
    'fy-loaded-ids',
    () => new Set(),
    setSerializer
  );

  function toggleFollow(id: number) {
    setFollowedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleLoaded(id: number) {
    setLoadedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <AppContext.Provider value={{ followedIds, loadedIds, toggleFollow, toggleLoaded }}>
      {children}
    </AppContext.Provider>
  );
}
