import { FY, FONTS } from '../theme.ts';

interface AvatarProps {
  gradient?: string;
  size?: number;
  initials?: string;
}

export default function Avatar({ gradient, size = 36, initials }: AvatarProps) {
  return (
    <div
      aria-hidden="true"
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        flexShrink: 0,
        background: gradient || `linear-gradient(135deg, ${FY.amber500}, ${FY.horizon400})`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: FONTS.display,
        fontWeight: 700,
        fontSize: size * 0.35,
        color: '#fff',
        border: `1px solid ${FY.borderMd}`,
      }}
    >
      {initials}
    </div>
  );
}
