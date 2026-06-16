import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TopBar from '../components/TopBar.tsx';
import SectionLabel from '../components/SectionLabel.tsx';
import StatTile from '../components/StatTile.tsx';
import StatTileSkeleton from '../components/StatTileSkeleton.tsx';
import Badge from '../components/Badge.tsx';
import CreatorRow from '../components/CreatorRow.tsx';
import CreatorRowSkeleton from '../components/CreatorRowSkeleton.tsx';
import Divider from '../components/Divider.tsx';
import Icon from '../components/Icon.tsx';
import { getCreators, getMyFlights } from '../services/index.ts';
import { useApp } from '../context/useApp.ts';
import { usePageTitle } from '../hooks/usePageTitle.ts';
import { FY, FONTS } from '../theme.ts';
import type { Creator, Flight } from '../types/index.ts';

interface SettingItem {
  id: string;
  label: string;
  detail: string;
}

const SETTINGS: SettingItem[] = [
  {
    id: 'msfs',
    label: 'MSFS Connection',
    detail: 'Not connected — link your simulator to load routes automatically.',
  },
  {
    id: 'atis',
    label: 'ATIS updates',
    detail: 'You will be notified when followed creators publish new routes.',
  },
  { id: 'units', label: 'Units & Format', detail: 'Nautical miles, knots, and 24-hour time.' },
  {
    id: 'about',
    label: 'About Fly YouTube',
    detail: 'Fly YouTube v0.1.0 — routes flown by your favorite creators.',
  },
];

export default function ProfileScreen() {
  const navigate = useNavigate();
  const { followedIds } = useApp();
  usePageTitle('Profile', 'Your Fly YouTube pilot profile and settings.');

  const [creators, setCreators] = useState<Creator[]>([]);
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [openSettingId, setOpenSettingId] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    Promise.all([getCreators(), getMyFlights()])
      .then(([loadedCreators, loadedFlights]) => {
        if (cancelled) return;
        setCreators(loadedCreators);
        setFlights(loadedFlights);
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
  }, []);

  const followedCreators = creators.filter((c) => followedIds.has(c.id));

  return (
    <div className="fy-page-enter">
      <TopBar
        title="Profile"
        rightSlot={
          <button
            aria-label="Edit profile"
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
            aria-hidden="true"
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
          {loading || error ? (
            <>
              <StatTileSkeleton />
              <StatTileSkeleton />
              <StatTileSkeleton />
            </>
          ) : (
            <>
              <StatTile value={flights.length} label="Flights" />
              <StatTile value={32} label="Hours" unit="h" accent={FY.horizon400} />
              <StatTile value={followedCreators.length} label="Following" accent={FY.gold300} />
            </>
          )}
        </div>

        {/* Followed creators */}
        <div style={{ marginBottom: 24 }}>
          <SectionLabel>Monitoring these frequencies</SectionLabel>
          {loading ? (
            <div
              style={{
                background: FY.midnight700,
                border: `1px solid ${FY.border}`,
                borderRadius: 14,
                overflow: 'hidden',
              }}
            >
              <CreatorRowSkeleton />
              <CreatorRowSkeleton />
            </div>
          ) : error ? (
            <p style={{ fontFamily: FONTS.body, fontSize: 14, color: FY.fg3, padding: '8px 0' }}>
              Couldn&apos;t load your creators.
            </p>
          ) : followedCreators.length === 0 ? (
            <p style={{ fontFamily: FONTS.body, fontSize: 14, color: FY.fg3, padding: '8px 0' }}>
              You&apos;re not monitoring any frequencies yet.
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
            {SETTINGS.map((item, i, arr) => {
              const open = openSettingId === item.id;
              return (
                <div key={item.id}>
                  <button
                    type="button"
                    onClick={() => setOpenSettingId(open ? null : item.id)}
                    aria-expanded={open}
                    style={{
                      width: '100%',
                      padding: '13px 16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      border: 'none',
                      background: 'transparent',
                      textAlign: 'left',
                    }}
                  >
                    <span style={{ fontFamily: FONTS.body, fontSize: 14, color: FY.fg2 }}>
                      {item.label}
                    </span>
                    <Icon d={open ? 'M6 9l6 6 6-6' : 'M9 18l6-6-6-6'} size={16} color={FY.fg4} />
                  </button>
                  {open && (
                    <p
                      style={{
                        fontFamily: FONTS.body,
                        fontSize: 12,
                        color: FY.fg3,
                        padding: '0 16px 13px',
                      }}
                    >
                      {item.detail}
                    </p>
                  )}
                  {i < arr.length - 1 && <Divider />}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
