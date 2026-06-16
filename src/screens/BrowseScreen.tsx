import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TopBar from '../components/TopBar.tsx';
import RouteCard from '../components/RouteCard.tsx';
import RouteCardSkeleton from '../components/RouteCardSkeleton.tsx';
import CreatorRow from '../components/CreatorRow.tsx';
import CreatorRowSkeleton from '../components/CreatorRowSkeleton.tsx';
import Icon from '../components/Icon.tsx';
import { getCreators, getRoutes } from '../services/index.ts';
import { useApp } from '../context/useApp.ts';
import { useDebounce } from '../hooks/useDebounce.ts';
import { usePageTitle } from '../hooks/usePageTitle.ts';
import { FY, FONTS } from '../theme.ts';
import type { Creator, Route } from '../types/index.ts';

type Tab = 'routes' | 'creators';

export default function BrowseScreen() {
  const navigate = useNavigate();
  const { followedIds } = useApp();
  usePageTitle('Browse', 'Search flight routes and MSFS YouTube creators.');

  const [routes, setRoutes] = useState<Route[]>([]);
  const [creators, setCreators] = useState<Creator[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [query, setQuery] = useState('');
  const [tab, setTab] = useState<Tab>('routes');
  const debouncedQuery = useDebounce(query, 250);

  useEffect(() => {
    let cancelled = false;
    Promise.all([getRoutes(), getCreators()])
      .then(([loadedRoutes, loadedCreators]) => {
        if (cancelled) return;
        setRoutes(loadedRoutes);
        setCreators(loadedCreators);
      })
      .catch(() => {
        if (!cancelled) setError(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const filteredRoutes = debouncedQuery
    ? routes.filter((r) =>
        `${r.dep} ${r.arr} ${r.name} ${r.aircraft}`
          .toLowerCase()
          .includes(debouncedQuery.toLowerCase())
      )
    : routes;

  const filteredCreators = debouncedQuery
    ? creators.filter((c) =>
        `${c.name} ${c.handle}`.toLowerCase().includes(debouncedQuery.toLowerCase())
      )
    : creators;

  return (
    <div className="fy-page-enter">
      <TopBar title="Browse" subtitle="Find routes & creators" />

      <div className="fy-screen">
        {/* Search */}
        <div style={{ position: 'relative', marginBottom: 12 }}>
          <div
            style={{
              position: 'absolute',
              left: 11,
              top: '50%',
              transform: 'translateY(-50%)',
            }}
          >
            <Icon
              d="M21 21l-4.35-4.35"
              d2="M11 3a8 8 0 1 0 0 16A8 8 0 0 0 11 3z"
              size={16}
              color={FY.fg3}
            />
          </div>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search routes, creators, ICAO…"
            aria-label="Search routes, creators, ICAO"
            style={{
              width: '100%',
              padding: '10px 12px 10px 36px',
              background: FY.midnight700,
              border: `1px solid ${FY.border}`,
              borderRadius: 10,
              color: FY.fg,
              fontFamily: FONTS.body,
              fontSize: 14,
              outline: 'none',
            }}
          />
        </div>

        {/* Tabs */}
        <div role="tablist" style={{ display: 'flex', gap: 6, marginBottom: 16 }}>
          {(['routes', 'creators'] as Tab[]).map((t) => (
            <button
              key={t}
              role="tab"
              aria-selected={tab === t}
              onClick={() => setTab(t)}
              style={{
                padding: '6px 16px',
                borderRadius: 9999,
                border: 'none',
                fontFamily: FONTS.body,
                fontSize: 13,
                fontWeight: 600,
                transition: 'all 150ms',
                background: tab === t ? FY.amber500 : FY.midnight600,
                color: tab === t ? '#fff' : FY.fg3,
              }}
            >
              {t === 'routes' ? 'Routes' : 'Creators'}
            </button>
          ))}
        </div>

        {/* Results */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {error ? (
            <p style={{ fontFamily: FONTS.body, fontSize: 14, color: FY.fg3, padding: '8px 0' }}>
              Couldn&apos;t load results. Please try again later.
            </p>
          ) : loading ? (
            Array.from({ length: 3 }).map((_, i) =>
              tab === 'routes' ? <RouteCardSkeleton key={i} /> : <CreatorRowSkeleton key={i} />
            )
          ) : tab === 'routes' ? (
            filteredRoutes.map((route) => {
              const creator = creators.find((c) => c.id === route.creatorId);
              return (
                <RouteCard
                  key={route.id}
                  route={route}
                  creator={creator}
                  onClick={() => navigate(`/route/${route.id}`)}
                />
              );
            })
          ) : (
            filteredCreators.map((creator) => (
              <CreatorRow
                key={creator.id}
                creator={creator}
                following={followedIds.has(creator.id)}
                onClick={() => navigate(`/creator/${creator.id}`)}
              />
            ))
          )}
          {!loading && !error && tab === 'routes' && filteredRoutes.length === 0 && (
            <p style={{ fontFamily: FONTS.body, fontSize: 14, color: FY.fg3, padding: '8px 0' }}>
              No routes match &quot;{debouncedQuery}&quot;.
            </p>
          )}
          {!loading && !error && tab === 'creators' && filteredCreators.length === 0 && (
            <p style={{ fontFamily: FONTS.body, fontSize: 14, color: FY.fg3, padding: '8px 0' }}>
              No creators match &quot;{debouncedQuery}&quot;.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
