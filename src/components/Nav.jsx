import { NavLink } from 'react-router-dom';
import Icon from './Icon.jsx';

const TABS = [
  {
    path: '/',
    label: 'Dispatch',
    d: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z',
    d2: 'M9 22V12h6v10',
    end: true,
  },
  {
    path: '/browse',
    label: 'Browse',
    d: 'M21 21l-4.35-4.35',
    d2: 'M11 3a8 8 0 1 0 0 16A8 8 0 0 0 11 3z',
  },
  {
    path: '/logbook',
    label: 'Logbook',
    d: 'M4 19.5A2.5 2.5 0 0 1 6.5 17H20',
    d2: 'M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z',
  },
  {
    path: '/profile',
    label: 'Profile',
    d: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2',
    d2: 'M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z',
  },
];

/* ── Bottom nav (mobile) ───────────────────────────────── */
function BottomNav() {
  return (
    <nav className="fy-bottom-nav">
      {TABS.map((tab) => (
        <NavLink
          key={tab.path}
          to={tab.path}
          end={tab.end}
          className={({ isActive }) => `fy-tab-item${isActive ? ' is-active' : ''}`}
          style={{ textDecoration: 'none' }}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d={tab.d} />
            {tab.d2 && <path d={tab.d2} />}
          </svg>
          <span className="fy-tab-label">{tab.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}

/* ── Sidebar (desktop) ─────────────────────────────────── */
function Sidebar() {
  return (
    <aside className="fy-sidebar">
      <NavLink to="/" className="fy-sidebar-logo" end>
        <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
          <rect width="32" height="32" rx="8" fill="#e06820" />
          <path
            d="M6 22l5-10 5 6 4-8 6 12"
            stroke="#fff"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
        <span className="fy-sidebar-logo-text">
          Fly<span>YouTube</span>
        </span>
      </NavLink>

      {TABS.map((tab) => (
        <NavLink
          key={tab.path}
          to={tab.path}
          end={tab.end}
          className={({ isActive }) =>
            `fy-sidebar-item${isActive ? ' is-active' : ''}`
          }
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d={tab.d} />
            {tab.d2 && <path d={tab.d2} />}
          </svg>
          {tab.label}
        </NavLink>
      ))}
    </aside>
  );
}

export default function Nav() {
  return (
    <>
      <Sidebar />
      <BottomNav />
    </>
  );
}
