import { useEffect, useState } from 'react';

function formatTime(date) {
  return `${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`;
}

export default function StatusBar() {
  const [time, setTime] = useState(() => formatTime(new Date()));

  useEffect(() => {
    const id = setInterval(() => setTime(formatTime(new Date())), 10000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="fy-status-bar">
      <span className="fy-status-time">{time}</span>
      <div className="fy-status-icons">
        <svg width="16" height="11" viewBox="0 0 16 11" fill="rgba(240,238,234,0.85)">
          <rect x="0" y="4" width="3" height="7" rx="1" />
          <rect x="4" y="2" width="3" height="9" rx="1" />
          <rect x="8" y="0" width="3" height="11" rx="1" />
          <rect x="12" y="0" width="3" height="11" rx="1" opacity="0.3" />
        </svg>
        <svg width="15" height="11" viewBox="0 0 15 11" fill="rgba(240,238,234,0.85)">
          <path d="M7.5 2.2C9.8 2.2 11.9 3.1 13.4 4.6L14.8 3.2C12.9 1.2 10.3 0 7.5 0S2.1 1.2 0.2 3.2L1.6 4.6C3.1 3.1 5.2 2.2 7.5 2.2z" />
          <path d="M7.5 5.5C9 5.5 10.3 6.1 11.3 7L12.7 5.6C11.3 4.3 9.5 3.5 7.5 3.5S3.7 4.3 2.3 5.6L3.7 7C4.7 6.1 6 5.5 7.5 5.5z" />
          <circle cx="7.5" cy="9.5" r="1.5" />
        </svg>
        <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
          <rect
            x="0.5"
            y="0.5"
            width="21"
            height="11"
            rx="3.5"
            stroke="rgba(240,238,234,0.35)"
          />
          <rect x="2" y="2" width="17" height="8" rx="2" fill="rgba(240,238,234,0.85)" />
          <path d="M23 4v4a2 2 0 0 0 0-4z" fill="rgba(240,238,234,0.4)" />
        </svg>
      </div>
    </div>
  );
}
