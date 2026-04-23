import { useState } from 'react';
import ScrollArea from '../components/ScrollArea.jsx';
import SectionLabel from '../components/SectionLabel.jsx';
import RouteCard from '../components/RouteCard.jsx';
import Avatar from '../components/Avatar.jsx';
import Icon from '../components/Icon.jsx';
import { ROUTES } from '../data/routes.js';
import { FY, FONTS } from '../theme.js';

export default function CreatorProfileScreen({ creator, onBack, onRouteSelect }) {
  const routes = ROUTES.filter((r) => r.creatorId === creator.id);
  const [following, setFollowing] = useState(creator.following);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div
        style={{
          padding: '12px 16px',
          background: FY.midnight800,
          borderBottom: `1px solid ${FY.border}`,
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          gap: 10,
        }}
      >
        <button
          onClick={onBack}
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
          <Icon d="M15 18l-6-6 6-6" size={16} color={FY.fg2} />
        </button>
        <div
          style={{
            fontFamily: FONTS.display,
            fontSize: 16,
            fontWeight: 700,
            color: FY.fg,
          }}
        >
          {creator.name}
        </div>
      </div>

      <ScrollArea>
        <div style={{ padding: '20px 16px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 14,
              marginBottom: 20,
            }}
          >
            <Avatar gradient={creator.gradient} size={64} initials={creator.name[0]} />
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontFamily: FONTS.display,
                  fontSize: 17,
                  fontWeight: 700,
                  color: FY.fg,
                }}
              >
                {creator.name}
              </div>
              <div
                style={{
                  fontFamily: FONTS.mono,
                  fontSize: 11,
                  color: FY.fg3,
                  margin: '3px 0 10px',
                }}
              >
                {creator.handle}
              </div>
              <div style={{ display: 'flex', gap: 14 }}>
                <div>
                  <div
                    style={{
                      fontFamily: FONTS.mono,
                      fontSize: 14,
                      fontWeight: 600,
                      color: FY.fg,
                    }}
                  >
                    {creator.followers}
                  </div>
                  <div
                    style={{
                      fontFamily: FONTS.body,
                      fontSize: 10,
                      color: FY.fg3,
                    }}
                  >
                    Followers
                  </div>
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: FONTS.mono,
                      fontSize: 14,
                      fontWeight: 600,
                      color: FY.fg,
                    }}
                  >
                    {creator.routes}
                  </div>
                  <div
                    style={{
                      fontFamily: FONTS.body,
                      fontSize: 10,
                      color: FY.fg3,
                    }}
                  >
                    Routes filed
                  </div>
                </div>
              </div>
            </div>
            <button
              onClick={() => setFollowing((prev) => !prev)}
              style={{
                padding: '7px 16px',
                borderRadius: 9999,
                border: `1px solid ${following ? FY.border : 'transparent'}`,
                cursor: 'pointer',
                fontFamily: FONTS.body,
                fontSize: 13,
                fontWeight: 600,
                background: following ? 'transparent' : FY.amber500,
                color: following ? FY.fg3 : '#fff',
              }}
            >
              {following ? 'Following' : 'Follow'}
            </button>
          </div>

          <SectionLabel>Filed routes</SectionLabel>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {routes.map((route) => (
              <RouteCard
                key={route.id}
                route={route}
                onClick={() => onRouteSelect(route)}
              />
            ))}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
