import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TopBar from '../components/TopBar.tsx';
import SectionLabel from '../components/SectionLabel.tsx';
import Badge from '../components/Badge.tsx';
import RouteCard from '../components/RouteCard.tsx';
import RouteCardSkeleton from '../components/RouteCardSkeleton.tsx';
import CreatorRow from '../components/CreatorRow.tsx';
import CreatorRowSkeleton from '../components/CreatorRowSkeleton.tsx';
import Divider from '../components/Divider.tsx';
import Icon from '../components/Icon.tsx';
import { getCreators, getRoutes } from '../services/index.ts';
import { useApp } from '../context/useApp.ts';
import { usePageTitle } from '../hooks/usePageTitle.ts';
import { FY, FONTS } from '../theme.ts';
import type { Creator, Route } from '../types/index.ts';

export default function DispatchScreen() {
  const navigate = useNavigate();
  const { followedIds } = useApp();
  usePageTitle('Dispatch', 'Your personal flight dispatch feed from creators you follow.');

  const [routes, setRoutes] = useState<Route[]>([]);
  const [creators, setCreators] = useState<Creator[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

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

  const featured = routes[2];
  const featuredCreator = featured ? creators.find((c) => c.id === featured.creatorId) : undefined;
  const feed = routes.filter((r) => followedIds.has(r.creatorId));

  return (
    <div className="fy-page-enter">
      <TopBar
        title="Dispatch"
        rightSlot={
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              onClick={() => navigate('/browse')}
              aria-label="Search routes and creators"
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                background: FY.midnight600,
                border: `1px solid ${FY.border}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 0,
              }}
            >
              <Icon
                d="M21 21l-4.35-4.35"
                d2="M11 3a8 8 0 1 0 0 16A8 8 0 0 0 11 3z"
                size={16}
                color={FY.fg2}
              />
            </button>
          </div>
        }
      />

      <div className="fy-screen">
        {error ? (
          <p style={{ fontFamily: FONTS.body, fontSize: 14, color: FY.fg3, padding: '12px 0' }}>
            Couldn&apos;t load dispatch data. Please try again later.
          </p>
        ) : (
          <>
            <div style={{ marginBottom: 24 }}>
              <SectionLabel>Route of the week</SectionLabel>
              {loading || !featured ? (
                <RouteCardSkeleton />
              ) : (
                <button
                  type="button"
                  onClick={() => navigate(`/route/${featured.id}`)}
                  style={{
                    borderRadius: 20,
                    overflow: 'hidden',
                    border: '1px solid rgba(240,124,56,0.3)',
                    boxShadow: '0 0 32px rgba(240,124,56,0.18)',
                    width: '100%',
                    display: 'block',
                    padding: 0,
                    textAlign: 'left',
                  }}
                >
                  <div style={{ height: 180, background: featured.gradient, position: 'relative' }}>
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background:
                          'linear-gradient(to bottom, transparent 20%, rgba(8,12,20,0.95))',
                      }}
                    />
                    <div style={{ position: 'absolute', top: 12, left: 14 }}>
                      <Badge variant="amber">✦ Featured</Badge>
                    </div>
                    <div style={{ position: 'absolute', bottom: 14, left: 14, right: 14 }}>
                      <div
                        style={{
                          fontFamily: FONTS.mono,
                          fontSize: 11,
                          color: FY.amber300,
                          letterSpacing: '0.05em',
                          marginBottom: 3,
                        }}
                      >
                        {featured.dep} → {featured.arr}
                      </div>
                      <div
                        style={{
                          fontFamily: FONTS.display,
                          fontSize: 20,
                          fontWeight: 700,
                          color: FY.fg,
                          lineHeight: 1.15,
                        }}
                      >
                        {featured.name}
                      </div>
                      <div
                        style={{
                          fontFamily: FONTS.body,
                          fontSize: 12,
                          color: FY.fg2,
                          marginTop: 4,
                        }}
                      >
                        {featuredCreator?.name} · {featured.aircraft} · {featured.duration}
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      background: FY.midnight700,
                      padding: '10px 14px',
                      display: 'flex',
                      gap: 16,
                      alignItems: 'center',
                      flexWrap: 'wrap',
                    }}
                  >
                    {[
                      { l: 'Distance', v: featured.distance },
                      { l: 'Altitude', v: featured.altitude },
                      { l: 'Pilots', v: featured.pilots.toLocaleString() },
                    ].map(({ l, v }) => (
                      <div key={l}>
                        <div
                          style={{
                            fontFamily: FONTS.body,
                            fontSize: 9,
                            color: FY.fg3,
                            textTransform: 'uppercase',
                            letterSpacing: '0.08em',
                            fontWeight: 600,
                          }}
                        >
                          {l}
                        </div>
                        <div
                          style={{
                            fontFamily: FONTS.mono,
                            fontSize: 11,
                            color: FY.fg2,
                            marginTop: 1,
                          }}
                        >
                          {v}
                        </div>
                      </div>
                    ))}
                    <div style={{ marginLeft: 'auto' }}>
                      <Badge variant="smooth">Smooth ride</Badge>
                    </div>
                  </div>
                </button>
              )}
            </div>

            <div style={{ marginBottom: 24 }}>
              <SectionLabel>From your frequency</SectionLabel>
              {loading ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <RouteCardSkeleton />
                  <RouteCardSkeleton />
                </div>
              ) : feed.length === 0 ? (
                <p
                  style={{
                    fontFamily: FONTS.body,
                    fontSize: 14,
                    color: FY.fg3,
                    padding: '12px 0',
                  }}
                >
                  Follow some creators to see their routes here.
                </p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {feed.map((route) => {
                    const creator = creators.find((c) => c.id === route.creatorId);
                    return (
                      <RouteCard
                        key={route.id}
                        route={route}
                        creator={creator}
                        onClick={() => navigate(`/route/${route.id}`)}
                      />
                    );
                  })}
                </div>
              )}
            </div>

            <div style={{ marginBottom: 24 }}>
              <SectionLabel>Monitor a new frequency</SectionLabel>
              <div
                style={{
                  background: FY.midnight700,
                  border: `1px solid ${FY.border}`,
                  borderRadius: 14,
                  overflow: 'hidden',
                }}
              >
                {loading ? (
                  <>
                    <CreatorRowSkeleton />
                    <CreatorRowSkeleton />
                  </>
                ) : (
                  <>
                    {creators
                      .filter((c) => !followedIds.has(c.id))
                      .map((creator, i, arr) => (
                        <div key={creator.id}>
                          <CreatorRow
                            creator={creator}
                            following={false}
                            onClick={() => navigate(`/creator/${creator.id}`)}
                          />
                          {i < arr.length - 1 && <Divider />}
                        </div>
                      ))}
                    {creators.length > 0 && creators.every((c) => followedIds.has(c.id)) && (
                      <p
                        style={{
                          fontFamily: FONTS.body,
                          fontSize: 13,
                          color: FY.fg3,
                          padding: '16px',
                        }}
                      >
                        You&apos;re monitoring all available frequencies.
                      </p>
                    )}
                  </>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
