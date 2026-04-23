import { useNavigate } from 'react-router-dom';
import TopBar from '../components/TopBar.jsx';
import SectionLabel from '../components/SectionLabel.jsx';
import StatTile from '../components/StatTile.jsx';
import Badge from '../components/Badge.jsx';
import { useApp } from '../context/AppContext.jsx';
import { FY, FONTS } from '../theme.js';

export default function LogbookScreen() {
  const navigate = useNavigate();
  const { flights, routes, creators } = useApp();
  const totalNm = flights.reduce((s, f) => s + parseInt(String(f.distance).replace(/,/g, ''), 10), 0);

  return (
    <div className="fy-page-enter">
      <TopBar title="Logbook" subtitle="Your flight history" />
      <div className="fy-screen">
        <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
          <StatTile value={flights.length} label="Flights logged" />
          <StatTile value={32} label="Hours flown" unit="h" accent={FY.horizon400} />
          <StatTile value={`${(totalNm / 1000).toFixed(1)}k`} label="Nm total" accent={FY.gold300} />
        </div>

        <SectionLabel>Recent flights</SectionLabel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {flights.map((flight) => {
            const route = routes.find((r) => r.id === flight.routeId);
            const creator = route ? creators.find((c) => c.id === route.creatorId) : null;
            return (
              <div key={flight.id} onClick={() => route && navigate(`/route/${route.id}`)} style={{ background: FY.midnight700, border: `1px solid ${FY.border}`, borderRadius: 12, padding: '10px 14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, background: route?.gradient || FY.midnight600, flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: FONTS.mono, fontSize: 10, color: FY.amber300, letterSpacing: '0.04em' }}>{route?.dep} → {route?.arr}</div>
                  <div style={{ fontFamily: FONTS.body, fontSize: 12, fontWeight: 600, color: FY.fg }}>{route?.name}</div>
                  <div style={{ fontFamily: FONTS.body, fontSize: 10, color: FY.fg3 }}>{creator?.name} · {flight.duration}</div>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <div style={{ fontFamily: FONTS.body, fontSize: 10, color: FY.fg3, marginBottom: 4 }}>{flight.date}</div>
                  <Badge variant="smooth">✓ Complete</Badge>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
