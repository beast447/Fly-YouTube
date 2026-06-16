import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SectionLabel from '../components/SectionLabel.tsx';
import RouteCard from '../components/RouteCard.tsx';
import RouteCardSkeleton from '../components/RouteCardSkeleton.tsx';
import Avatar from '../components/Avatar.tsx';
import { getCreatorById, getRoutesByCreatorId } from '../services/index.ts';
import { useApp } from '../context/useApp.ts';
import { usePageTitle } from '../hooks/usePageTitle.ts';
import { FY, FONTS, EASE } from '../theme.ts';
import type { Creator, Route } from '../types/index.ts';

export default function CreatorProfileScreen() {
  const { id } = useParams();
  return <CreatorProfile key={id} id={id} />;
}

function CreatorProfile({ id }: { id: string | undefined }) {
  const navigate = useNavigate();
  const { followedIds, toggleFollow } = useApp();

  const [creator, setCreator] = useState<Creator | undefined>(undefined);
  const [routes, setRoutes] = useState<Route[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  usePageTitle(
    creator?.name,
    creator ? `${creator.routes} routes filed by ${creator.name} (${creator.handle}).` : undefined
  );

  useEffect(() => {
    let cancelled = false;
    const creatorId = Number(id);
    getCreatorById(creatorId)
      .then((loadedCreator) => {
        if (cancelled) return;
        setCreator(loadedCreator);
        if (!loadedCreator) return undefined;
        return getRoutesByCreatorId(loadedCreator.id).then((loadedRoutes) => {
          if (!cancelled) setRoutes(loadedRoutes);
        });
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
  }, [id]);

  if (loading) {
    return (
      <div className="fy-page-enter fy-screen">
        <div
          aria-busy="true"
          style={{ height: 72, background: FY.midnight700, borderRadius: 16, marginBottom: 20 }}
        />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <RouteCardSkeleton />
          <RouteCardSkeleton />
        </div>
      </div>
    );
  }

  if (error || !creator) {
    return (
      <div className="fy-screen" style={{ paddingTop: 48, textAlign: 'center' }}>
        <p style={{ fontFamily: FONTS.body, color: FY.fg3 }}>Creator not found.</p>
      </div>
    );
  }

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
          aria-label="Go back"
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
            aria-hidden="true"
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
                <div style={{ fontFamily: FONTS.body, fontSize: 11, color: FY.fg3 }}>Followers</div>
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
            aria-pressed={following}
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
