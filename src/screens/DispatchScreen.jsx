import TopBar from '../components/TopBar.jsx';
import ScrollArea from '../components/ScrollArea.jsx';
import SectionLabel from '../components/SectionLabel.jsx';
import Badge from '../components/Badge.jsx';
import RouteCard from '../components/RouteCard.jsx';
import CreatorRow from '../components/CreatorRow.jsx';
import Icon from '../components/Icon.jsx';
import { ROUTES } from '../data/routes.js';
import { CREATORS } from '../data/creators.js';
import { FY, FONTS } from '../theme.js';

export default function DispatchScreen({ onRouteSelect, onCreatorSelect }) {
  const featured = ROUTES[2];
  const featuredCreator = CREATORS.find((c) => c.id === featured.creatorId);
  const feed = ROUTES.filter((r) => {
    const c = CREATORS.find((x) => x.id === r.creatorId);
    return c && c.following;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <TopBar
        title="Dispatch"
        rightSlot={
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                background: FY.midnight600,
                border: `1px solid ${FY.border}`,
                cursor: 'pointer',
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
            <button
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                background: FY.amber500,
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 0,
              }}
            >
              <Icon
                d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"
                d2="M13.73 21a2 2 0 0 1-3.46 0"
                size={16}
                color="#fff"
              />
            </button>
          </div>
        }
      />
      <ScrollArea>
        <div style={{ padding: '14px 16px 0' }}>
          <SectionLabel>Route of the week</SectionLabel>
          <div
            onClick={() => onRouteSelect(featured)}
            style={{
              borderRadius: 20,
              overflow: 'hidden',
              position: 'relative',
              cursor: 'pointer',
              border: '1px solid rgba(240,124,56,0.3)',
              boxShadow: '0 0 32px rgba(240,124,56,0.2)',
              marginBottom: 20,
            }}
          >
            <div style={{ height: 160, background: featured.gradient, position: 'relative' }}>
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
                    fontSize: 18,
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
                  {featuredCreator.name} · {featured.aircraft} · {featured.duration}
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
          </div>

          <SectionLabel>From your frequency</SectionLabel>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 10,
              marginBottom: 20,
            }}
          >
            {feed.map((route) => {
              const creator = CREATORS.find((c) => c.id === route.creatorId);
              return (
                <RouteCard
                  key={route.id}
                  route={route}
                  creator={creator}
                  onClick={() => onRouteSelect(route)}
                />
              );
            })}
          </div>

          <SectionLabel>Monitor a new frequency</SectionLabel>
          <div style={{ display: 'flex', flexDirection: 'column', marginBottom: 20 }}>
            {CREATORS.filter((c) => !c.following).map((creator) => (
              <CreatorRow
                key={creator.id}
                creator={creator}
                onClick={() => onCreatorSelect(creator)}
                following={false}
              />
            ))}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
