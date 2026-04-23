import { FY, FONTS } from '../theme.js';

const STYLES = {
  smooth: { bg: 'rgba(34,200,122,0.12)', color: '#22c87a', border: 'rgba(34,200,122,0.22)' },
  turbulence: { bg: 'rgba(240,160,48,0.12)', color: '#f0a030', border: 'rgba(240,160,48,0.22)' },
  hard: { bg: 'rgba(224,80,72,0.12)', color: '#e05048', border: 'rgba(224,80,72,0.22)' },
  amber: { bg: 'rgba(240,124,56,0.15)', color: FY.amber300, border: 'rgba(240,124,56,0.25)' },
  sky: { bg: 'rgba(42,168,224,0.12)', color: FY.horizon300, border: 'rgba(42,168,224,0.22)' },
  gold: { bg: 'rgba(240,186,64,0.12)', color: FY.gold300, border: 'rgba(240,186,64,0.22)' },
  neutral: { bg: FY.midnight600, color: FY.fg3, border: FY.border },
  new: { bg: FY.amber500, color: '#fff', border: 'transparent' },
};

export default function Badge({ variant = 'neutral', children, dot }) {
  const s = STYLES[variant] || STYLES.neutral;
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 5,
        padding: '2px 9px',
        borderRadius: 9999,
        background: s.bg,
        color: s.color,
        border: `1px solid ${s.border}`,
        fontFamily: FONTS.body,
        fontSize: 10,
        fontWeight: 600,
        letterSpacing: '0.02em',
        whiteSpace: 'nowrap',
      }}
    >
      {dot && (
        <span
          style={{
            width: 5,
            height: 5,
            borderRadius: '50%',
            background: s.color,
            display: 'inline-block',
          }}
        />
      )}
      {children}
    </span>
  );
}
