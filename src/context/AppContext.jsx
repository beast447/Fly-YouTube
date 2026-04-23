import { createContext, useContext, useState } from 'react';
import { CREATORS } from '../data/creators.js';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [followedIds, setFollowedIds] = useState(
    () => new Set(CREATORS.filter((c) => c.following).map((c) => c.id))
  );
  const [loadedIds, setLoadedIds] = useState(() => new Set());

  function toggleFollow(id) {
    setFollowedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  function toggleLoaded(id) {
    setLoadedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  return (
    <AppContext.Provider value={{ followedIds, loadedIds, toggleFollow, toggleLoaded }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
