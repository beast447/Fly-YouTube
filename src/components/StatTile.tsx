import { FY, FONTS } from '../theme.ts';

interface StatTileProps {
  value: string | number;
  label: string;
  unit?: string;
  accent?: string;
}

export default function StatTile({ value, label, unit, accent }: StatTileProps) {
  return (
    <div
      style={{
        flex: 1,
        background: FY.midnight700,
        border: `1px solid ${FY.border}`,
        borderRadius: 12,
        padding: '12px 10px',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          fontFamily: FONTS.mono,
          fontSize: 20,
          fontWeight: 500,
          color: accent || FY.amber400,
          lineHeight: 1,
        }}
      >
        {value}
        {unit && <span style={{ fontSize: 11, color: FY.fg3, marginLeft: 2 }}>{unit}</span>}
      </div>
      <div
        style={{
          fontFamily: FONTS.body,
          fontSize: 10,
          color: FY.fg3,
          marginTop: 4,
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
        }}
      >
        {label}
      </div>
    </div>
  );
}
