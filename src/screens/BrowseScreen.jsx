import { useState } from 'react';
import TopBar from '../components/TopBar.jsx';
import ScrollArea from '../components/ScrollArea.jsx';
import RouteCard from '../components/RouteCard.jsx';
import CreatorRow from '../components/CreatorRow.jsx';
import Icon from '../components/Icon.jsx';
import { ROUTES } from '../data/routes.js';
import { CREATORS } from '../data/creators.js';
import { FY, FONTS } from '../theme.js';

export default function BrowseScreen({ onRouteSelect, onCreatorSelect }) {
  const [query, setQuery] = useState('');
  const [tab, setTab] = useState('routes');

  const filtered = query
    ? ROUTES.filter((r) =>
        `${r.dep}${r.arr}${r.name}`.toLowerCase().includes(query.toLowerCase())
      )
    : ROUTES;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <TopBar title="Browse" subtitle="Find routes & creators" />
      <div style={{ padding: '10px 16px', flexShrink: 0 }}>
        <div style={{ position: 'relative' }}>
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
            style={{
              width: '100%',
              padding: '9px 12px 9px 36px',
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
      </div>

      <div
        style={{
          display: 'flex',
          padding: '0 16px 10px',
          gap: 6,
          flexShrink: 0,
        }}
      >
        {['routes', 'creators'].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              padding: '6px 16px',
              borderRadius: 9999,
              border: 'none',
              cursor: 'pointer',
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

      <ScrollArea>
        <div
          style={{
            padding: '0 16px',
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
            paddingBottom: 20,
          }}
        >
          {tab === 'routes'
            ? filtered.map((route) => {
                const creator = CREATORS.find((c) => c.id === route.creatorId);
                return (
                  <RouteCard
                    key={route.id}
                    route={route}
                    creator={creator}
                    onClick={() => onRouteSelect(route)}
                  />
                );
              })
            : CREATORS.map((creator) => (
                <CreatorRow
                  key={creator.id}
                  creator={creator}
                  following={creator.following}
                  onClick={() => onCreatorSelect(creator)}
                />
              ))}
        </div>
      </ScrollArea>
    </div>
  );
}
