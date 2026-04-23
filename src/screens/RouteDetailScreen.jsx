import { useState } from 'react';
import ScrollArea from '../components/ScrollArea.jsx';
import Badge from '../components/Badge.jsx';
import Avatar from '../components/Avatar.jsx';
import Icon from '../components/Icon.jsx';
import { CREATORS } from '../data/creators.js';
import { FY, FONTS, EASE } from '../theme.js';

const DIFFICULTY_LABEL = {
  smooth: 'Smooth ride',
  turbulence: 'Expect turbulence',
  hard: 'Briefing required',
};

export default function RouteDetailScreen({ route, onBack }) {
  const creator = CREATORS.find((c) => c.id === route.creatorId);
  const [loaded, setLoaded] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Hero */}
      <div
        style={{
          height: 160,
          background: route.gradient,
          position: 'relative',
          flexShrink: 0,
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to bottom, rgba(8,12,20,0.5) 0%, transparent 40%, rgba(8,12,20,0.85) 100%)',
          }}
        />
        <div style={{ position: 'absolute', top: 12, left: 12 }}>
          <button
            onClick={onBack}
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: 'rgba(13,18,32,0.7)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              border: `1px solid ${FY.borderMd}`,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 0,
            }}
          >
            <Icon d="M15 18l-6-6 6-6" size={16} color={FY.fg} />
          </button>
        </div>
        <div style={{ position: 'absolute', bottom: 14, left: 16, right: 16 }}>
          <div
            style={{
              fontFamily: FONTS.mono,
              fontSize: 11,
              color: FY.amber300,
              letterSpacing: '0.05em',
              marginBottom: 3,
            }}
          >
            {route.dep} → {route.arr}
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
            {route.name}
          </div>
        </div>
      </div>

      <ScrollArea>
        <div style={{ padding: '14px 16px' }}>
          {creator && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '10px 14px',
                background: FY.midnight700,
                border: `1px solid ${FY.border}`,
                borderRadius: 12,
                marginBottom: 14,
              }}
            >
              <Avatar gradient={creator.gradient} size={40} initials={creator.name[0]} />
              <div>
                <div
                  style={{
                    fontFamily: FONTS.body,
                    fontSize: 13,
                    fontWeight: 600,
                    color: FY.fg,
                  }}
                >
                  {creator.name}
                </div>
                <div
                  style={{
                    fontFamily: FONTS.body,
                    fontSize: 11,
                    color: FY.fg3,
                  }}
                >
                  {creator.handle} · {creator.routes} routes filed
                </div>
              </div>
              <div style={{ marginLeft: 'auto' }}>
                <Badge variant="amber">Following</Badge>
              </div>
            </div>
          )}

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 8,
              marginBottom: 14,
            }}
          >
            {[
              { label: 'Duration', val: route.duration },
              { label: 'Distance', val: route.distance },
              { label: 'Cruise alt', val: route.altitude },
              { label: 'Aircraft', val: route.aircraft },
            ].map(({ label, val }) => (
              <div
                key={label}
                style={{
                  background: FY.midnight700,
                  border: `1px solid ${FY.border}`,
                  borderRadius: 10,
                  padding: '10px 12px',
                }}
              >
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
                  {label}
                </div>
                <div
                  style={{
                    fontFamily: FONTS.mono,
                    fontSize: 14,
                    color: FY.fg,
                    marginTop: 3,
                  }}
                >
                  {val}
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              display: 'flex',
              gap: 8,
              marginBottom: 14,
              alignItems: 'center',
            }}
          >
            <Badge variant={route.difficulty} dot>
              {DIFFICULTY_LABEL[route.difficulty]}
            </Badge>
            <span
              style={{
                fontFamily: FONTS.body,
                fontSize: 12,
                color: FY.fg3,
              }}
            >
              {route.pilots.toLocaleString()} pilots completed
            </span>
          </div>

          {/* Simulated route map */}
          <div
            style={{
              height: 100,
              background: FY.midnight700,
              border: `1px solid ${FY.border}`,
              borderRadius: 12,
              marginBottom: 14,
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'radial-gradient(ellipse at 30% 50%, rgba(42,168,224,0.08), transparent 60%), radial-gradient(ellipse at 70% 50%, rgba(240,124,56,0.06), transparent 60%)',
              }}
            />
            <svg
              width="90%"
              height="50"
              viewBox="0 0 300 50"
              fill="none"
              style={{ position: 'relative', zIndex: 1 }}
            >
              <line
                x1="20"
                y1="25"
                x2="280"
                y2="25"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="1"
                strokeDasharray="4 4"
              />
              <path
                d="M 20 25 Q 150 5 280 25"
                stroke={FY.amber400}
                strokeWidth="1.5"
                fill="none"
                strokeDasharray="6 3"
              />
              <circle cx="20" cy="25" r="4" fill={FY.horizon400} />
              <circle cx="280" cy="25" r="4" fill={FY.amber400} />
              <text x="10" y="44" fontFamily={FONTS.mono} fontSize="8" fill={FY.fg3}>
                {route.dep}
              </text>
              <text x="268" y="44" fontFamily={FONTS.mono} fontSize="8" fill={FY.fg3}>
                {route.arr}
              </text>
            </svg>
          </div>

          <button
            onClick={() => setLoaded((prev) => !prev)}
            style={{
              width: '100%',
              padding: '14px',
              borderRadius: 12,
              border: 'none',
              cursor: 'pointer',
              fontFamily: FONTS.body,
              fontSize: 15,
              fontWeight: 700,
              transition: `all 200ms ${EASE}`,
              background: loaded ? FY.midnight600 : FY.amber500,
              color: loaded ? FY.fg2 : '#fff',
              boxShadow: loaded ? 'none' : '0 0 32px rgba(240,124,56,0.4)',
            }}
          >
            {loaded
              ? '✓ Route loaded — cleared for departure'
              : 'Load route in MSFS'}
          </button>
        </div>
      </ScrollArea>
    </div>
  );
}
