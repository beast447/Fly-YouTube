import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TopBar from '../components/TopBar.tsx';
import SectionLabel from '../components/SectionLabel.tsx';
import StatTile from '../components/StatTile.tsx';
import StatTileSkeleton from '../components/StatTileSkeleton.tsx';
import Badge from '../components/Badge.tsx';
import { getCreators, getMyFlights, getRoutes } from '../services/index.ts';
import { usePageTitle } from '../hooks/usePageTitle.ts';
import { FY, FONTS } from '../theme.ts';
import type { Creator, Flight, Route } from '../types/index.ts';

function parseDurationToHours(duration: string): number {
  const hoursMatch = duration.match(/(\d+)h/);
  const minutesMatch = duration.match(/(\d+)m/);
  const hours = hoursMatch ? parseInt(hoursMatch[1], 10) : 0;
  const minutes = minutesMatch ? parseInt(minutesMatch[1], 10) : 0;
  return hours + minutes / 60;
}

export default function LogbookScreen() {
  const navigate = useNavigate();
  usePageTitle('Logbook', 'Your completed Fly YouTube flight history.');

  const [flights, setFlights] = useState<Flight[]>([]);
  const [routes, setRoutes] = useState<Route[]>([]);
  const [creators, setCreators] = useState<Creator[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    Promise.all([getMyFlights(), getRoutes(), getCreators()])
      .then(([loadedFlights, loadedRoutes, loadedCreators]) => {
        if (cancelled) return;
        setFlights(loadedFlights);
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

  const totalNm = flights.reduce((s, f) => s + parseInt(f.distance.replace(/,/g, ''), 10), 0);
  const totalHrs = flights.reduce((s, f) => s + parseDurationToHours(f.duration), 0);

  return (
    <div className="fy-page-enter">
      <TopBar title="Logbook" subtitle="Your flight history" />

      <div className="fy-screen">
        {error ? (
          <p style={{ fontFamily: FONTS.body, fontSize: 14, color: FY.fg3, padding: '12px 0' }}>
            Couldn&apos;t load your logbook. Please try again later.
          </p>
        ) : (
          <>
            {/* Stats */}
            <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
              {loading ? (
                <>
                  <StatTileSkeleton />
                  <StatTileSkeleton />
                  <StatTileSkeleton />
                </>
              ) : (
                <>
                  <StatTile value={flights.length} label="Flights logged" />
                  <StatTile
                    value={Math.round(totalHrs)}
                    label="Hours flown"
                    unit="h"
                    accent={FY.horizon400}
                  />
                  <StatTile
                    value={(totalNm / 1000).toFixed(1) + 'k'}
                    label="Nm total"
                    accent={FY.gold300}
                  />
                </>
              )}
            </div>

            {/* Rank */}
            <div
              style={{
                background: 'linear-gradient(135deg, rgba(240,124,56,0.15), rgba(240,186,64,0.08))',
                border: '1px solid rgba(240,124,56,0.25)',
                borderRadius: 14,
                padding: '12px 14px',
                marginBottom: 20,
                display: 'flex',
                alignItems: 'center',
                gap: 12,
              }}
            >
              <div
                style={{ fontFamily: FONTS.display, fontSize: 32, lineHeight: 1 }}
                aria-hidden="true"
              >
                ✈
              </div>
              <div>
                <div
                  style={{
                    fontFamily: FONTS.body,
                    fontSize: 10,
                    color: FY.amber300,
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.10em',
                  }}
                >
                  Rank
                </div>
                <div
                  style={{ fontFamily: FONTS.display, fontSize: 18, fontWeight: 700, color: FY.fg }}
                >
                  First Officer
                </div>
                <div style={{ fontFamily: FONTS.body, fontSize: 11, color: FY.fg3 }}>
                  68 nm to Captain
                </div>
              </div>
              <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
                <div style={{ fontFamily: FONTS.mono, fontSize: 11, color: FY.amber400 }}>
                  4 / 5 flights
                </div>
                <div
                  style={{
                    width: 60,
                    height: 4,
                    background: FY.midnight500,
                    borderRadius: 9999,
                    marginTop: 5,
                  }}
                >
                  <div
                    style={{
                      width: '80%',
                      height: '100%',
                      background: FY.amber400,
                      borderRadius: 9999,
                    }}
                  />
                </div>
              </div>
            </div>

            <SectionLabel>Recent flights</SectionLabel>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {loading
                ? Array.from({ length: 4 }).map((_, i) => (
                    <div
                      key={i}
                      style={{
                        background: FY.midnight700,
                        border: `1px solid ${FY.border}`,
                        borderRadius: 12,
                        padding: '10px 14px',
                        height: 64,
                      }}
                    />
                  ))
                : flights.map((flight) => {
                    const route = routes.find((r) => r.id === flight.routeId);
                    const creator = route ? creators.find((c) => c.id === route.creatorId) : null;
                    return (
                      <button
                        type="button"
                        key={flight.id}
                        onClick={() => route && navigate(`/route/${route.id}`)}
                        disabled={!route}
                        style={{
                          background: FY.midnight700,
                          border: `1px solid ${FY.border}`,
                          borderRadius: 12,
                          padding: '10px 14px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 10,
                          width: '100%',
                          textAlign: 'left',
                        }}
                      >
                        <div
                          aria-hidden="true"
                          style={{
                            width: 44,
                            height: 44,
                            borderRadius: 10,
                            background: route?.gradient || FY.midnight600,
                            flexShrink: 0,
                          }}
                        />
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div
                            style={{
                              fontFamily: FONTS.mono,
                              fontSize: 10,
                              color: FY.amber300,
                              letterSpacing: '0.04em',
                            }}
                          >
                            {route?.dep} → {route?.arr}
                          </div>
                          <div
                            style={{
                              fontFamily: FONTS.body,
                              fontSize: 12,
                              fontWeight: 600,
                              color: FY.fg,
                              marginTop: 1,
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            {route?.name}
                          </div>
                          <div style={{ fontFamily: FONTS.body, fontSize: 10, color: FY.fg3 }}>
                            {creator?.name} · {flight.duration}
                          </div>
                        </div>
                        <div style={{ textAlign: 'right', flexShrink: 0 }}>
                          <div
                            style={{
                              fontFamily: FONTS.body,
                              fontSize: 10,
                              color: FY.fg3,
                              marginBottom: 4,
                            }}
                          >
                            {flight.date}
                          </div>
                          <Badge variant="smooth">✓ Complete</Badge>
                        </div>
                      </button>
                    );
                  })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
