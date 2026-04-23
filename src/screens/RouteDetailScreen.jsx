import { useParams, useNavigate, Link } from 'react-router-dom';
import Badge from '../components/Badge.jsx';
import Avatar from '../components/Avatar.jsx';
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
  const { followedIds, loadedIds, toggleLoaded, routes, creators } = useApp();

  const route = routes.find((r) => r.id === Number(id));
  if (!route) return <div className="fy-screen" style={{ paddingTop: 48, textAlign: 'center' }}>Route not found.</div>;

  const creator = creators.find((c) => c.id === route.creatorId);
  const isLoaded = loadedIds.has(route.id);

  return (
    <div className="fy-page-enter">
      <div style={{ height: 220, background: route.gradient, position: 'relative' }}>
        <button onClick={() => navigate(-1)} style={{ position: 'absolute', top: 12, left: 12 }}>←</button>
        <div style={{ position: 'absolute', bottom: 16, left: 16, right: 16 }}>
          <div style={{ fontFamily: FONTS.mono, fontSize: 12, color: FY.amber300 }}>{route.dep} → {route.arr}</div>
          <div style={{ fontFamily: FONTS.display, fontSize: 24, fontWeight: 700, color: FY.fg }}>{route.name}</div>
        </div>
      </div>

      <div className="fy-screen">
        {creator && (
          <Link to={`/creator/${creator.id}`} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', background: FY.midnight700, border: `1px solid ${FY.border}`, borderRadius: 12, marginBottom: 14, textDecoration: 'none' }}>
            <Avatar gradient={creator.gradient} size={40} initials={creator.name[0]} />
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: FONTS.body, fontSize: 13, fontWeight: 600, color: FY.fg }}>{creator.name}</div>
              <div style={{ fontFamily: FONTS.body, fontSize: 11, color: FY.fg3 }}>{creator.handle}</div>
            </div>
            <Badge variant={followedIds.has(creator.id) ? 'amber' : 'neutral'}>{followedIds.has(creator.id) ? 'Following' : 'Follow'}</Badge>
          </Link>
        )}

        <div style={{ display: 'flex', gap: 8, marginBottom: 14, alignItems: 'center' }}>
          <Badge variant={route.difficulty} dot>{DIFFICULTY_LABEL[route.difficulty]}</Badge>
          <span style={{ fontFamily: FONTS.body, fontSize: 12, color: FY.fg3 }}>{route.pilots.toLocaleString()} pilots completed</span>
        </div>

        <button onClick={() => toggleLoaded(route.id)} style={{ width: '100%', padding: '15px', borderRadius: 12, border: 'none', fontFamily: FONTS.body, fontSize: 15, fontWeight: 700, transition: `all 200ms ${EASE}`, background: isLoaded ? FY.midnight600 : FY.amber500, color: isLoaded ? FY.fg2 : '#fff' }}>
          {isLoaded ? '✓ Route loaded — cleared for departure' : 'Load route in MSFS'}
        </button>
      </div>
    </div>
  );
}
