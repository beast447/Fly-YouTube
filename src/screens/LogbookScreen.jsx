import TopBar from '../components/TopBar.jsx';
import ScrollArea from '../components/ScrollArea.jsx';
import SectionLabel from '../components/SectionLabel.jsx';
import StatTile from '../components/StatTile.jsx';
import Badge from '../components/Badge.jsx';
import { MY_FLIGHTS, ROUTES } from '../data/routes.js';
import { CREATORS } from '../data/creators.js';
import { FY, FONTS } from '../theme.js';

export default function LogbookScreen({ onRouteSelect }) {
  const totalNm = MY_FLIGHTS.reduce(
    (s, f) => s + parseInt(f.distance.replace(/,/g, ''), 10),
    0
  );
  const totalHrs = 32;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <TopBar title="Logbook" subtitle="Your flight history" />
      <ScrollArea>
        <div style={{ padding: '14px 16px' }}>
          <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
            <StatTile value={MY_FLIGHTS.length} label="Flights logged" />
            <StatTile value={totalHrs} label="Hours flown" unit="h" accent={FY.horizon400} />
            <StatTile
              value={(totalNm / 1000).toFixed(1) + 'k'}
              label="Nm total"
              accent={FY.gold300}
            />
          </div>

          <div
            style={{
              background:
                'linear-gradient(135deg, rgba(240,124,56,0.15), rgba(240,186,64,0.08))',
              border: '1px solid rgba(240,124,56,0.25)',
              borderRadius: 14,
              padding: '12px 14px',
              marginBottom: 20,
              display: 'flex',
              alignItems: 'center',
              gap: 12,
            }}
          >
            <div style={{ fontFamily: FONTS.display, fontSize: 32, lineHeight: 1 }}>✈</div>
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
                style={{
                  fontFamily: FONTS.display,
                  fontSize: 18,
                  fontWeight: 700,
                  color: FY.fg,
                }}
              >
                First Officer
              </div>
              <div
                style={{
                  fontFamily: FONTS.body,
                  fontSize: 11,
                  color: FY.fg3,
                }}
              >
                68 nm to Captain
              </div>
            </div>
            <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
              <div
                style={{
                  fontFamily: FONTS.mono,
                  fontSize: 11,
                  color: FY.amber400,
                }}
              >
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
            {MY_FLIGHTS.map((flight) => {
              const route = ROUTES.find((r) => r.id === flight.routeId);
              const creator = route
                ? CREATORS.find((c) => c.id === route.creatorId)
                : null;
              return (
                <div
                  key={flight.id}
                  onClick={() => route && onRouteSelect(route)}
                  style={{
                    background: FY.midnight700,
                    border: `1px solid ${FY.border}`,
                    borderRadius: 12,
                    padding: '10px 14px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                  }}
                >
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 10,
                      background: route?.gradient || FY.midnight600,
                      flexShrink: 0,
                    }}
                  />
                  <div style={{ flex: 1 }}>
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
                      }}
                    >
                      {route?.name}
                    </div>
                    <div
                      style={{
                        fontFamily: FONTS.body,
                        fontSize: 10,
                        color: FY.fg3,
                      }}
                    >
                      {creator?.name} · {flight.duration}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div
                      style={{
                        fontFamily: FONTS.body,
                        fontSize: 10,
                        color: FY.fg3,
                      }}
                    >
                      {flight.date}
                    </div>
                    <Badge variant="smooth">✓ Complete</Badge>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
