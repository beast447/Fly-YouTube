import { useNavigate } from 'react-router-dom';
import TopBar from '../components/TopBar.jsx';
import SectionLabel from '../components/SectionLabel.jsx';
import Badge from '../components/Badge.jsx';
import RouteCard from '../components/RouteCard.jsx';
import CreatorRow from '../components/CreatorRow.jsx';
import Icon from '../components/Icon.jsx';
import { useApp } from '../context/AppContext.jsx';
import { FY, FONTS } from '../theme.js';

export default function DispatchScreen() {
  const navigate = useNavigate();
  const { followedIds, routes, creators } = useApp();

  const featured = routes[2] ?? routes[0];
  const featuredCreator = featured ? creators.find((c) => c.id === featured.creatorId) : null;
  const feed = routes.filter((r) => followedIds.has(r.creatorId));

  return (
    <div className="fy-page-enter">
      <TopBar
        title="Dispatch"
        rightSlot={<button onClick={() => navigate('/browse')} style={{ width: 32, height: 32, borderRadius: 8, background: FY.midnight600, border: `1px solid ${FY.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0 }}><Icon d="M21 21l-4.35-4.35" d2="M11 3a8 8 0 1 0 0 16A8 8 0 0 0 11 3z" size={16} color={FY.fg2} /></button>}
      />

      <div className="fy-screen">
        {featured && (
          <div style={{ marginBottom: 24 }}>
            <SectionLabel>Route of the week</SectionLabel>
            <div onClick={() => navigate(`/route/${featured.id}`)} style={{ borderRadius: 20, overflow: 'hidden', cursor: 'pointer', border: '1px solid rgba(240,124,56,0.3)', boxShadow: '0 0 32px rgba(240,124,56,0.18)' }}>
              <div style={{ height: 180, background: featured.gradient, position: 'relative' }}>
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 20%, rgba(8,12,20,0.95))' }} />
                <div style={{ position: 'absolute', top: 12, left: 14 }}><Badge variant="amber">✦ Featured</Badge></div>
                <div style={{ position: 'absolute', bottom: 14, left: 14, right: 14 }}>
                  <div style={{ fontFamily: FONTS.mono, fontSize: 11, color: FY.amber300, letterSpacing: '0.05em', marginBottom: 3 }}>{featured.dep} → {featured.arr}</div>
                  <div style={{ fontFamily: FONTS.display, fontSize: 20, fontWeight: 700, color: FY.fg, lineHeight: 1.15 }}>{featured.name}</div>
                  <div style={{ fontFamily: FONTS.body, fontSize: 12, color: FY.fg2, marginTop: 4 }}>{featuredCreator?.name} · {featured.aircraft} · {featured.duration}</div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div style={{ marginBottom: 24 }}>
          <SectionLabel>From your frequency</SectionLabel>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {feed.map((route) => {
              const creator = creators.find((c) => c.id === route.creatorId);
              return <RouteCard key={route.id} route={route} creator={creator} onClick={() => navigate(`/route/${route.id}`)} />;
            })}
          </div>
        </div>

        <div style={{ marginBottom: 24 }}>
          <SectionLabel>Monitor a new frequency</SectionLabel>
          <div style={{ background: FY.midnight700, border: `1px solid ${FY.border}`, borderRadius: 14, overflow: 'hidden' }}>
            {creators.filter((c) => !followedIds.has(c.id)).map((creator) => (
              <CreatorRow key={creator.id} creator={creator} following={false} onClick={() => navigate(`/creator/${creator.id}`)} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
