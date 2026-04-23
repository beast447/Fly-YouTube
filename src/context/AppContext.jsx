import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { CREATORS as FALLBACK_CREATORS } from '../data/creators.js';
import { MY_FLIGHTS as FALLBACK_FLIGHTS, ROUTES as FALLBACK_ROUTES } from '../data/routes.js';
import { api } from '../api/client.js';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [creators, setCreators] = useState(FALLBACK_CREATORS);
  const [routes, setRoutes] = useState(FALLBACK_ROUTES);
  const [flights, setFlights] = useState(FALLBACK_FLIGHTS);
  const [followedIds, setFollowedIds] = useState(
    () => new Set(FALLBACK_CREATORS.filter((c) => c.following).map((c) => c.id))
  );
  const [loadedIds, setLoadedIds] = useState(() => new Set());
  const [currentUser, setCurrentUser] = useState(null);
  const [authError, setAuthError] = useState('');
  const [bootstrapped, setBootstrapped] = useState(false);

  useEffect(() => {
    async function bootstrap() {
      try {
        const [{ creators: creatorRows }, { routes: routeRows }] = await Promise.all([
          api.getCreators(),
          api.getRoutes(),
        ]);
        setCreators(creatorRows);
        setRoutes(routeRows);

        if (localStorage.getItem('fy_token')) {
          const [{ user }, { followedIds: followRows }, { flights: flightRows }] = await Promise.all([
            api.me(),
            api.getFollows(),
            api.getFlights(),
          ]);

          setCurrentUser(user);
          setFollowedIds(new Set(followRows));
          setFlights(flightRows);
        }
      } catch (error) {
        console.warn('API unavailable, using fallback mock data:', error.message);
        if (localStorage.getItem('fy_token')) {
          localStorage.removeItem('fy_token');
          setCurrentUser(null);
        }
      } finally {
        setBootstrapped(true);
      }
    }

    bootstrap();
  }, []);

  async function login(email, password) {
    setAuthError('');
    const { token, user } = await api.login(email, password);
    localStorage.setItem('fy_token', token);
    const [{ followedIds: followRows }, { flights: flightRows }] = await Promise.all([
      api.getFollows(),
      api.getFlights(),
    ]);
    setCurrentUser(user);
    setFollowedIds(new Set(followRows));
    setFlights(flightRows);
  }

  async function register(email, password, username) {
    setAuthError('');
    const { token, user } = await api.register(email, password, username);
    localStorage.setItem('fy_token', token);
    setCurrentUser(user);
    setFollowedIds(new Set());
    setFlights([]);
  }

  function logout() {
    localStorage.removeItem('fy_token');
    setCurrentUser(null);
    setFlights(FALLBACK_FLIGHTS);
    setFollowedIds(new Set(FALLBACK_CREATORS.filter((c) => c.following).map((c) => c.id)));
  }

  async function toggleFollow(id) {
    if (!currentUser) {
      setFollowedIds((prev) => {
        const next = new Set(prev);
        next.has(id) ? next.delete(id) : next.add(id);
        return next;
      });
      return;
    }

    try {
      const { following } = await api.toggleFollow(id);
      setFollowedIds((prev) => {
        const next = new Set(prev);
        if (following) {
          next.add(id);
        } else {
          next.delete(id);
        }
        return next;
      });
    } catch (error) {
      setAuthError(error.message);
    }
  }

  function toggleLoaded(id) {
    setLoadedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  const value = useMemo(
    () => ({
      creators,
      routes,
      flights,
      followedIds,
      loadedIds,
      currentUser,
      authError,
      bootstrapped,
      login,
      register,
      logout,
      setAuthError,
      toggleFollow,
      toggleLoaded,
    }),
    [creators, routes, flights, followedIds, loadedIds, currentUser, authError, bootstrapped]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  return useContext(AppContext);
}
