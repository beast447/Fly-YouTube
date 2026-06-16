import type { ReactNode } from 'react';
import { FY, FONTS } from '../theme.ts';

export default function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        fontFamily: FONTS.body,
        fontSize: 10,
        fontWeight: 700,
        letterSpacing: '0.10em',
        textTransform: 'uppercase',
        color: FY.fg3,
        padding: '0 16px',
        marginBottom: 8,
      }}
    >
      {children}
    </div>
  );
}
