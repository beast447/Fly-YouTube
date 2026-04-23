import { useNavigate } from 'react-router-dom';
import TopBar from '../components/TopBar.jsx';
import SectionLabel from '../components/SectionLabel.jsx';
import StatTile from '../components/StatTile.jsx';
import Badge from '../components/Badge.jsx';
import CreatorRow from '../components/CreatorRow.jsx';
import Divider from '../components/Divider.jsx';
import Icon from '../components/Icon.jsx';
import { CREATORS } from '../data/creators.js';
import { MY_FLIGHTS } from '../data/routes.js';
import { useApp } from '../context/AppContext.jsx';
import { FY, FONTS } from '../theme.js';

const SETTINGS = [
  'MSFS Connection',
  'ATIS updates',
  'Units & Format',
  'About Fly YouTube',
];

export default function ProfileScreen() {
  const navigate = useNavigate();
  const { followedIds } = useApp();

  const followedCreators = CREATORS.filter((c) => followedIds.has(c.id));

  return (
    <div className="fy-page-enter">
      <TopBar
        title="Profile"
        rightSlot={
          <button
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
            <Icon
              d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"
              size={16}
              color={FY.fg2}
            />
          </button>
        }
      />

      <div className="fy-screen">
        {/* User hero */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom: 24,
            padding: '8px 0',
          }}
        >
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: '50%',
              background: 'linear-gradient(135deg,#1a2440,#344266)',
              border: `2px solid ${FY.amber400}`,
              marginBottom: 10,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: FONTS.display,
              fontSize: 28,
              fontWeight: 700,
              color: FY.fg,
            }}
          >
            P
          </div>
          <div style={{ fontFamily: FONTS.display, fontSize: 20, fontWeight: 700, color: FY.fg }}>
            PilotUser
          </div>
          <div style={{ fontFamily: FONTS.mono, fontSize: 11, color: FY.fg3, marginTop: 2 }}>
            Member since Jan 2024 · First Officer
          </div>
          <div style={{ marginTop: 8 }}>
            <Badge variant="amber">✦ Early access</Badge>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
          <StatTile value={MY_FLIGHTS.length} label="Flights" />
          <StatTile value={32} label="Hours" unit="h" accent={FY.horizon400} />
          <StatTile value={followedCreators.length} label="Following" accent={FY.gold300} />
        </div>

        {/* Followed creators */}
        <div style={{ marginBottom: 24 }}>
          <SectionLabel>Monitoring these frequencies</SectionLabel>
          {followedCreators.length === 0 ? (
            <p style={{ fontFamily: FONTS.body, fontSize: 14, color: FY.fg3, padding: '8px 0' }}>
              You're not monitoring any frequencies yet.
            </p>
          ) : (
            <div
              style={{
                background: FY.midnight700,
                border: `1px solid ${FY.border}`,
                borderRadius: 14,
                overflow: 'hidden',
              }}
            >
              {followedCreators.map((creator, i, arr) => (
                <div key={creator.id}>
                  <CreatorRow
                    creator={creator}
                    following
                    onClick={() => navigate(`/creator/${creator.id}`)}
                  />
                  {i < arr.length - 1 && <Divider />}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Settings */}
        <div style={{ marginBottom: 24 }}>
          <SectionLabel>Settings</SectionLabel>
          <div
            style={{
              background: FY.midnight700,
              border: `1px solid ${FY.border}`,
              borderRadius: 14,
              overflow: 'hidden',
            }}
          >
            {SETTINGS.map((item, i, arr) => (
              <div key={item}>
                <div
                  style={{
                    padding: '13px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                  }}
                >
                  <span style={{ fontFamily: FONTS.body, fontSize: 14, color: FY.fg2 }}>
                    {item}
                  </span>
                  <Icon d="M9 18l6-6-6-6" size={16} color={FY.fg4} />
                </div>
                {i < arr.length - 1 && <Divider />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
