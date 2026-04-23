const TAB_ICONS = {
  dispatch: {
    d: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z',
    d2: 'M9 22V12h6v10',
  },
  browse: {
    d: 'M21 21l-4.35-4.35',
    d2: 'M11 3a8 8 0 1 0 0 16A8 8 0 0 0 11 3z',
  },
  logbook: {
    d: 'M4 19.5A2.5 2.5 0 0 1 6.5 17H20',
    d2: 'M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z',
  },
  profile: {
    d: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2',
    d2: 'M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z',
  },
};

export const TABS = [
  { id: 'dispatch', label: 'Dispatch' },
  { id: 'browse', label: 'Browse' },
  { id: 'logbook', label: 'Logbook' },
  { id: 'profile', label: 'Profile' },
];

export default function TabBar({ active, onSelect }) {
  return (
    <div className="fy-tab-bar">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          className={`fy-tab-item${active === tab.id ? ' is-active' : ''}`}
          onClick={() => onSelect(tab.id)}
        >
          <span className="fy-tab-icon">
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
              <path d={TAB_ICONS[tab.id].d} />
              {TAB_ICONS[tab.id].d2 && <path d={TAB_ICONS[tab.id].d2} />}
            </svg>
          </span>
          <span className="fy-tab-label">{tab.label}</span>
        </button>
      ))}
    </div>
  );
}
