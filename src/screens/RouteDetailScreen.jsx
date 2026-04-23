import { useParams, useNavigate, Link } from 'react-router-dom';
import Badge from '../components/Badge.jsx';
import Avatar from '../components/Avatar.jsx';
import TopBar from '../components/TopBar.jsx';
import { ROUTES } from '../data/routes.js';
import { CREATORS } from '../data/creators.js';
import { useApp } from '../context/AppContext.jsx';
import { FY, FONTS, EASE } from '../theme.js';

const DIFFICULTY_LABEL = {
  smooth: 'Smooth ride',
  turbulence: 'Expect turbulence',
  hard: 'Briefing required',
};

export default function RouteDetailScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { followedIds, loadedIds, toggleLoaded } = useApp();

  const route = ROUTES.find((r) => r.id === Number(id));
  if (!route) {
    return (
      <div className="fy-screen" style={{ paddingTop: 48, textAlign: 'center' }}>
        <p style={{ fontFamily: FONTS.body, color: FY.fg3 }}>Route not found.</p>
      </div>
    );
  }

  const creator = CREATORS.find((c) => c.id === route.creatorId);
  const isLoaded = loadedIds.has(route.id);

  return (
    <div className="fy-page-enter">
      {/* Hero banner */}
      <div
        style={{
          height: 220,
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
              'linear-gradient(to bottom, rgba(8,12,20,0.45) 0%, transparent 45%, rgba(8,12,20,0.9) 100%)',
          }}
        />
        <div style={{ position: 'absolute', top: 12, left: 12 }}>
          <button
            onClick={() => navigate(-1)}
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
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
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke={FY.fg}
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
        </div>
        <div style={{ position: 'absolute', bottom: 16, left: 16, right: 16 }}>
          <div
            style={{
              fontFamily: FONTS.mono,
              fontSize: 12,
              color: FY.amber300,
              letterSpacing: '0.05em',
              marginBottom: 4,
            }}
          >
            {route.dep} → {route.arr}
          </div>
          <div
            style={{
              fontFamily: FONTS.display,
              fontSize: 24,
              fontWeight: 700,
              color: FY.fg,
              lineHeight: 1.15,
            }}
          >
            {route.name}
          </div>
        </div>
      </div>

      <div className="fy-screen">
        {/* Creator card */}
        {creator && (
          <Link
            to={`/creator/${creator.id}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '10px 14px',
              background: FY.midnight700,
              border: `1px solid ${FY.border}`,
              borderRadius: 12,
              marginBottom: 14,
              textDecoration: 'none',
            }}
          >
            <Avatar gradient={creator.gradient} size={40} initials={creator.name[0]} />
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: FONTS.body, fontSize: 13, fontWeight: 600, color: FY.fg }}>
                {creator.name}
              </div>
              <div style={{ fontFamily: FONTS.body, fontSize: 11, color: FY.fg3 }}>
                {creator.handle} · {creator.routes} routes filed
              </div>
            </div>
            <Badge variant={followedIds.has(creator.id) ? 'amber' : 'neutral'}>
              {followedIds.has(creator.id) ? 'Following' : 'Follow'}
            </Badge>
          </Link>
        )}

        {/* Stats grid */}
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
              <div style={{ fontFamily: FONTS.mono, fontSize: 15, color: FY.fg, marginTop: 3 }}>
                {val}
              </div>
            </div>
          ))}
        </div>

        {/* Difficulty + pilots */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 14, alignItems: 'center' }}>
          <Badge variant={route.difficulty} dot>
            {DIFFICULTY_LABEL[route.difficulty]}
          </Badge>
          <span style={{ fontFamily: FONTS.body, fontSize: 12, color: FY.fg3 }}>
            {route.pilots.toLocaleString()} pilots completed
          </span>
        </div>

        {/* Route map */}
        <div
          style={{
            height: 110,
            background: FY.midnight700,
            border: `1px solid ${FY.border}`,
            borderRadius: 12,
            marginBottom: 16,
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
            height="60"
            viewBox="0 0 300 60"
            fill="none"
            style={{ position: 'relative', zIndex: 1 }}
          >
            <line
              x1="20"
              y1="30"
              x2="280"
              y2="30"
              stroke="rgba(255,255,255,0.07)"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
            <path
              d="M 20 30 Q 150 8 280 30"
              stroke={FY.amber400}
              strokeWidth="1.5"
              fill="none"
              strokeDasharray="6 3"
            />
            <circle cx="20" cy="30" r="4" fill={FY.horizon400} />
            <circle cx="280" cy="30" r="4" fill={FY.amber400} />
            <text x="8" y="50" fontFamily={FONTS.mono} fontSize="8" fill={FY.fg3}>
              {route.dep}
            </text>
            <text x="268" y="50" fontFamily={FONTS.mono} fontSize="8" fill={FY.fg3}>
              {route.arr}
            </text>
          </svg>
        </div>

        {/* CTA */}
        <button
          onClick={() => toggleLoaded(route.id)}
          style={{
            width: '100%',
            padding: '15px',
            borderRadius: 12,
            border: 'none',
            fontFamily: FONTS.body,
            fontSize: 15,
            fontWeight: 700,
            transition: `all 200ms ${EASE}`,
            background: isLoaded ? FY.midnight600 : FY.amber500,
            color: isLoaded ? FY.fg2 : '#fff',
            boxShadow: isLoaded ? 'none' : '0 0 32px rgba(240,124,56,0.35)',
          }}
        >
          {isLoaded ? '✓ Route loaded — cleared for departure' : 'Load route in MSFS'}
        </button>
      </div>
    </div>
  );
}
