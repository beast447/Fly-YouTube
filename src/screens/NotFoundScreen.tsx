import { Link } from 'react-router-dom';
import { FY, FONTS } from '../theme.ts';
import { usePageTitle } from '../hooks/usePageTitle.ts';

export default function NotFoundScreen() {
  usePageTitle('Page not found', 'The page you requested could not be found.');

  return (
    <div className="fy-page-enter fy-screen" style={{ textAlign: 'center', paddingTop: 64 }}>
      <div style={{ fontSize: 40, marginBottom: 8 }}>🧭</div>
      <div style={{ fontFamily: FONTS.display, fontSize: 22, fontWeight: 700, color: FY.fg }}>
        404 — Off course
      </div>
      <p style={{ fontFamily: FONTS.body, fontSize: 14, color: FY.fg3, marginTop: 8 }}>
        We couldn&apos;t find that frequency. Let&apos;s get you back on route.
      </p>
      <Link
        to="/"
        style={{
          display: 'inline-block',
          marginTop: 20,
          padding: '10px 22px',
          borderRadius: 9999,
          background: FY.amber500,
          color: '#fff',
          fontFamily: FONTS.body,
          fontSize: 14,
          fontWeight: 600,
          textDecoration: 'none',
        }}
      >
        Back to Dispatch
      </Link>
    </div>
  );
}
