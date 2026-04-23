import { useParams, useNavigate } from 'react-router-dom';
import SectionLabel from '../components/SectionLabel.jsx';
import RouteCard from '../components/RouteCard.jsx';
import Avatar from '../components/Avatar.jsx';
import { ROUTES } from '../data/routes.js';
import { CREATORS } from '../data/creators.js';
import { useApp } from '../context/AppContext.jsx';
import { FY, FONTS, EASE } from '../theme.js';

export default function CreatorProfileScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { followedIds, toggleFollow } = useApp();

  const creator = CREATORS.find((c) => c.id === Number(id));
  if (!creator) {
    return (
      <div className="fy-screen" style={{ paddingTop: 48, textAlign: 'center' }}>
        <p style={{ fontFamily: FONTS.body, color: FY.fg3 }}>Creator not found.</p>
      </div>
    );
  }

  const routes = ROUTES.filter((r) => r.creatorId === creator.id);
  const following = followedIds.has(creator.id);

  return (
    <div className="fy-page-enter">
      {/* Header bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          padding: '12px 16px',
          position: 'sticky',
          top: 0,
          zIndex: 10,
          background: 'rgba(8,12,20,0.9)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: `1px solid ${FY.border}`,
        }}
      >
        <button
          onClick={() => navigate(-1)}
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
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke={FY.fg2}
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <div style={{ fontFamily: FONTS.display, fontSize: 16, fontWeight: 700, color: FY.fg }}>
          {creator.name}
        </div>
      </div>

      <div className="fy-screen">
        {/* Creator bio */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: 16,
            marginBottom: 24,
          }}
        >
          <Avatar gradient={creator.gradient} size={72} initials={creator.name[0]} />
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontFamily: FONTS.display,
                fontSize: 18,
                fontWeight: 700,
                color: FY.fg,
              }}
            >
              {creator.name}
            </div>
            <div
              style={{
                fontFamily: FONTS.mono,
                fontSize: 12,
                color: FY.fg3,
                margin: '4px 0 12px',
              }}
            >
              {creator.handle}
            </div>
            <div style={{ display: 'flex', gap: 20 }}>
              <div>
                <div
                  style={{ fontFamily: FONTS.mono, fontSize: 16, fontWeight: 600, color: FY.fg }}
                >
                  {creator.followers}
                </div>
                <div style={{ fontFamily: FONTS.body, fontSize: 11, color: FY.fg3 }}>
                  Followers
                </div>
              </div>
              <div>
                <div
                  style={{ fontFamily: FONTS.mono, fontSize: 16, fontWeight: 600, color: FY.fg }}
                >
                  {creator.routes}
                </div>
                <div style={{ fontFamily: FONTS.body, fontSize: 11, color: FY.fg3 }}>
                  Routes filed
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => toggleFollow(creator.id)}
            style={{
              padding: '8px 18px',
              borderRadius: 9999,
              border: `1px solid ${following ? FY.border : 'transparent'}`,
              fontFamily: FONTS.body,
              fontSize: 13,
              fontWeight: 600,
              transition: `all 200ms ${EASE}`,
              background: following ? 'transparent' : FY.amber500,
              color: following ? FY.fg3 : '#fff',
              flexShrink: 0,
            }}
          >
            {following ? 'Following' : 'Follow'}
          </button>
        </div>

        <SectionLabel>Filed routes</SectionLabel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {routes.length === 0 ? (
            <p style={{ fontFamily: FONTS.body, fontSize: 14, color: FY.fg3 }}>
              No routes filed yet.
            </p>
          ) : (
            routes.map((route) => (
              <RouteCard
                key={route.id}
                route={route}
                onClick={() => navigate(`/route/${route.id}`)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
