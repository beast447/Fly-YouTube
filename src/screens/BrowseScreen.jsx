import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TopBar from '../components/TopBar.jsx';
import RouteCard from '../components/RouteCard.jsx';
import CreatorRow from '../components/CreatorRow.jsx';
import Icon from '../components/Icon.jsx';
import { useApp } from '../context/AppContext.jsx';
import { FY, FONTS } from '../theme.js';

export default function BrowseScreen() {
  const navigate = useNavigate();
  const { followedIds, routes, creators } = useApp();
  const [query, setQuery] = useState('');
  const [tab, setTab] = useState('routes');

  const filteredRoutes = query
    ? routes.filter((r) =>
        `${r.dep} ${r.arr} ${r.name} ${r.aircraft}`.toLowerCase().includes(query.toLowerCase())
      )
    : routes;

  const filteredCreators = query
    ? creators.filter((c) => `${c.name} ${c.handle}`.toLowerCase().includes(query.toLowerCase()))
    : creators;

  return (
    <div className="fy-page-enter">
      <TopBar title="Browse" subtitle="Find routes & creators" />

      <div className="fy-screen">
        <div style={{ position: 'relative', marginBottom: 12 }}>
          <div style={{ position: 'absolute', left: 11, top: '50%', transform: 'translateY(-50%)' }}>
            <Icon d="M21 21l-4.35-4.35" d2="M11 3a8 8 0 1 0 0 16A8 8 0 0 0 11 3z" size={16} color={FY.fg3} />
          </div>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search routes, creators, ICAO…"
            style={{ width: '100%', padding: '10px 12px 10px 36px', background: FY.midnight700, border: `1px solid ${FY.border}`, borderRadius: 10, color: FY.fg, fontFamily: FONTS.body, fontSize: 14, outline: 'none' }}
          />
        </div>

        <div style={{ display: 'flex', gap: 6, marginBottom: 16 }}>
          {['routes', 'creators'].map((t) => (
            <button key={t} onClick={() => setTab(t)} style={{ padding: '6px 16px', borderRadius: 9999, border: 'none', fontFamily: FONTS.body, fontSize: 13, fontWeight: 600, transition: 'all 150ms', background: tab === t ? FY.amber500 : FY.midnight600, color: tab === t ? '#fff' : FY.fg3 }}>
              {t === 'routes' ? 'Routes' : 'Creators'}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {tab === 'routes'
            ? filteredRoutes.map((route) => {
                const creator = creators.find((c) => c.id === route.creatorId);
                return (
                  <RouteCard key={route.id} route={route} creator={creator} onClick={() => navigate(`/route/${route.id}`)} />
                );
              })
            : filteredCreators.map((creator) => (
                <CreatorRow key={creator.id} creator={creator} following={followedIds.has(creator.id)} onClick={() => navigate(`/creator/${creator.id}`)} />
              ))}
        </div>
      </div>
    </div>
  );
}
